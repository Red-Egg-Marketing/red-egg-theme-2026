<?php
/**
 * The sidebar containing the widget area
 *
 * @package Red_Egg
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
    return;
}
?>

<aside id="secondary" class="widget-area">
    <?php dynamic_sidebar( 'sidebar-1' ); ?>
</aside><!-- #secondary -->
