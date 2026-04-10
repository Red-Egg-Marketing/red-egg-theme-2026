<?php
/**
 * Custom REST API Endpoints
 * 
 * Register custom endpoints for dynamic Gutenberg blocks.
 * 
 * Endpoints:
 *   /red-egg/v2/case-studies  → red_egg_return_case_studies
 *   /red-egg/v2/reviews       → red_egg_return_reviews
 *   /red-egg/v2/resources     → red_egg_return_resources
 *
 * @package Red_Egg
 */

// ============================================
//  Register Routes
// ============================================

function red_egg_register_rest_routes() {
    // Case Studies
    register_rest_route( 'red-egg/v2', '/case-studies', [
        'methods'  => 'GET',
        'callback' => 'red_egg_return_case_studies',
        'permission_callback' => '__return_true',
    ] );

    // Reviews / Testimonials
    register_rest_route( 'red-egg/v2', '/reviews', [
        'methods'  => 'GET',
        'callback' => 'red_egg_return_reviews',
        'permission_callback' => '__return_true',
    ] );

    // Resources / Blog Posts
    register_rest_route( 'red-egg/v2', '/resources', [
        'methods'  => 'GET',
        'callback' => 'red_egg_return_resources',
        'permission_callback' => '__return_true',
    ] );
}
add_action( 'rest_api_init', 'red_egg_register_rest_routes' );


// ============================================
//  Case Studies Callback
// ============================================

function red_egg_return_case_studies( $request ) {
    $args = [
        'post_type'      => 'case-study',
        'posts_per_page' => 12,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    $query = new WP_Query( $args );
    $case_studies = [];

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $case_studies[] = [
                'id'      => get_the_ID(),
                'title'   => get_the_title(),
                'link'    => get_the_permalink(),
                'excerpt' => get_the_excerpt(),
                'image'   => get_the_post_thumbnail_url( get_the_ID(), 'large' ),
            ];
        }
    }

    wp_reset_postdata();

    return rest_ensure_response( $case_studies );
}


// ============================================
//  Reviews Callback
// ============================================

function red_egg_return_reviews( $request ) {
    // TODO: Replace with your actual reviews data source
    // This could be a custom post type, ACF options page,
    // or a third-party reviews API integration.

    $args = [
        'post_type'      => 'review',
        'posts_per_page' => 12,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    $query = new WP_Query( $args );
    $reviews = [];

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $reviews[] = [
                'id'             => get_the_ID(),
                'content'        => get_the_content(),
                'reviewer_name'  => get_field( 'reviewer_name' ) ?: get_the_title(),
                'reviewer_title' => get_field( 'reviewer_title' ) ?: '',
                'rating'         => get_field( 'rating' ) ?: 5,
                'link'           => get_the_permalink(),
            ];
        }
    }

    wp_reset_postdata();

    return rest_ensure_response( $reviews );
}


// ============================================
//  Resources Callback
// ============================================

function red_egg_return_resources( $request ) {
    $args = [
        'post_type'      => 'post',
        'posts_per_page' => 6,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    $query = new WP_Query( $args );
    $resources = [];

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $resources[] = [
                'id'      => get_the_ID(),
                'title'   => get_the_title(),
                'link'    => get_the_permalink(),
                'excerpt' => get_the_excerpt(),
                'date'    => get_the_date( 'n.j.y' ),
                'image'   => get_the_post_thumbnail_url( get_the_ID(), 'medium_large' ),
            ];
        }
    }

    wp_reset_postdata();

    return rest_ensure_response( $resources );
}
