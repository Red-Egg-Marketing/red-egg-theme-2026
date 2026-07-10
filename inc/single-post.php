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
 * Build a nested tree from the flat heading list (recursive descent).
 * H2 is the top level; deeper headings nest as children.
 *
 * @param array $items Flat TOC array from red_egg_get_toc().
 * @return array Nested nodes: [ 'id', 'level', 'text', 'children' => [] ]
 */
function red_egg_build_toc_tree( $items ) {

    if ( empty( $items ) ) {
        return [];
    }

    $pos  = 0;
    $base = min( array_column( $items, 'level' ) ) - 1;

    return red_egg_toc_consume( $items, $pos, $base );
}

/**
 * Consume consecutive items deeper than $parent_level into a node list.
 *
 * @param array $items        Flat TOC array.
 * @param int   $pos          Cursor (by reference).
 * @param int   $parent_level Level of the current parent.
 * @return array
 */
function red_egg_toc_consume( $items, &$pos, $parent_level ) {

    $nodes = [];
    $count = count( $items );

    while ( $pos < $count ) {
        $level = (int) $items[ $pos ]['level'];

        if ( $level <= $parent_level ) {
            break;
        }

        $item = $items[ $pos ];
        $pos++;

        $node = [
            'id'       => $item['id'],
            'level'    => $level,
            'text'     => $item['text'],
            'children' => red_egg_toc_consume( $items, $pos, $level ),
        ];

        $nodes[] = $node;
    }

    return $nodes;
}

/**
 * The red caret SVG used to expand/collapse TOC sections.
 *
 * @return string
 */
function red_egg_toc_caret_svg() {
    return '<svg class="post-toc__caret-icon" width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6.61753 8.62341C7.10562 9.12553 7.89828 9.12553 8.38637 8.62341L14.6339 2.19627C15.122 1.69415 15.122 0.87871 14.6339 0.37659C14.1458 -0.12553 13.3532 -0.12553 12.8651 0.37659L7.5 5.89589L2.13491 0.380607C1.64682 -0.121513 0.854158 -0.121513 0.366068 0.380607C-0.122023 0.882727 -0.122023 1.69817 0.366068 2.20029L6.61363 8.62743L6.61753 8.62341Z" fill="#DC2035"/></svg>';
}

/**
 * Render the nested TOC tree as <ul>/<li> markup.
 * Items with children get a caret button; sub-levels start collapsed
 * (see _single.scss + js/toc.js).
 *
 * @param array $nodes Nested tree from red_egg_build_toc_tree().
 * @param bool  $top   True for the outermost (always-visible) list.
 * @return string
 */
function red_egg_render_toc_nodes( $nodes, $top = true ) {

    if ( empty( $nodes ) ) {
        return '';
    }

    $list_class = $top ? 'post-toc__list' : 'post-toc__sublist';
    $html       = '<ul class="' . $list_class . '">';

    foreach ( $nodes as $node ) {
        $has_children = ! empty( $node['children'] );

        $li_class = 'post-toc__item post-toc__item--h' . $node['level'];
        if ( $has_children ) {
            $li_class .= ' has-children';
        }

        $html .= '<li class="' . esc_attr( $li_class ) . '">';
        $html .= '<div class="post-toc__row">';

        if ( $has_children ) {
            $html .= '<button class="post-toc__caret" type="button" aria-expanded="false" aria-label="' . esc_attr__( 'Toggle section', 'red-egg' ) . '">'
                . red_egg_toc_caret_svg()
                . '</button>';
        } else {
            $html .= '<span class="post-toc__caret post-toc__caret--empty" aria-hidden="true"></span>';
        }

        $html .= '<a class="post-toc__link" href="#' . esc_attr( $node['id'] ) . '">' . esc_html( $node['text'] ) . '</a>';
        $html .= '</div><!-- .post-toc__row -->';

        if ( $has_children ) {
            $html .= red_egg_render_toc_nodes( $node['children'], false );
        }

        $html .= '</li>';
    }

    $html .= '</ul>';

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

    $list = red_egg_render_toc_nodes( red_egg_build_toc_tree( $items ) );

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


// ============================================
//  Blob Decoration (PHP mirror of BlobAnimation.View)
//
//  Outputs the same markup the Insights block uses so
//  js/blob-animation.js (GSAP MorphSVG) animates it.
//  Shapes are inline — no assets required.
// ============================================

function red_egg_blob_decoration( $shape = 'shape1', $position = 'center-right', $speed = 12 ) {

    $shapes = [
        'shape1' => 'M646.7,199.1c-7.8-33.2-3.8-68.6-17.5-100.7-33.7-81.5-141.3-112.6-220.7-62.7-71.5,42.5-69.3,134.1-114.9,196.8C223.9,343.3,30.1,293.1,15.4,448.6c-9.4,150.5,206.7,204.9,316.2,122,102.3-71.7,162-93.4,280.4-36.4,195.7,85.9,375.9-168.4,156.2-264.9-52.8-15.3-107.1-1.8-121.5-70.3Z',
        'shape2' => 'M623.4,77c-208.5-49.5-122.1,158.6-397,106.3-72.5-11.9-135.3,28.9-147.9,102.7-34.3,152.5,93.9,306.7,250.2,229.7,39.1-19.1,78.8-45.5,123.9-44.3,49.5,1.3,95,25.4,143.9,30.4,97.1,5.9,219.1-58.2,214.5-167.7-5.8-109.4-76.3-232.8-187.6-257.1h0Z',
        'shape3' => 'M623.4,76.9c-208.5-49.5-122.1,158.6-397,106.3-72.5-11.9-135.3,28.9-147.9,102.6-34.3,152.5,93.9,306.7,250.2,229.7,39.1-19.1,78.8-45.5,123.9-44.3,49.5,1.3,95,25.4,143.9,30.4,97.1,5.9,219.1-58.2,214.5-167.7-5.8-109.4-76.3-232.8-187.6-257.1h0Z',
    ];

    $d = isset( $shapes[ $shape ] ) ? $shapes[ $shape ] : $shapes['shape1'];

    $html  = '<div class="blob-decoration blob-decoration--' . esc_attr( $position ) . '" data-blob-enabled="true" data-blob-shape="' . esc_attr( $shape ) . '" data-blob-speed="' . esc_attr( $speed ) . '">';
    $html .= '<svg class="blob-decoration__svg" viewBox="0 0 884 621" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true" focusable="false">';
    $html .= '<path class="blob-decoration__path" d="' . $d . '" fill="#F2ECE5" />';
    $html .= '</svg>';
    $html .= '</div>';

    return $html;
}


// ============================================
//  Related Posts (single.php)
//
//  Up to 2 posts sharing a category with the current
//  post (falls back to most-recent posts). Rendered in
//  PHP with the Insights block markup/classes so the
//  card + grid styling is shared.
// ============================================

/**
 * @param int $post_id
 * @param int $number
 * @return int[] Post IDs.
 */
function red_egg_get_related_post_ids( $post_id, $number = 2 ) {

    $found = [];
    $cats  = wp_get_post_categories( $post_id );

    if ( ! empty( $cats ) ) {
        $related = new WP_Query( [
            'post_type'           => 'post',
            'posts_per_page'      => $number,
            'post__not_in'        => [ $post_id ],
            'category__in'        => $cats,
            'orderby'             => 'date',
            'order'               => 'DESC',
            'ignore_sticky_posts' => true,
            'no_found_rows'       => true,
            'fields'              => 'ids',
        ] );
        $found = $related->posts;
    }

    // Backfill with recent posts if the category didn't yield enough.
    if ( count( $found ) < $number ) {
        $exclude = array_merge( [ $post_id ], $found );
        $fill    = new WP_Query( [
            'post_type'           => 'post',
            'posts_per_page'      => $number - count( $found ),
            'post__not_in'        => $exclude,
            'orderby'             => 'date',
            'order'               => 'DESC',
            'ignore_sticky_posts' => true,
            'no_found_rows'       => true,
            'fields'              => 'ids',
        ] );
        $found = array_merge( $found, $fill->posts );
    }

    return $found;
}

/**
 * Render a single related-post card (matches Insights markup).
 *
 * @param int $id
 * @return string
 */
function red_egg_related_post_card( $id ) {

    $permalink = get_the_permalink( $id );
    $title     = get_the_title( $id );
    $date      = get_the_date( 'n.j.y', $id );
    $excerpt   = wp_trim_words( get_the_excerpt( $id ), 25, '…' );

    $html  = '<div class="resource-card">';
    $html .= '<div class="resource-extra">';
    $html .= '<a class="resource-wrap" href="' . esc_url( $permalink ) . '">';
    $html .= '<div class="cont-wrap">';
    $html .= '<div class="content">';
    $html .= '<span class="resource-date">' . esc_html( $date ) . '</span>';
    $html .= '<h3 class="resource-title">' . esc_html( $title ) . '</h3>';
    $html .= '<p class="resource-excerpt">' . esc_html( $excerpt ) . '</p>';
    $html .= '<div class="wp-block-button is-style-outline-gray">';
    $html .= '<span class="wp-button wp-block-button__link wp-element-button">' . esc_html__( 'Read More', 'red-egg' ) . '</span>';
    $html .= '</div>';
    $html .= '</div><!-- .content -->';
    $html .= '</div><!-- .cont-wrap -->';
    $html .= '</a>';
    $html .= '</div><!-- .resource-extra -->';
    $html .= '</div><!-- .resource-card -->';

    return $html;
}

/**
 * Output the Related Posts section for the current post.
 */
function red_egg_related_posts() {

    $post_id = get_the_ID();
    $ids     = red_egg_get_related_post_ids( $post_id, 2 );

    if ( empty( $ids ) ) {
        return;
    }

    echo '<section class="insights-block related-posts">';
        echo red_egg_blob_decoration( 'shape1', 'center-right', 14 ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
        echo red_egg_blob_decoration( 'shape2', 'bottom-left', 18 );  // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
        echo '<div class="block-wrapper">';
            echo '<header class="insights-block__header related-posts__header">';
                echo '<p class="related-posts__label">' . esc_html__( 'Insights', 'red-egg' ) . '</p>';
                echo '<h2 class="related-posts__heading">' . esc_html__( 'Related Posts', 'red-egg' ) . '</h2>';
            echo '</header>';
            echo '<div class="resources grid">';
                foreach ( $ids as $rid ) {
                    echo red_egg_related_post_card( $rid ); // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
                }
            echo '</div><!-- .resources.grid -->';
        echo '</div><!-- .block-wrapper -->';
    echo '</section><!-- .related-posts -->';
}
