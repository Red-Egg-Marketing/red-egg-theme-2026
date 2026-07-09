<?php
/**
 * Mega Menu Nav Walker
 *
 * Custom Walker for the primary (desktop) navigation.
 * Any top-level item that has children renders as a click-toggle
 * button that opens a full-width mega panel. The item's children
 * become column headings; grandchildren become the column links.
 *
 * Desktop only — the mobile menu is rendered/handled separately.
 *
 * @package Red_Egg
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Red_Egg_Mega_Walker extends Walker_Nav_Menu {

    /**
     * Holds the current top-level item so start_lvl() (which is not
     * passed the parent) can build the panel chrome (id + eyebrow).
     *
     * @var object|null
     */
    private $top_item = null;

    /**
     * Start element output.
     */
    public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $title = esc_html( $item->title );
        $url   = ( $item->url && '#' !== $item->url ) ? esc_url( $item->url ) : '';

        if ( 0 === $depth ) {
            $this->top_item   = $item;
            $has_children     = in_array( 'menu-item-has-children', (array) $item->classes, true );
            $classes          = 'menu-item' . ( $has_children ? ' menu-item-has-children mega-parent' : '' );

            $output .= '<li class="' . esc_attr( $classes ) . '">';

            if ( $has_children ) {
                $panel_id = 'mega-menu-' . $item->ID;
                $output  .= '<button type="button" class="mega-toggle" aria-expanded="false" aria-controls="' . esc_attr( $panel_id ) . '">';
                $output  .= $title;
                $output  .= '<span class="mega-toggle__caret" aria-hidden="true"></span>';
                $output  .= '</button>';
            } else {
                $output .= '<a class="menu-link" href="' . ( $url ? $url : '#' ) . '">' . $title . '</a>';
            }
            return;
        }

        if ( 1 === $depth ) {
            // Column heading.
            $output .= '<div class="mega-menu__col">';
            if ( $url ) {
                $output .= '<a class="mega-menu__col-title" href="' . $url . '">' . $title . '</a>';
            } else {
                $output .= '<span class="mega-menu__col-title">' . $title . '</span>';
            }
            return;
        }

        if ( 2 === $depth ) {
            // Column link.
            $output .= '<li class="mega-menu__link-item"><a class="mega-menu__link" href="' . ( $url ? $url : '#' ) . '">' . $title . '</a></li>';
            return;
        }
    }

    /**
     * Start of a child level.
     */
    public function start_lvl( &$output, $depth = 0, $args = null ) {
        if ( 0 === $depth ) {
            // Opening the children of a top-level item = the mega panel.
            $item     = $this->top_item;
            $panel_id = 'mega-menu-' . $item->ID;
            $logo     = esc_url( get_template_directory_uri() . '/img/re-logo.svg' );

            $output .= '<div id="' . esc_attr( $panel_id ) . '" class="mega-menu" role="region" aria-label="' . esc_attr( $item->title ) . '" hidden>';
            $output .= '<div class="mega-menu__inner">';
            $output .= '<div class="mega-menu__bar">';
            $output .= '<a class="mega-menu__logo" href="' . esc_url( home_url( '/' ) ) . '" aria-label="' . esc_attr( get_bloginfo( 'name' ) ) . '"><img src="' . $logo . '" alt="" /></a>';
            $output .= '<button type="button" class="mega-menu__close" aria-label="' . esc_attr__( 'Close menu', 'red-egg' ) . '"><span aria-hidden="true">&times;</span></button>';
            $output .= '</div>';
            $output .= '<span class="mega-menu__eyebrow">' . esc_html( $item->title ) . '</span>';
            $output .= '<div class="mega-menu__cols">';
            return;
        }

        if ( 1 === $depth ) {
            $output .= '<ul class="mega-menu__links">';
        }
    }

    /**
     * End of a child level.
     */
    public function end_lvl( &$output, $depth = 0, $args = null ) {
        if ( 0 === $depth ) {
            $output .= '</div>';   // .mega-menu__cols
            $output .= '</div>';   // .mega-menu__inner
            $output .= '</div>';   // .mega-menu
            return;
        }

        if ( 1 === $depth ) {
            $output .= '</ul>';    // .mega-menu__links
        }
    }

    /**
     * End element output.
     */
    public function end_el( &$output, $item, $depth = 0, $args = null ) {
        if ( 0 === $depth ) {
            $output .= '</li>';
            return;
        }

        if ( 1 === $depth ) {
            $output .= '</div>';   // .mega-menu__col
        }
        // depth 2 <li> is self-closed in start_el().
    }
}
