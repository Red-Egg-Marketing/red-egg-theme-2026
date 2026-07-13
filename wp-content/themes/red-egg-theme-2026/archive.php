<?php
/**
 * The template for displaying archive pages
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="block-wrapper">

        <?php if ( have_posts() ) : ?>

            <header class="archive-header">
                <?php
                the_archive_title( '<h1 class="archive-title">', '</h1>' );
                the_archive_description( '<div class="archive-description">', '</div>' );
                ?>
            </header><!-- .archive-header -->

            <div class="posts-grid">
                <?php while ( have_posts() ) : the_post(); ?>
                    <?php get_template_part( 'template-parts/content', get_post_type() ); ?>
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
