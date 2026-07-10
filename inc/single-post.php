<?php
/**
 * Single Post Helpers
 *
 *    ____          _   _____
 *   |  _ \ ___  __| | | ____|__ _  __ _
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |
 *   |  _ <  __/ (_| | | |__| (_| | (_| |
 *   |_| \_\___|\__,_| |_____\__, |\__, |
 *                            |___/ |___/
 *
 * Blog post presentation helpers:
 *   - Injects anchor IDs into content headings (h2–h6)
 *   - Builds a nested Table of Contents from those headings
 *   - Estimated read time
 *   - Author attribution (ACF `author_image` on the user)
 *
 * @package Red_Egg
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ============================================
//  Heading Parsing + ID Injection
//
//  ID scheme: {post-slug}-h{level}-{iteration}
//    e.g. my-post-h2-1, my-post-h3-1, my-post-h2-2
//
//  Headings that live inside a custom Red Egg block
//  (class contains "red-egg-block") are skipped, so the
//  accordion / callout titles never appear in the TOC and
//  never receive generated IDs.
//
//  IDs are deterministic (slug + level + per-level order),
//  so the TOC links and the rendered content always match
//  even though they are parsed in two separate passes.
// ============================================

/**
 * Parse rendered post HTML: add IDs to top-level headings and
 * build a flat list of heading nodes for the TOC.
 *
 * @param string $content Rendered post content HTML.
 * @param int    $post_id Post ID (used for the slug prefix).
 * @return array { 'content' => string, 'toc' => array }
 */
function red_egg_process_post_headings( $content, $post_id ) {

    if ( '' === trim( (string) $content ) || ! class_exists( 'DOMDocument' ) ) {
        return [ 'content' => $content, 'toc' => [] ];
    }

    $slug = sanitize_title( get_post_field( 'post_name', $post_id ) );
    if ( '' === $slug ) {
        $slug = 'post-' . $post_id;
    }

    libxml_use_internal_errors( true );

    $dom = new DOMDocument();

    // Force UTF-8 and suppress the auto <html>/<body> wrappers + doctype.
    $dom->loadHTML(
        '<?xml encoding="utf-8" ?>' . $content,
        LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
    );

    $xpath = new DOMXPath( $dom );

    // h2–h6 that are NOT nested inside a custom Red Egg block.
    $query = '//*[self::h2 or self::h3 or self::h4 or self::h5 or self::h6]'
        . '[not(ancestor::*[contains(@class, "red-egg-block")])]';

    $headings = $xpath->query( $query );

    $toc      = [];
    $counters = [];

    foreach ( $headings as $heading ) {

        $text = trim( $heading->textContent );
        if ( '' === $text ) {
            continue;
        }

        $level = (int) substr( $heading->nodeName, 1 ); // "h2" -> 2

        // Per-level iteration counter.
        $counters[ $level ] = isset( $counters[ $level ] ) ? $counters[ $level ] + 1 : 1;
        $iteration          = $counters[ $level ];

        // Respect an author-supplied ID, otherwise generate one.
        $existing_id = $heading->getAttribute( 'id' );
        if ( '' === $existing_id ) {
            $id = $slug . '-h' . $level . '-' . $iteration;
            $heading->setAttribute( 'id', $id );
        } else {
            $id = $existing_id;
        }

        $toc[] = [
            'id'    => $id,
            'level' => $level,
            'text'  => $text,
        ];
    }

    // Serialize inner markup only (no wrapping element).
    $html = '';
    foreach ( $dom->childNodes as $node ) {
        $html .= $dom->saveHTML( $node );
    }

    // Strip the XML prolog we injected above.
    $html = preg_replace( '/^<\?xml.*?\?>\s*/', '', $html );

    libxml_clear_errors();

    return [ 'content' => $html, 'toc' => $toc ];
}

/**
 * the_content filter — inject anchor IDs on single blog posts.
 * Priority 20 runs after do_blocks (9) / wpautop (10) / shortcodes (11),
 * so block wrappers exist and the exclusion above works.
 */
function red_egg_inject_heading_ids( $content ) {

    if ( is_singular( 'post' ) && in_the_loop() && is_main_query() ) {
        $processed = red_egg_process_post_headings( $content, get_the_ID() );
        return $processed['content'];
    }

    return $content;
}
add_filter( 'the_content', 'red_egg_inject_heading_ids', 20 );

/**
 * Return the flat TOC array for a post (memoized per request).
 * Renders blocks/shortcodes so the heading set matches the frontend.
 *
 * @param int|null $post_id Defaults to the current post.
 * @return array
 */
function red_egg_get_toc( $post_id = null ) {

    static $cache = [];

    if ( null === $post_id ) {
        $post_id = get_the_ID();
    }

    if ( isset( $cache[ $post_id ] ) ) {
        return $cache[ $post_id ];
    }

    $raw       = get_post_field( 'post_content', $post_id );
    $rendered  = do_shortcode( do_blocks( $raw ) );
    $processed = red_egg_process_post_headings( $rendered, $post_id );

    $cache[ $post_id ] = $processed['toc'];
    return $cache[ $post_id ];
}


// ============================================
//  Table of Contents Renderer
// ============================================

/**
 * Convert the flat heading list into a nested <ul> tree.
 * H2 is the top level; deeper headings nest as children.
 *
 * @param array $items Flat TOC array from red_egg_get_toc().
 * @return string
 */
function red_egg_render_toc_list( $items ) {

    if ( empty( $items ) ) {
        return '';
    }

    $min  = min( array_column( $items, 'level' ) );
    $prev = $min - 1;
    $html = '';

    foreach ( $items as $item ) {
        $level = (int) $item['level'];

        if ( $level > $prev ) {
            $html .= str_repeat( '<ul class="post-toc__sublist">', $level - $prev );
        } elseif ( $level < $prev ) {
            $html .= str_repeat( '</li></ul>', $prev - $level );
            $html .= '</li>';
        } else {
            $html .= '</li>';
        }

        $html .= '<li class="post-toc__item post-toc__item--h' . $level . '">';
        $html .= '<a class="post-toc__link" href="#' . esc_attr( $item['id'] ) . '">' . esc_html( $item['text'] ) . '</a>';

        $prev = $level;
    }

    $html .= str_repeat( '</li></ul>', $prev - ( $min - 1 ) );

    return $html;
}

/**
 * Output the complete Table of Contents box.
 * Collapsible on mobile (toggled via js/toc.js), always open on desktop.
 */
function red_egg_the_toc() {

    $items = red_egg_get_toc();

    if ( empty( $items ) ) {
        return;
    }

    $list = red_egg_render_toc_list( $items );

    echo '<div class="post-toc">';
        echo '<button class="post-toc__toggle" type="button" aria-expanded="false" aria-controls="post-toc-nav">';
            echo '<span class="post-toc__label">' . esc_html__( 'Table of Contents', 'red-egg' ) . '</span>';
            echo '<span class="post-toc__toggle-icon" aria-hidden="true"></span>';
        echo '</button>';
        echo '<nav id="post-toc-nav" class="post-toc__nav" aria-label="' . esc_attr__( 'Table of Contents', 'red-egg' ) . '">';
            echo $list; // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- built from esc_* helpers above.
        echo '</nav>';
    echo '</div><!-- .post-toc -->';
}


// ============================================
//  Estimated Read Time
// ============================================

/**
 * Estimated read time in whole minutes (200 wpm, min 1).
 *
 * @param int|null $post_id Defaults to the current post.
 * @return int
 */
function red_egg_read_time( $post_id = null ) {

    if ( null === $post_id ) {
        $post_id = get_the_ID();
    }

    $content = get_post_field( 'post_content', $post_id );
    $text    = wp_strip_all_tags( strip_shortcodes( do_blocks( $content ) ) );
    $words   = str_word_count( $text );

    return max( 1, (int) ceil( $words / 200 ) );
}

/**
 * Echo the read time with label, e.g. "Read time: 4 min".
 */
function red_egg_the_read_time() {
    $minutes = red_egg_read_time();
    printf(
        '<p class="entry-read-time">%s <span>%s</span></p>',
        esc_html__( 'Read time:', 'red-egg' ),
        esc_html( sprintf( _n( '%d min', '%d min', $minutes, 'red-egg' ), $minutes ) )
    );
}


// ============================================
//  Author Attribution
//
//  Image comes from an ACF image field named
//  `author_image` on the user. Optional
//  `author_title` field is shown if present.
//  Falls back to the Gravatar if no ACF image.
// ============================================

/**
 * Output the author bio block for the current post.
 */
function red_egg_the_author_bio() {

    $author_id = (int) get_the_author_meta( 'ID' );
    if ( ! $author_id ) {
        return;
    }

    $name = get_the_author_meta( 'display_name', $author_id );
    $bio  = get_the_author_meta( 'description', $author_id );
    $url  = get_author_posts_url( $author_id );

    $title      = '';
    $image_html = '';

    if ( function_exists( 'get_field' ) ) {

        $image = get_field( 'author_image', 'user_' . $author_id );
        $title = (string) get_field( 'author_title', 'user_' . $author_id );

        if ( $image ) {
            // ACF image return format may be array, ID, or URL.
            if ( is_array( $image ) ) {
                $src = isset( $image['sizes']['thumbnail'] ) ? $image['sizes']['thumbnail'] : $image['url'];
                $alt = ! empty( $image['alt'] ) ? $image['alt'] : $name;
            } elseif ( is_numeric( $image ) ) {
                $src = wp_get_attachment_image_url( (int) $image, 'thumbnail' );
                $alt = $name;
            } else {
                $src = $image;
                $alt = $name;
            }

            if ( $src ) {
                $image_html = '<img src="' . esc_url( $src ) . '" alt="' . esc_attr( $alt ) . '" />';
            }
        }
    }

    if ( '' === $image_html ) {
        $image_html = get_avatar( $author_id, 120 );
    }

    echo '<div class="author-bio">';

        echo '<div class="author-bio__avatar">' . $image_html . '</div>'; // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped

        echo '<div class="author-bio__body">';
            echo '<p class="author-bio__name"><a href="' . esc_url( $url ) . '">' . esc_html( $name ) . '</a></p>';

            if ( '' !== $title ) {
                echo '<p class="author-bio__title">' . esc_html( $title ) . '</p>';
            }

            if ( '' !== trim( (string) $bio ) ) {
                echo '<p class="author-bio__text">' . esc_html( $bio ) . '</p>';
            }
        echo '</div><!-- .author-bio__body -->';

    echo '</div><!-- .author-bio -->';
}
