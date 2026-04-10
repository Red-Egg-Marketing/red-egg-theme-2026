<?php
/**
 * The template for displaying pages
 * 
 * Pages use Gutenberg blocks for layout, so this
 * template is a minimal shell.
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main">
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <?php
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile;
        ?>

    </article><!-- #post-<?php the_ID(); ?> -->
</main><!-- #primary -->

<?php
get_footer();
