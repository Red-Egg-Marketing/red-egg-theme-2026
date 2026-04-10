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
