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
            <header class="entry-header">
                    <div class="wrapper">
                        <p class="entry-date"><?php echo esc_html( get_the_date() ); ?></p>
                        <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    </div>
            </header><!-- .entry-header -->
            <div class="block-wrapper single-post__wrapper">
    
                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="entry-thumbnail">
                        <?php the_post_thumbnail( 'large' ); ?>
                        <?php red_egg_the_read_time(); ?>

                    </div><!-- .entry-thumbnail -->
                <?php endif; ?>

                <div class="entry-content">
                    <?php red_egg_the_toc(); ?>

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

        <?php red_egg_related_posts(); ?>
        <div class="wrapper single-meta">
            <div class="block-wrapper flex center">
                <div class="col-6 flex center">
                    <?php red_egg_posts_topics($id); ?>
                </div>
                <div class="col-6 flex center">
                    <?php
                        get_template_part('template-parts/social-share');
                    ?>
                </div>
            </div>
        </div>
    </div>
    </main><!-- #primary -->

    <?php
endwhile;

get_footer();
