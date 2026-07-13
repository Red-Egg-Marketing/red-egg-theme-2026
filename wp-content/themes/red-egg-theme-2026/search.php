<?php
/**
 * The template for displaying search results
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="block-wrapper">

        <header class="page-header">
            <h1 class="page-title">
                <?php
                printf(
                    /* translators: %s: search query */
                    esc_html__( 'Search Results for: %s', 'red-egg' ),
                    '<span>' . get_search_query() . '</span>'
                );
                ?>
            </h1>
        </header><!-- .page-header -->

        <?php if ( have_posts() ) : ?>

            <div class="posts-grid">
                <?php while ( have_posts() ) : the_post(); ?>
                    <?php get_template_part( 'template-parts/content', 'search' ); ?>
                <?php endwhile; ?>
            </div><!-- .posts-grid -->

            <?php red_egg_pagination(); ?>

        <?php else : ?>

            <?php get_template_part( 'template-parts/content', 'none' ); ?>

        <?php endif; ?>

    </div><!-- .block-wrapper -->
</main><!-- #primary -->

<?php
get_footer();
