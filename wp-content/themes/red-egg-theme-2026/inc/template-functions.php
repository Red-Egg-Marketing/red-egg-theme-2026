<?php
/**
 * Template Functions
 * 
 * Helper functions used across template files.
 *
 * @package Red_Egg
 */

// ============================================
//  Posted On (date + author)
// ============================================

if ( ! function_exists( 'red_egg_posted_on' ) ) :
    function red_egg_posted_on() {
        $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';

        $time_string = sprintf(
            $time_string,
            esc_attr( get_the_date( DATE_W3C ) ),
            esc_html( get_the_date( 'n.j.y' ) )
        );

        echo '<span class="posted-on">' . $time_string . '</span>';

        if ( get_the_author_meta( 'ID' ) ) {
            echo '<span class="byline"> ' . esc_html__( 'by', 'red-egg' ) . ' <span class="author vcard"><a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span></span>';
        }
    }
endif;


// ============================================
//  Entry Footer (categories, tags)
// ============================================

if ( ! function_exists( 'red_egg_entry_footer' ) ) :
    function red_egg_entry_footer() {
        if ( 'post' === get_post_type() ) {
            $categories_list = get_the_category_list( esc_html__( ', ', 'red-egg' ) );
            if ( $categories_list ) {
                printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'red-egg' ) . '</span>', $categories_list );
            }

            $tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'red-egg' ) );
            if ( $tags_list ) {
                printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'red-egg' ) . '</span>', $tags_list );
            }
        }
    }
endif;


// ============================================
//  Pagination
// ============================================

if ( ! function_exists( 'red_egg_pagination' ) ) :
    function red_egg_pagination() {
        the_posts_pagination( [
            'mid_size'  => 2,
            'prev_text' => '<span class="arrow-icon arrow-icon--left"></span><span class="sr-only">' . esc_html__( 'Previous', 'red-egg' ) . '</span>',
            'next_text' => '<span class="arrow-icon arrow-icon--right"></span><span class="sr-only">' . esc_html__( 'Next', 'red-egg' ) . '</span>',
        ] );
    }
endif;


// ============================================
//  Excerpt Length
// ============================================

function red_egg_excerpt_length( $length ) {
    return 25;
}
add_filter( 'excerpt_length', 'red_egg_excerpt_length' );


// ============================================
//  Excerpt More String
// ============================================

function red_egg_excerpt_more( $more ) {
    return '&hellip;';
}
add_filter( 'excerpt_more', 'red_egg_excerpt_more' );


// ============================================
//  Author Image
//
//  ACF author_image (array / ID / URL) with a
//  Gravatar fallback. Shared by the single-post
//  author bio and the author archive hero.
// ============================================

function red_egg_get_author_image( $author_id, $size = 'medium', $avatar_px = 120 ) {
    $author_id = (int) $author_id;
    if ( ! $author_id ) {
        return '';
    }

    $name = get_the_author_meta( 'display_name', $author_id );

    if ( function_exists( 'get_field' ) ) {
        $image = get_field( 'author_image', 'user_' . $author_id );

        if ( $image ) {
            $src = '';
            $alt = $name;

            if ( is_array( $image ) ) {
                $src = isset( $image['sizes'][ $size ] ) ? $image['sizes'][ $size ] : $image['url'];
                $alt = ! empty( $image['alt'] ) ? $image['alt'] : $name;
            } elseif ( is_numeric( $image ) ) {
                $src = wp_get_attachment_image_url( (int) $image, $size );
            } else {
                $src = $image;
            }

            if ( $src ) {
                return '<img src="' . esc_url( $src ) . '" alt="' . esc_attr( $alt ) . '" loading="lazy" />';
            }
        }
    }

    return get_avatar( $author_id, $avatar_px );
}


// ============================================
//  Archive Title Prefix
//
//  Drop WP's "Category:", "Author:" etc. The
//  archive hero prints its own label instead.
// ============================================

function red_egg_archive_title_prefix( $prefix ) {
    return '';
}
add_filter( 'get_the_archive_title_prefix', 'red_egg_archive_title_prefix' );


// ============================================
//  Archive Hero
//
//  Services-style hero (.hero-services) for every
//  archive: small label, title, description. Author
//  archives add the author's photo, role and bio.
//  Used by archive.php and index.php.
// ============================================

function red_egg_archive_hero() {
    $label       = '';
    $title       = '';
    $subtitle    = '';
    $description = '';
    $media       = '';
    $modifier    = '';

    if ( is_author() ) {
        $author_id   = (int) get_queried_object_id();
        $label       = __( 'Articles by', 'red-egg' );
        $title       = get_the_author_meta( 'display_name', $author_id );
        $description = wpautop( wp_kses_post( get_the_author_meta( 'description', $author_id ) ) );
        $media       = red_egg_get_author_image( $author_id, 'medium-large', 400 );
        $modifier    = ' archive-hero--author';

        if ( function_exists( 'get_field' ) ) {
            $subtitle = (string) get_field( 'author_title', 'user_' . $author_id );
        }
    } elseif ( is_home() ) {
        $page_id = (int) get_option( 'page_for_posts' );
        $title   = $page_id ? get_the_title( $page_id ) : __( 'Blog', 'red-egg' );

        if ( $page_id && has_excerpt( $page_id ) ) {
            $description = wpautop( wp_kses_post( get_the_excerpt( $page_id ) ) );
        }
    } elseif ( is_category() || is_tag() || is_tax() ) {
        $term     = get_queried_object();
        $taxonomy = $term ? get_taxonomy( $term->taxonomy ) : false;
        $label    = $taxonomy ? $taxonomy->labels->singular_name : '';
        $title    = single_term_title( '', false );

        $description = term_description();
    } elseif ( is_post_type_archive() ) {
        $post_type   = get_queried_object();
        $title       = post_type_archive_title( '', false );
        $description = ( $post_type && ! empty( $post_type->description ) ) ? wpautop( wp_kses_post( $post_type->description ) ) : '';
    } elseif ( is_date() ) {
        $label = __( 'Archive', 'red-egg' );
        $title = get_the_archive_title();
    } else {
        $title       = get_the_archive_title();
        $description = get_the_archive_description();
    }

    if ( '' === $title ) {
        $title = get_bloginfo( 'name' );
    }

    echo '<section class="hero-services archive-hero' . esc_attr( $modifier ) . '">';
        echo '<div class="block-wrapper">';
            echo '<div class="hero-background__columns">';

                echo '<div class="hero-background__content archive-hero__content">';

                    if ( '' !== $label ) {
                        echo '<p class="archive-hero__label">' . esc_html( $label ) . '</p>';
                    }

                    echo '<h1 class="archive-hero__title">' . esc_html( $title ) . '</h1>';

                    if ( '' !== $subtitle ) {
                        echo '<p class="archive-hero__subtitle">' . esc_html( $subtitle ) . '</p>';
                    }

                    if ( '' !== trim( (string) $description ) ) {
                        echo '<div class="archive-hero__description">' . $description . '</div>'; // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped -- kses'd above / term_description() is filtered.
                    }

                echo '</div><!-- .archive-hero__content -->';

                if ( '' !== $media ) {
                    echo '<div class="hero-background__media archive-hero__media">' . $media . '</div>'; // phpcs:ignore WordPress.Security.EscapingOutput.OutputNotEscaped
                }

            echo '</div><!-- .hero-background__columns -->';
        echo '</div><!-- .block-wrapper -->';
    echo '</section><!-- .archive-hero -->';
}
