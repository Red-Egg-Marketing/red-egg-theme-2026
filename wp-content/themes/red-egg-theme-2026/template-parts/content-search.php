<?php
/**
 * Template part for displaying results in search pages
 *
 * @package Red_Egg
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card post-card--search' ); ?>>
    <div class="post-card__content">
        <?php the_title( '<h2 class="post-card__title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' ); ?>

        <div class="post-card__excerpt">
            <?php the_excerpt(); ?>
        </div>

        <a href="<?php the_permalink(); ?>" class="btn-gray">
            <span><?php esc_html_e( 'READ MORE', 'red-egg' ); ?></span>
            <span class="btn-arrow"></span>
        </a>
    </div><!-- .post-card__content -->
</article><!-- #post-<?php the_ID(); ?> -->
