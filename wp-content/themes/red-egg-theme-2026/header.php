<?php
/**
 * The header for the theme
 *
 * Displays the site header with logo and primary navigation.
 * Desktop: horizontal nav links (About, Services, Work, Insights, Contact)
 * Mobile: logo + hamburger menu
 *
 * @package Red_Egg
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">

    <header id="masthead" class="site-header">
        <div class="site-header__inner">

            <div class="site-header__logo">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" aria-label="<?php bloginfo( 'name' ); ?>">
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/img/red-egg-header-logo.svg' ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="site-header__logo-img" />
                </a>
            </div><!-- .site-header__logo -->

            <nav id="site-navigation" class="main-navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'red-egg' ); ?>">
                <?php
                wp_nav_menu( [
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'menu_class'     => 'primary-menu',
                    'container'      => false,
                    'fallback_cb'    => false,
                    'depth'          => 3,
                    'walker'         => new Red_Egg_Mega_Walker(),
                ] );
                ?>
            </nav><!-- #site-navigation -->

            <button class="mobile-menu-toggle" aria-controls="mobile-menu" aria-expanded="false" aria-label="<?php esc_attr_e( 'Toggle Menu', 'red-egg' ); ?>">
                <span class="hamburger">
                    <span class="hamburger__line"></span>
                    <span class="hamburger__line"></span>
                    <span class="hamburger__line"></span>
                </span>
            </button>

        </div><!-- .site-header__inner -->
    </header><!-- #masthead -->

    <div id="mobile-menu" class="mobile-nav" aria-hidden="true">
        <div class="mobile-nav__bar">
            <a class="mobile-nav__logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" aria-label="<?php bloginfo( 'name' ); ?>">
                <img src="<?php echo esc_url( get_template_directory_uri() . '/img/re-logo.svg' ); ?>" alt="" />
            </a>
            <button class="mobile-nav__close" aria-label="<?php esc_attr_e( 'Close menu', 'red-egg' ); ?>">
                <svg class="mobile-nav__close-icon" width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.12612 29.8749C11.961 36.7098 23.04 36.7098 29.8749 29.8749C36.7098 23.04 36.7098 11.9611 29.8749 5.12617C23.04 -1.70874 11.961 -1.70874 5.12612 5.12617C-1.70879 11.9611 -1.70878 23.04 5.12612 29.8749ZM10.9266 21.7542L15.1803 17.5005L10.9266 13.2468L13.2468 10.9267L17.5005 15.1803L21.7542 10.9267L24.0744 13.2468L19.8207 17.5005L24.0744 21.7542L21.7542 24.0744L17.5005 19.8207L13.2468 24.0744L10.9266 21.7542Z" fill="#ffffff"/></svg>
            </button>
        </div>
        <nav class="mobile-nav__menu" aria-label="<?php esc_attr_e( 'Mobile Menu', 'red-egg' ); ?>">
            <?php
            wp_nav_menu( [
                'theme_location' => has_nav_menu( 'mobile' ) ? 'mobile' : 'primary',
                'menu_class'     => 'mobile-nav__list',
                'container'      => false,
                'fallback_cb'    => false,
                'depth'          => 2,
                'walker'         => new Red_Egg_Mobile_Walker(),
            ] );
            ?>
        </nav>
    </div><!-- #mobile-menu -->

    <div id="content" class="site-content">
