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
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/img/re-logo.svg' ); ?>" alt="<?php bloginfo( 'name' ); ?>" class="site-header__logo-img" />
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
                    'depth'          => 2,
                ] );
                ?>
            </nav><!-- #site-navigation -->

            <button class="mobile-menu-toggle" aria-controls="site-navigation" aria-expanded="false" aria-label="<?php esc_attr_e( 'Toggle Menu', 'red-egg' ); ?>">
                <span class="hamburger">
                    <span class="hamburger__line"></span>
                    <span class="hamburger__line"></span>
                    <span class="hamburger__line"></span>
                </span>
            </button>

        </div><!-- .site-header__inner -->
    </header><!-- #masthead -->

    <div id="content" class="site-content">
