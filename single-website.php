<?php
/**
 * The template for displaying single posts
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main">
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

            <div class="entry-content">
                <?php
                the_content();

            
                ?>
            </div><!-- .entry-content -->


    </article><!-- #post-<?php the_ID(); ?> -->

</main><!-- #primary -->

<?php
get_footer();
