<?php
/**
 * The template for displaying pages
 *
 * Pages use Gutenberg blocks for layout, so this
 * template is a minimal shell. Content is wrapped in
 * .entry-content so top-level core blocks (headings,
 * lists, tables, blockquotes) pick up the shared content
 * styles — the same as on posts.
 *
 * @package Red_Egg
 */

get_header();
?>

<main id="primary" class="site-main">
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

        <div class="entry-content">
            <?php
            while ( have_posts() ) :
                the_post();
                the_content();
            endwhile;
            ?>
        </div><!-- .entry-content -->

    </article><!-- #post-<?php the_ID(); ?> -->
</main><!-- #primary -->

<?php
get_footer();
