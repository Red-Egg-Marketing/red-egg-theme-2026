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
        <div class="block-wrapper">

            <header class="entry-header">
                <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                <div class="entry-meta">
                    <?php red_egg_posted_on(); ?>
                </div><!-- .entry-meta -->
            </header><!-- .entry-header -->

            <?php if ( has_post_thumbnail() ) : ?>
                <div class="entry-thumbnail">
                    <?php the_post_thumbnail( 'large' ); ?>
                </div><!-- .entry-thumbnail -->
            <?php endif; ?>

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
                <?php red_egg_entry_footer(); ?>
            </footer><!-- .entry-footer -->

        </div><!-- .block-wrapper -->
    </article><!-- #post-<?php the_ID(); ?> -->

    <?php
    // Previous/Next post navigation
    the_post_navigation( [
        'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous:', 'red-egg' ) . '</span> <span class="nav-title">%title</span>',
        'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next:', 'red-egg' ) . '</span> <span class="nav-title">%title</span>',
    ] );

    // Comments
    if ( comments_open() || get_comments_number() ) :
        comments_template();
    endif;
    ?>

</main><!-- #primary -->

<?php
get_footer();
