<?php
/**
 * Template Name: Article (TOC + Read Time)
 * Template Post Type: page
 *
 * A page layout that mirrors the single blog post — featured image,
 * title, read time, table of contents, then content — but WITHOUT the
 * post meta: no date, no author bio, no category topics, no related
 * posts, and no social share.
 *
 * Reuses the `.single-post` markup/classes so it inherits the exact
 * post styling. Heading-ID injection for the table of contents is
 * enabled for this template in inc/single-post.php.
 *
 * @package Red_Egg
 */

get_header();

while ( have_posts() ) :
    the_post();
    ?>

    <main id="primary" class="site-main">
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post single-post--article' ); ?>>
            <?php if ( has_post_thumbnail() ) : ?>
                    <div class="entry-thumbnail">
                        <?php the_post_thumbnail( 'large' ); ?>
                    </div><!-- .entry-thumbnail -->
            <?php endif; ?>
            <div class="wrapper">

                <header class="entry-header">
                    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    <?php red_egg_the_read_time(); ?>
                </header><!-- .entry-header -->


                <div class="entry-content">
                    <?php
                    red_egg_the_toc();

                    the_content();

                    wp_link_pages( [
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'red-egg' ),
                        'after'  => '</div>',
                    ] );
                    ?>
                </div><!-- .entry-content -->

            </div><!-- .block-wrapper -->
        </article><!-- #post-<?php the_ID(); ?> -->
    </main><!-- #primary -->

    <?php
endwhile;

get_footer();
