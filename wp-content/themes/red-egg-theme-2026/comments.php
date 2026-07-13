<?php
/**
 * The template for displaying comments
 *
 * @package Red_Egg
 */

// Prevent direct access
if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area">

    <?php if ( have_comments() ) : ?>

        <h2 class="comments-title">
            <?php
            $comment_count = get_comments_number();
            if ( '1' === $comment_count ) {
                printf(
                    /* translators: 1: title */
                    esc_html__( 'One comment on &ldquo;%1$s&rdquo;', 'red-egg' ),
                    '<span>' . wp_kses_post( get_the_title() ) . '</span>'
                );
            } else {
                printf(
                    /* translators: 1: comment count, 2: title */
                    esc_html( _nx( '%1$s comment on &ldquo;%2$s&rdquo;', '%1$s comments on &ldquo;%2$s&rdquo;', $comment_count, 'comments title', 'red-egg' ) ),
                    number_format_i18n( $comment_count ),
                    '<span>' . wp_kses_post( get_the_title() ) . '</span>'
                );
            }
            ?>
        </h2><!-- .comments-title -->

        <ol class="comment-list">
            <?php
            wp_list_comments( [
                'style'      => 'ol',
                'short_ping' => true,
            ] );
            ?>
        </ol><!-- .comment-list -->

        <?php
        the_comments_navigation();

    endif;

    // Show comment form
    comment_form();
    ?>

</div><!-- #comments -->
