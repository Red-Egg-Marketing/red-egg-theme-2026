<?php
/**
 * Gravity Forms Customizations
 *
 * Theme-specific tweaks to Gravity Forms output.
 *
 * @package Red_Egg
 */

// ============================================
//  Render submit as <button> (not <input>)
// ============================================
//
// <input type="submit"> is a replaced element, so ::before/::after
// pseudo-elements don't render on it. Our outline-gray button style
// uses an ::after arrow, so we swap the submit input for a <button>
// that keeps the same id, classes, and text.

if ( ! function_exists( 'red_egg_gform_submit_button' ) ) :
    function red_egg_gform_submit_button( $button, $form ) {
        $dom = new DOMDocument();
        // Suppress warnings from HTML5 input attributes
        libxml_use_internal_errors( true );
        $dom->loadHTML( '<?xml encoding="UTF-8">' . $button );
        libxml_clear_errors();

        $input = $dom->getElementsByTagName( 'input' )->item( 0 );
        if ( ! $input ) {
            return $button;
        }

        $button_el = $dom->createElement( 'button' );

        // Copy over all attributes from the input
        foreach ( $input->attributes as $attr ) {
            // Skip value/type; we set those explicitly below
            if ( in_array( $attr->name, [ 'value', 'type' ], true ) ) {
                continue;
            }
            $button_el->setAttribute( $attr->name, $attr->value );
        }

        $button_el->setAttribute( 'type', 'submit' );

        // Use the input's value as the button label
        $label = $input->getAttribute( 'value' );
        $button_el->appendChild( $dom->createTextNode( $label ) );

        $input->parentNode->replaceChild( $button_el, $input );

        // Return only the inner markup (strip the doctype/html/body wrapper)
        $body = $dom->getElementsByTagName( 'body' )->item( 0 );
        $html = '';
        foreach ( $body->childNodes as $child ) {
            $html .= $dom->saveHTML( $child );
        }

        return $html;
    }
endif;
add_filter( 'gform_submit_button', 'red_egg_gform_submit_button', 10, 2 );
