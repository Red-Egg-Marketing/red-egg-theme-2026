<?php
/**
 * Template part for displaying posts in archive/index views
 *
 * Same card as the Filterable Case Studies block (.cs-card):
 * image on top, title, excerpt revealed on hover. Standard posts
 * also get a small date line above the title.
 *
 * @package Red_Egg
 */

$show_date = ( 'post' === get_post_type() );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'cs-card' ); ?>>
    <a class="cs-card__link" href="<?php the_permalink(); ?>">

        <?php if ( has_post_thumbnail() ) : ?>
            <div class="cs-card__image">
                <div class="cs-card__image-inner">
                    <?php the_post_thumbnail( 'post-landscape', [ 'loading' => 'lazy' ] ); ?>
                </div>
            </div><!-- .cs-card__image -->
        <?php endif; ?>

        <div class="cs-card__content">
            <?php if ( $show_date ) : ?>
                <p class="cs-card__date"><?php echo esc_html( get_the_date( 'n.j.y' ) ); ?></p>
            <?php endif; ?>

            <?php the_title( '<h3 class="cs-card__title">', '</h3>' ); ?>

            <?php if ( has_excerpt() || '' !== get_the_excerpt() ) : ?>
                <p class="cs-card__excerpt"><?php echo esc_html( wp_strip_all_tags( get_the_excerpt() ) ); ?></p>
            <?php endif; ?>
        </div><!-- .cs-card__content -->

    </a>
</article><!-- #post-<?php the_ID(); ?> -->
