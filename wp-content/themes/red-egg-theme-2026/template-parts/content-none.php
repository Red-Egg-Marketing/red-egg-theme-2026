<?php
/**
 * Template part for displaying a message when no posts are found
 *
 * @package Red_Egg
 */
?>

<section class="no-results not-found">
    <header class="page-header">
        <h1 class="page-title"><?php esc_html_e( 'Nothing Found', 'red-egg' ); ?></h1>
    </header><!-- .page-header -->

    <div class="page-content">
        <?php if ( is_search() ) : ?>
            <p><?php esc_html_e( 'Sorry, nothing matched your search terms. Please try again with different keywords.', 'red-egg' ); ?></p>
            <?php get_search_form(); ?>
        <?php else : ?>
            <p><?php esc_html_e( "It seems we can't find what you're looking for.", 'red-egg' ); ?></p>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-gray">
                <span><?php esc_html_e( 'BACK TO HOME', 'red-egg' ); ?></span>
                <span class="btn-arrow"></span>
            </a>
        <?php endif; ?>
    </div><!-- .page-content -->
</section><!-- .no-results -->
