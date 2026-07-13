<?php
/**
 * The front page template
 * 
 * When "Your homepage displays" is set to "A static page"
 * in Settings → Reading, this template is used.
 * The homepage content is built entirely with Gutenberg blocks.
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main">

    <?php
    while ( have_posts() ) :
        the_post();
        the_content();
    endwhile;
    ?>

</main><!-- #primary -->

<?php
get_footer();
