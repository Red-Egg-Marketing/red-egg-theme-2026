<?php
/**
 * The main template file
 *
 * Default fallback template for all content types, and the
 * blog home when a static front page is set. Shares the
 * archive layout: Services-style hero + .cs-card grid.
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main archive-main">

    <?php red_egg_archive_hero(); ?>

    <section class="archive-listing">
        <div class="block-wrapper">

            <?php if ( have_posts() ) : ?>

                <div class="archive-grid">
                    <?php while ( have_posts() ) : the_post(); ?>
                        <?php get_template_part( 'template-parts/content', get_post_type() ); ?>
                    <?php endwhile; ?>
                </div><!-- .archive-grid -->

                <?php red_egg_pagination(); ?>

            <?php else : ?>

                <?php get_template_part( 'template-parts/content', 'none' ); ?>

            <?php endif; ?>

        </div><!-- .block-wrapper -->
    </section><!-- .archive-listing -->

</main><!-- #primary -->

<?php
get_footer();
