<?php
/**
 * Red Egg Marketing Theme – functions.php
 * 
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 * 
 * @package Red_Egg
 */

// ============================================
//  Theme Setup
// ============================================

function red_egg_theme_setup() {

    // Add default posts and comments RSS feed links to head
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title
    add_theme_support( 'title-tag' );

    // Enable featured images
    add_theme_support( 'post-thumbnails' );

    // Register nav menus
    register_nav_menus( [
        'primary' => esc_html__( 'Primary Menu', 'red-egg' ),
        'footer'  => esc_html__( 'Footer Menu', 'red-egg' ),
    ] );

    // Wide and full alignment support for blocks
    add_theme_support( 'align-wide' );

    // Editor styles
    add_theme_support( 'editor-styles' );
    add_editor_style( 'blocks.editor.css' );

    // Block color palette – matches _variables.scss
    add_theme_support( 'editor-color-palette', [
        [
            'name'  => esc_html__( 'Gray', 'red-egg' ),
            'slug'  => 'gray',
            'color' => '#424042',
        ],
        [
            'name'  => esc_html__( 'Red', 'red-egg' ),
            'slug'  => 'red',
            'color' => '#DC2035',
        ],
        [
            'name'  => esc_html__( 'Peach', 'red-egg' ),
            'slug'  => 'peach',
            'color' => '#F79E83',
        ],
        [
            'name'  => esc_html__( 'Navy', 'red-egg' ),
            'slug'  => 'navy',
            'color' => '#024D69',
        ],
        [
            'name'  => esc_html__( 'Eggshell', 'red-egg' ),
            'slug'  => 'eggshell',
            'color' => '#F2ECE5',
        ],
        [
            'name'  => esc_html__( 'Purple', 'red-egg' ),
            'slug'  => 'purple',
            'color' => '#A89AAE',
        ],
        [
            'name'  => esc_html__( 'Magenta', 'red-egg' ),
            'slug'  => 'magenta',
            'color' => '#E32E6D',
        ],
        [
            'name'  => esc_html__( 'Orange', 'red-egg' ),
            'slug'  => 'orange',
            'color' => '#F68633',
        ],
        [
            'name'  => esc_html__( 'Gold', 'red-egg' ),
            'slug'  => 'gold',
            'color' => '#F6B319',
        ],
        [
            'name'  => esc_html__( 'White', 'red-egg' ),
            'slug'  => 'white',
            'color' => '#FFFFFF',
        ],
    ] );

    // Disable custom colors to enforce brand palette
    add_theme_support( 'disable-custom-colors' );
}
add_action( 'after_setup_theme', 'red_egg_theme_setup' );


// ============================================
//  Theme Scripts & Styles
// ============================================

function red_egg_theme_scripts() {

    // Google Fonts – Poppins + Figtree
    wp_enqueue_style(
        'red-egg-google-fonts',
        'https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap',
        [],
        null
    );

    // Main theme stylesheet (compiled from SCSS)
    wp_enqueue_style(
        'red-egg-style',
        get_stylesheet_uri(),
        [ 'red-egg-google-fonts' ],
        'v1.0.0'
    );

    // Frontend JS (compiled from support/front-end.js)
    wp_enqueue_script(
        'red-egg-main-js',
        get_template_directory_uri() . '/js/main.js',
        [],
        'v1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'red_egg_theme_scripts' );


// ============================================
//  Admin / Editor Font Loading
// ============================================

function red_egg_editor_fonts() {
    wp_enqueue_style(
        'red-egg-google-fonts-editor',
        'https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap',
        [],
        null
    );
}
add_action( 'enqueue_block_editor_assets', 'red_egg_editor_fonts' );


// ============================================
//  Allowed Block Types (optional)
//  Uncomment to restrict which blocks are
//  available in the editor.
// ============================================

// function red_egg_allowed_block_types( $allowed_blocks ) {
//     return [
//         // Core blocks
//         'core/paragraph',
//         'core/heading',
//         'core/image',
//         'core/list',
//         'core/list-item',
//         'core/shortcode',
//         'core/html',
//         'core/separator',
//         'core/spacer',
//         // Red Egg blocks
//         'red-egg-block/hero',
//         'red-egg-block/columns-group',
//         'red-egg-block/text-cards-grid',
//         'red-egg-block/numbered-list',
//         'red-egg-block/case-studies-slider',
//         'red-egg-block/testimonials',
//         'red-egg-block/insights',
//         'red-egg-block/contact-section',
//     ];
// }
// add_filter( 'allowed_block_types_all', 'red_egg_allowed_block_types' );


// ============================================
//  Includes
// ============================================

/**
 * Custom Blocks
 */
require get_template_directory() . '/support/blocks.php';

/**
 * Custom End Points
 */
require get_template_directory() . '/inc/custom-endpoints.php';
