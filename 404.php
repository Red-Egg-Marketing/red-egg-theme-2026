<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="block-wrapper">

        <section class="error-404 not-found">
            <header class="page-header">
                <h1 class="page-title"><?php esc_html_e( 'Page Not Found', 'red-egg' ); ?></h1>
            </header><!-- .page-header -->

            <div class="page-content">
                <p><?php esc_html_e( "It looks like this page has flown the coop. Let's get you back on track.", 'red-egg' ); ?></p>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-gray">
                    <span><?php esc_html_e( 'BACK TO HOME', 'red-egg' ); ?></span>
                    <span class="btn-arrow"></span>
                </a>
            </div><!-- .page-content -->
        </section><!-- .error-404 -->

    </div><!-- .block-wrapper -->
</main><!-- #primary -->

<?php
get_footer();
