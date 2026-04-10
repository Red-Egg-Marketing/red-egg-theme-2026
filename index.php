<?php
/**
 * The main template file
 * 
 * Default fallback template for all content types.
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="block-wrapper">

        <?php if ( have_posts() ) : ?>

            <?php if ( is_home() && ! is_front_page() ) : ?>
                <header class="page-header">
                    <h1 class="page-title"><?php single_post_title(); ?></h1>
                </header>
            <?php endif; ?>

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
