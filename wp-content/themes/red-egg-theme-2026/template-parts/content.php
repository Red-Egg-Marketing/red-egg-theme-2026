<?php
/**
 * Template part for displaying posts in archive/index views
 *
 * @package Red_Egg
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
    <?php if ( has_post_thumbnail() ) : ?>
        <a href="<?php the_permalink(); ?>" class="post-card__image">
            <?php the_post_thumbnail( 'medium_large' ); ?>
        </a>
    <?php endif; ?>

    <div class="post-card__content">
        <p class="post-card__date"><?php echo esc_html( get_the_date( 'n.j.y' ) ); ?></p>

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
