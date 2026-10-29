<?php
/**
 * ACF Options Page — Red Egg Site Settings
 *
 * Registers a site-wide settings page so footer content (company
 * info, social links, newsletter form) is editable in the admin
 * rather than hardcoded, matching the prior theme's approach. Fields
 * are read in footer.php via get_field( '<name>', 'options' ).
 *
 * @package Red_Egg
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( function_exists( 'acf_add_options_page' ) ) {
    acf_add_options_page( [
        'page_title' => __( 'Red Egg Site Settings', 'red-egg' ),
        'menu_title' => __( 'Red Egg Site Settings', 'red-egg' ),
        'menu_slug'  => 'red-egg-site-settings',
        'capability' => 'edit_theme_options',
        'redirect'   => false,
        'icon_url'   => 'dashicons-egg',
    ] );
}

// ============================================
//  Footer Links field group
// ============================================
//
// Registered in code (not the ACF UI) so it ships with the theme.
// 'ai_instructions_link' feeds the "AI Instructions" link in the
// footer's bottom bar; left empty, that link is simply omitted.

function red_egg_register_footer_link_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    acf_add_local_field_group( [
        'key'      => 'group_red_egg_footer_links',
        'title'    => __( 'Footer Links', 'red-egg' ),
        'fields'   => [
            [
                'key'           => 'field_red_egg_ai_instructions_link',
                'label'         => __( 'AI Instructions Link', 'red-egg' ),
                'name'          => 'ai_instructions_link',
                'type'          => 'link',
                'instructions'  => __( 'Page or file shown as "AI Instructions" in the footer bottom bar. Leave empty to hide it.', 'red-egg' ),
                'return_format' => 'array',
            ],
        ],
        'location' => [
            [
                [
                    'param'    => 'options_page',
                    'operator' => '==',
                    'value'    => 'red-egg-site-settings',
                ],
            ],
        ],
        'menu_order' => 20,
    ] );
}
add_action( 'acf/init', 'red_egg_register_footer_link_fields' );
