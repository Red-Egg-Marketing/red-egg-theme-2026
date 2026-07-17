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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.367283 2.13337C-0.122428 1.64366 -0.122428 0.851784 0.367283 0.367283C0.856994 -0.117218 1.64887 -0.122428 2.13337 0.367283L10 8.23392L17.8666 0.367283C18.3563 -0.122428 19.1482 -0.122428 19.6327 0.367283C20.1172 0.856994 20.1224 1.64887 19.6327 2.13337L11.7661 10L19.6327 17.8666C20.1224 18.3563 20.1224 19.1482 19.6327 19.6327C19.143 20.1172 18.3511 20.1224 17.8666 19.6327L10 11.7661L2.13337 19.6327C1.64366 20.1224 0.851784 20.1224 0.367283 19.6327C-0.117218 19.143 -0.122428 18.3511 0.367283 17.8666L8.23392 10L0.367283 2.13337Z" fill="currentColor"/></svg>
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
