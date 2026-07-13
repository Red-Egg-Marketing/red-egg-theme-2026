<?php
/**
 * Custom search form
 *
 * @package Red_Egg
 */
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <label class="sr-only" for="search-field"><?php esc_html_e( 'Search for:', 'red-egg' ); ?></label>
    <input
        type="search"
        id="search-field"
        class="search-form__input"
        placeholder="<?php esc_attr_e( 'Search&hellip;', 'red-egg' ); ?>"
        value="<?php echo get_search_query(); ?>"
        name="s"
    />
    <button type="submit" class="search-form__submit btn-gray">
        <span><?php esc_html_e( 'SEARCH', 'red-egg' ); ?></span>
        <span class="btn-arrow"></span>
    </button>
</form>
