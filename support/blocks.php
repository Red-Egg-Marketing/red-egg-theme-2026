<?php
/**
 * Custom Gutenberg Blocks
 * 
 * Registers all Red Egg theme blocks.
 * Required from functions.php
 * 
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

// ============================================
//  Block Editor Assets
// ============================================

function red_egg_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'red-egg-editor-blocks',
        get_template_directory_uri() . '/support/assets/js/editor.blocks.js',
        [
            'wp-i18n',
            'wp-element',
            'wp-blocks',
            'wp-components',
            'wp-editor',
            'wp-block-editor',
            'wp-dom-ready',
            'wp-api-request',
            'lodash',
        ],
        'v1.0.0',
        true
    );

    wp_enqueue_style(
        'red-egg-editor-blocks-css',
        get_template_directory_uri() . '/blocks.editor.css',
        [],
        'v1.0.0'
    );
}
add_action( 'enqueue_block_editor_assets', 'red_egg_enqueue_block_editor_assets' );


// ============================================
//  Frontend Assets for Dynamic Blocks
// ============================================

function red_egg_enqueue_block_frontend_assets() {
    // Only load frontend scripts if the blocks are present on the page
    if ( ! is_admin() ) {
        wp_enqueue_script(
            'red-egg-frontend-blocks',
            get_template_directory_uri() . '/support/assets/js/main.js',
            [
                'wp-element',
                'wp-api-request',
            ],
            'v1.0.0',
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'red_egg_enqueue_block_frontend_assets' );


// ============================================
//  Block Registration
// ============================================

function red_egg_register_blocks() {

    // ---- 1. Hero Background ----
    register_block_type( 'red-egg-block/hero-background', [
        'editor_script' => 'red-egg-editor-blocks',
    ] );

    // ---- 2. Columns Group ----
    register_block_type( 'red-egg-block/columns-group', [
        'editor_script' => 'red-egg-editor-blocks',
    ] );

    // ---- 3. Text Cards Grid ----
    register_block_type( 'red-egg-block/text-cards-grid', [
        'editor_script' => 'red-egg-editor-blocks',
    ] );

    // ---- 4. Numbered List Items ----
    register_block_type( 'red-egg-block/numbered-list', [
        'editor_script' => 'red-egg-editor-blocks',
    ] );

    // ---- 5. Case Studies Slider ----
    register_block_type( 'red-egg-block/case-studies-slider', [
        'editor_script' => 'red-egg-editor-blocks',
    ] );

    // ---- 6. Testimonials ----
    register_block_type( 'red-egg-block/testimonials', [
        'editor_script' => 'red-egg-editor-blocks',
    ] );

    // ---- 7. Insights ----
    register_block_type( 'red-egg-block/insights', [
        'editor_script' => 'red-egg-editor-blocks',
    ] );

    // ---- 8. Contact Section ----
    // Uses a render callback to process form shortcodes
    register_block_type( 'red-egg-block/contact-section', [
        'editor_script'   => 'red-egg-editor-blocks',
        'render_callback' => 'red_egg_render_contact_section',
        'attributes'      => [
            'sectionLabel' => [
                'type'    => 'string',
                'default' => 'READY?',
            ],
            'heading' => [
                'type'    => 'string',
                'default' => "Let's Hatch Some Ideas",
            ],
            'email' => [
                'type'    => 'string',
                'default' => 'hello@redeggmarketing.com',
            ],
            'phone' => [
                'type'    => 'string',
                'default' => '720.513.5035',
            ],
            'addressLine1' => [
                'type'    => 'string',
                'default' => '4045 Pecos Street, Suite 180',
            ],
            'addressLine2' => [
                'type'    => 'string',
                'default' => 'Denver, CO 80211',
            ],
            'formShortcode' => [
                'type'    => 'string',
                'default' => '',
            ],
            'padding' => [
                'type'    => 'object',
                'default' => [
                    'paddingtop'    => '',
                    'paddingright'  => '',
                    'paddingbottom' => '',
                    'paddingleft'   => '',
                    'unit'          => 'rem',
                ],
            ],
            'margin' => [
                'type'    => 'object',
                'default' => [
                    'margintop'    => '',
                    'marginright'  => '',
                    'marginbottom' => '',
                    'marginleft'   => '',
                    'unit'         => 'rem',
                ],
            ],
        ],
    ] );
}
add_action( 'init', 'red_egg_register_blocks' );


// ============================================
//  Contact Section Render Callback
//  
//  Processes the form shortcode via PHP so
//  do_shortcode() can run server-side.
// ============================================

function red_egg_render_contact_section( $attributes ) {
    $section_label = esc_html( $attributes['sectionLabel'] );
    $heading       = esc_html( $attributes['heading'] );
    $email         = esc_html( $attributes['email'] );
    $phone         = esc_html( $attributes['phone'] );
    $address_1     = esc_html( $attributes['addressLine1'] );
    $address_2     = esc_html( $attributes['addressLine2'] );
    $shortcode     = $attributes['formShortcode'];
    $padding       = $attributes['padding'];
    $margin        = $attributes['margin'];

    // Build CSS classes
    $classes = 'contact-section wp-block-red-egg-block-contact-section';

    // Build unique ID for inline styles
    $block_id = 'contact-section-' . wp_unique_id();

    // Build inline padding/margin styles
    $inline_style = '';
    $p_unit = ! empty( $padding['unit'] ) ? $padding['unit'] : 'rem';
    if ( ! empty( $padding['paddingtop'] ) ) {
        $inline_style .= 'padding-top:' . esc_attr( $padding['paddingtop'] ) . $p_unit . ';';
    }
    if ( ! empty( $padding['paddingright'] ) ) {
        $inline_style .= 'padding-right:' . esc_attr( $padding['paddingright'] ) . $p_unit . ';';
    }
    if ( ! empty( $padding['paddingbottom'] ) ) {
        $inline_style .= 'padding-bottom:' . esc_attr( $padding['paddingbottom'] ) . $p_unit . ';';
    }
    if ( ! empty( $padding['paddingleft'] ) ) {
        $inline_style .= 'padding-left:' . esc_attr( $padding['paddingleft'] ) . $p_unit . ';';
    }

    $m_unit = ! empty( $margin['unit'] ) ? $margin['unit'] : 'rem';
    if ( ! empty( $margin['margintop'] ) ) {
        $inline_style .= 'margin-top:' . esc_attr( $margin['margintop'] ) . $m_unit . ';';
    }
    if ( ! empty( $margin['marginright'] ) ) {
        $inline_style .= 'margin-right:' . esc_attr( $margin['marginright'] ) . $m_unit . ';';
    }
    if ( ! empty( $margin['marginbottom'] ) ) {
        $inline_style .= 'margin-bottom:' . esc_attr( $margin['marginbottom'] ) . $m_unit . ';';
    }
    if ( ! empty( $margin['marginleft'] ) ) {
        $inline_style .= 'margin-left:' . esc_attr( $margin['marginleft'] ) . $m_unit . ';';
    }

    // Phone href: strip dots
    $phone_href = preg_replace( '/[^0-9]/', '', $phone );

    // Form output
    $form_html = '';
    if ( ! empty( $shortcode ) ) {
        $form_html = '<div class="contact-section__form-shortcode">' . do_shortcode( $shortcode ) . '</div>';
    } else {
        $form_html = '
            <div class="contact-section__form">
                <div class="contact-section__form-row">
                    <input type="text" placeholder="' . esc_attr__( 'First Name', 'red-egg' ) . '" class="contact-section__input" />
                    <input type="text" placeholder="' . esc_attr__( 'Last Name', 'red-egg' ) . '" class="contact-section__input" />
                </div>
                <div class="contact-section__form-row">
                    <input type="tel" placeholder="' . esc_attr__( 'Phone', 'red-egg' ) . '" class="contact-section__input" />
                    <input type="email" placeholder="' . esc_attr__( 'Email', 'red-egg' ) . '" class="contact-section__input" />
                </div>
                <div class="contact-section__form-row">
                    <textarea placeholder="' . esc_attr__( 'Message', 'red-egg' ) . '" class="contact-section__textarea" rows="5"></textarea>
                </div>
                <div class="contact-section__form-submit">
                    <button type="submit" class="btn-gray">
                        <span>' . esc_html__( 'SUBMIT', 'red-egg' ) . '</span>
                        <span class="btn-arrow"></span>
                    </button>
                </div>
            </div>';
    }

    $block_content = '';
    $style_attr = ! empty( $inline_style ) ? ' style="' . esc_attr( $inline_style ) . '"' : '';
    $block_content .= '<section id="' . esc_attr( $block_id ) . '" class="' . esc_attr( $classes ) . '"' . $style_attr . '>';
    $block_content .= '<div class="contact-section__bg"></div>';
    $block_content .= '<div class="block-wrapper">';

    // Left column
    $block_content .= '<div class="contact-section__left">';
    $block_content .= '<p class="contact-section__label">' . $section_label . '</p>';
    $block_content .= '<h2 class="contact-section__heading">' . $heading . '</h2>';
    $block_content .= '<div class="contact-section__info">';
    $block_content .= '<a href="mailto:' . esc_attr( $email ) . '" class="contact-section__info-item">';
    $block_content .= '<span class="contact-section__icon contact-section__icon--email"></span>';
    $block_content .= '<span class="contact-section__info-text">' . $email . '</span>';
    $block_content .= '</a>';
    $block_content .= '<a href="tel:' . esc_attr( $phone_href ) . '" class="contact-section__info-item">';
    $block_content .= '<span class="contact-section__icon contact-section__icon--phone"></span>';
    $block_content .= '<span class="contact-section__info-text">' . $phone . '</span>';
    $block_content .= '</a>';
    $block_content .= '<div class="contact-section__info-item">';
    $block_content .= '<span class="contact-section__icon contact-section__icon--location"></span>';
    $block_content .= '<span class="contact-section__info-text">' . $address_1 . '<br />' . $address_2 . '</span>';
    $block_content .= '</div>';
    $block_content .= '</div>';
    $block_content .= '</div>';

    // Right column
    $block_content .= '<div class="contact-section__right">';
    $block_content .= $form_html;
    $block_content .= '</div>';

    $block_content .= '</div><!-- .block-wrapper -->';
    $block_content .= '</section>';

    return $block_content;
}
