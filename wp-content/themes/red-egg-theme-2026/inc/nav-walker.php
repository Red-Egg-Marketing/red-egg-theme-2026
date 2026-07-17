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
            $output .= '<button type="button" class="mega-menu__close" aria-label="' . esc_attr__( 'Close menu', 'red-egg' ) . '"><span aria-hidden="true"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.367283 2.13337C-0.122428 1.64366 -0.122428 0.851784 0.367283 0.367283C0.856994 -0.117218 1.64887 -0.122428 2.13337 0.367283L10 8.23392L17.8666 0.367283C18.3563 -0.122428 19.1482 -0.122428 19.6327 0.367283C20.1172 0.856994 20.1224 1.64887 19.6327 2.13337L11.7661 10L19.6327 17.8666C20.1224 18.3563 20.1224 19.1482 19.6327 19.6327C19.143 20.1172 18.3511 20.1224 17.8666 19.6327L10 11.7661L2.13337 19.6327C1.64366 20.1224 0.851784 20.1224 0.367283 19.6327C-0.117218 19.143 -0.122428 18.3511 0.367283 17.8666L8.23392 10L0.367283 2.13337Z" fill="white"/>
</svg>
</span></button>';
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


/**
 * Mobile Nav Walker
 *
 * Full-screen mobile menu. Top-level items with children get a
 * toggle button that expands an accordion of their children; the
 * item title itself stays a normal link.
 */
class Red_Egg_Mobile_Walker extends Walker_Nav_Menu {

	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '<ul class="mobile-nav__sub">';
	}

	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '</ul>';
	}

	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$title = esc_html( $item->title );
		$url   = ( $item->url && '#' !== $item->url ) ? esc_url( $item->url ) : '#';
		$has_children = in_array( 'menu-item-has-children', (array) $item->classes, true );

		if ( 0 === $depth ) {
			$classes = 'mobile-nav__item' . ( $has_children ? ' has-children' : '' );
			$output .= '<li class="' . esc_attr( $classes ) . '">';
			$output .= '<a class="mobile-nav__link" href="' . $url . '">' . $title . '</a>';
			if ( $has_children ) {
				$output .= '<button type="button" class="mobile-nav__toggle" aria-expanded="false" aria-label="' . esc_attr__( 'Toggle submenu', 'red-egg' ) . '">';
				// Plus (opens the submenu)
				$output .= '<svg class="mobile-nav__toggle-icon mobile-nav__toggle-icon--open" width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.5 35C27.166 35 35 27.166 35 17.5C35 7.83398 27.166 0 17.5 0C7.83398 0 0 7.83398 0 17.5C0 27.166 7.83398 35 17.5 35ZM15.8594 25.1562V19.1406H9.84375V15.8594H15.8594V9.84375H19.1406V15.8594H25.1562V19.1406H19.1406V25.1562H15.8594Z" fill="white"/></svg>';
				// Circle-X (closes the submenu)
				$output .= '<svg class="mobile-nav__toggle-icon mobile-nav__toggle-icon--close" width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.12612 29.8749C11.961 36.7098 23.04 36.7098 29.8749 29.8749C36.7098 23.04 36.7098 11.9611 29.8749 5.12617C23.04 -1.70874 11.961 -1.70874 5.12612 5.12617C-1.70879 11.9611 -1.70878 23.04 5.12612 29.8749ZM10.9266 21.7542L15.1803 17.5005L10.9266 13.2468L13.2468 10.9267L17.5005 15.1803L21.7542 10.9267L24.0744 13.2468L19.8207 17.5005L24.0744 21.7542L21.7542 24.0744L17.5005 19.8207L13.2468 24.0744L10.9266 21.7542Z" fill="white"/></svg>';
				$output .= '</button>';
			}
		} else {
			$output .= '<li class="mobile-nav__sub-item">';
			$output .= '<a class="mobile-nav__sub-link" href="' . $url . '">' . $title . '</a>';
		}
	}

	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= '</li>';
	}
}
