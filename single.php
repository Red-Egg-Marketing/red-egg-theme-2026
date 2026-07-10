<?php
/**
 * The template for displaying single posts (blog)
 *
 * Layout (per Figma):
 *   Featured image → date → title → read time →
 *   Table of Contents → content → author attribution
 *
 * @package Red_Egg
 */

get_header();

while ( have_posts() ) :
    the_post();
    ?>

    <main id="primary" class="site-main">
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post' ); ?>>
            <?php if ( has_post_thumbnail() ) : ?>
                    <div class="entry-thumbnail">
                        <?php the_post_thumbnail( 'large' ); ?>
                    </div><!-- .entry-thumbnail -->
            <?php endif; ?>
            <div class="block-wrapper single-post__wrapper">

                <header class="entry-header">
                    <p class="entry-date"><?php echo esc_html( get_the_date() ); ?></p>
                    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    <?php red_egg_the_read_time(); ?>
                </header><!-- .entry-header -->

                <?php red_egg_the_toc(); ?>

                <div class="entry-content">
                    <?php
                    the_content();

                    wp_link_pages( [
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'red-egg' ),
                        'after'  => '</div>',
                    ] );
                    ?>
                </div><!-- .entry-content -->

                <footer class="entry-footer">
                    <?php red_egg_the_author_bio(); ?>
                </footer><!-- .entry-footer -->

            </div><!-- .block-wrapper -->
        </article><!-- #post-<?php the_ID(); ?> -->

    </main><!-- #primary -->

    <?php
endwhile;

get_footer();
