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
        'mobile'  => esc_html__( 'Mobile Menu', 'red-egg' ),
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
            'name'  => esc_html__( 'Dark Purple', 'red-egg' ),
            'slug'  => 'dark-purple',
            'color' => '#91288D',
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

    // Font Awesome Pro Kit
    wp_enqueue_script(
        'red-egg-font-awesome',
        'https://kit.fontawesome.com/9524d9c097.js',
        [],
        false
    );

    // Swiper CSS (CDN)
    wp_enqueue_style(
        'swiper-css',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        [],
        '11.0.0'
    );

    // GLightbox CSS (CDN) – opt-in image/gallery lightbox
    wp_enqueue_style(
        'glightbox-css',
        'https://cdn.jsdelivr.net/npm/glightbox@3.3.1/dist/css/glightbox.min.css',
        [],
        '3.3.1'
    );

    $style_css = get_template_directory() . '/style.css';
    $main_js   = get_template_directory() . '/support/assets/js/main.js';

    // Main theme stylesheet (compiled from SCSS)
    wp_enqueue_style(
        'red-egg-style',
        get_stylesheet_uri(),
        [ 'red-egg-google-fonts', 'swiper-css' ],
        file_exists( $style_css ) ? filemtime( $style_css ) : false
    );

    // Swiper JS (CDN) – exposes global Swiper object
    wp_enqueue_script(
        'swiper-js',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        [],
        '11.0.0',
        true
    );

    // GSAP Core (CDN)
    wp_enqueue_script(
        'gsap-core',
        'https://cdn.jsdelivr.net/npm/gsap@3.13/dist/gsap.min.js',
        [],
        '3.13.0',
        true
    );

    // GSAP MorphSVG Plugin (CDN – free since 3.13)
    wp_enqueue_script(
        'gsap-morphsvg',
        'https://cdn.jsdelivr.net/npm/gsap@3.13/dist/MorphSVGPlugin.min.js',
        [ 'gsap-core' ],
        '3.13.0',
        true
    );

    // GSAP MorphSVG Plugin (CDN – free since 3.13)
    wp_enqueue_script(
        'gsap-scrolltrigger',
        'https://cdn.jsdelivr.net/npm/gsap@3.13/dist/ScrollTrigger.min.js',
        [ 'gsap-core' ],
        '3.13.0',
        true
    );

    // Swup – SPA-style page transitions (CDN, exposes global Swup)
    wp_enqueue_script(
        'swup-js',
        'https://cdn.jsdelivr.net/npm/swup@4/dist/Swup.umd.js',
        [],
        '4.8.0',
        true
    );

    // Swup Body Class Plugin – keeps WP body_class() in sync on swap
    wp_enqueue_script(
        'swup-body-class',
        'https://cdn.jsdelivr.net/npm/@swup/body-class-plugin@3/dist/index.umd.js',
        [ 'swup-js' ],
        '3.2.0',
        true
    );

    // Swup Scroll Plugin – resets scroll to top on navigation, restores
    // position on back/forward, and scrolls to #hash targets across
    // page swaps (which swup otherwise strips, since it preventDefaults
    // every link it handles).
    wp_enqueue_script(
        'swup-scroll',
        'https://cdn.jsdelivr.net/npm/@swup/scroll-plugin@3/dist/index.umd.js',
        [ 'swup-js' ],
        '3.3.1',
        true
    );

    // Swup Head Plugin – syncs the <head> on each swap. Swup only
    // replaces #content, not <head>, so stylesheets/scripts that a
    // plugin enqueues only on certain pages (e.g. Gravity Forms CSS,
    // which is added only on pages that contain a form) never arrive
    // when navigating to such a page via SPA. This diffs and injects
    // the incoming page's head assets.
    wp_enqueue_script(
        'swup-head',
        'https://cdn.jsdelivr.net/npm/@swup/head-plugin@2/dist/index.umd.js',
        [ 'swup-js' ],
        '2.3.0',
        true
    );

    // GLightbox JS (CDN) – exposes global GLightbox
    wp_enqueue_script(
        'glightbox-js',
        'https://cdn.jsdelivr.net/npm/glightbox@3.3.1/dist/js/glightbox.min.js',
        [],
        '3.3.1',
        true
    );

    // Frontend JS (compiled from support/front-end.js)
    wp_enqueue_script(
        'red-egg-main-js',
        get_template_directory_uri() . '/support/assets/js/main.js',
        [ 'swiper-js', 'gsap-core', 'gsap-morphsvg', 'gsap-scrolltrigger', 'swup-js', 'swup-body-class', 'swup-scroll', 'swup-head', 'glightbox-js' ],
        file_exists( $main_js ) ? filemtime( $main_js ) : false,
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

    $editor_css = get_template_directory() . '/blocks.editor.css';

    // Block editor styles (compiled from editor.scss)
    wp_enqueue_style(
        'red-egg-blocks-editor-css',
        get_template_directory_uri() . '/blocks.editor.css',
        [ 'red-egg-google-fonts-editor' ],
        file_exists( $editor_css ) ? filemtime( $editor_css ) : false
    );

    // Font Awesome Pro Kit (editor)
    wp_enqueue_script(
        'red-egg-font-awesome-editor',
        'https://kit.fontawesome.com/9524d9c097.js',
        [],
        false
    );

    // Swiper for editor preview (case studies slider)
    wp_enqueue_style(
        'swiper-css-editor',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        [],
        '11.0.0'
    );
    wp_enqueue_script(
        'swiper-js-editor',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        [],
        '11.0.0',
        true
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
//  Widget Areas
// ============================================

function red_egg_widgets_init() {
    register_sidebar( [
        'name'          => esc_html__( 'Sidebar', 'red-egg' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Add widgets here.', 'red-egg' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ] );
}
add_action( 'widgets_init', 'red_egg_widgets_init' );


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

/**
 * Template Functions (helpers for templates)
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Single Post Helpers (TOC, read time, author bio)
 */
require get_template_directory() . '/inc/single-post.php';

/**
 * Mega Menu Nav Walker
 */
require get_template_directory() . '/inc/nav-walker.php';


/**
 * Shortcodes
 */
require get_template_directory() . '/inc/shortcodes.php';


/**
 * Media
 */
require get_template_directory() . '/inc/media.php';


/**
 * Team Easter Egg
 */
require get_template_directory() . '/inc/team-glasses.php';

/**
 * ACF Options Page (Red Egg Site Settings) — footer/company content
 */
if ( function_exists( 'acf_add_options_page' ) ) {
    require get_template_directory() . '/inc/options-page.php';
}

/**
 * Gravity Forms Customizations
 */
if ( class_exists( 'GFForms' ) ) {
    require get_template_directory() . '/inc/gravity-forms.php';
}

/**
 * Header reveal animations: add a `re-anim` flag to <html> before first
 * paint so opted-in headers start hidden (see _reveal-anim.scss) and
 * never flash before js/reveal-anim.js animates them in. Skipped when
 * the visitor prefers reduced motion (and, with no JS, never added at
 * all) so content always shows normally in those cases.
 */
function red_egg_reveal_head_flag() {
	?>
<script>(function(){try{if(!window.matchMedia||!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('re-anim');}}catch(e){}})();</script>
	<?php
}
add_action( 'wp_head', 'red_egg_reveal_head_flag', 2 );
