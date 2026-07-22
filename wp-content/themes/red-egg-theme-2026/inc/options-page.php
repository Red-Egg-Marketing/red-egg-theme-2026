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
