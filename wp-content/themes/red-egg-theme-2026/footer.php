<?php
/**
 * The footer for the theme
 *
 * Company info, social links, and the newsletter form are pulled from
 * the ACF "Red Egg Site Settings" options page (see inc/options-page.php)
 * rather than hardcoded, so they're editable in the admin. Each field
 * falls back to a sensible default if ACF isn't active or the field is
 * empty, so the footer never renders blank.
 *
 * @package Red_Egg
 */

// ---- Pull ACF options (with fallbacks) ----
$re_has_acf = function_exists( 'get_field' );

$re_get = function ( $key, $default = '' ) use ( $re_has_acf ) {
    if ( ! $re_has_acf ) {
        return $default;
    }
    $val = get_field( $key, 'options' );
    return ( $val === null || $val === false || $val === '' ) ? $default : $val;
};

$re_name        = $re_get( 'business_name', 'Red Egg Marketing' );
$re_phone       = $re_get( 'business_phone', '720.513.5035' );
$re_street      = $re_get( 'business_street', '4045 Pecos Street, Suite 180' );
$re_city        = $re_get( 'business_city', 'Denver' );
$re_state       = $re_get( 'business_state', 'CO' );
$re_zip         = $re_get( 'business_zip', '80211' );
$re_social      = $re_has_acf ? get_field( 'icons', 'options' ) : false;

// Newsletter: form selected on the options page. Field name assumed
// 'newsletter_form' -- adjust if the actual ACF field differs.
$re_news_heading = $re_get( 'newsletter_heading', __( 'Get Monthly Marketing Tips', 'red-egg' ) );
$re_news_form_id = $re_has_acf ? get_field( 'newsletter_form', 'options' ) : '';

// Digits-only phone for the tel: href
$re_phone_href = preg_replace( '/[^0-9+]/', '', $re_phone );
?>

    </div><!-- #content -->

    <footer id="colophon" class="site-footer">
        <div class="site-footer__inner">
            <div class="block-wrapper">
                <div class="site-footer__grid">

                    <!-- Column 1: Logo + Contact Info -->
                    <div class="site-footer__col site-footer__col--info">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-footer__logo" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
                            <img src="<?php echo esc_url( get_template_directory_uri() . '/img/red-egg-footer-logo.svg' ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" />
                        </a>
                        <div class="site-footer__contact">
                            <?php if ( $re_name ) : ?>
                                <p class="site-footer__name"><?php echo esc_html( $re_name ); ?></p>
                            <?php endif; ?>
                            <?php if ( $re_street || $re_city ) : ?>
                                <p>
                                    <?php echo esc_html( $re_street ); ?><br />
                                    <?php echo esc_html( trim( $re_city . ', ' . $re_state . ' ' . $re_zip ) ); ?>
                                </p>
                            <?php endif; ?>
                            <?php if ( $re_phone ) : ?>
                                <p>
                                    <a href="tel:<?php echo esc_attr( $re_phone_href ); ?>"><?php echo esc_html( $re_phone ); ?></a>
                                </p>
                            <?php endif; ?>
                        </div><!-- .site-footer__contact -->
                    </div><!-- .site-footer__col--info -->

                    <!-- Column 2: Newsletter Signup -->
                    <div class="site-footer__col site-footer__col--newsletter">
                        <?php if ( $re_news_heading ) : ?>
                            <p class="site-footer__newsletter-heading"><?php echo esc_html( $re_news_heading ); ?></p>
                        <?php endif; ?>

                        <div class="site-footer__newsletter-form">
                            <?php
                            if ( $re_news_form_id && function_exists( 'gravity_form' ) ) {
                                // ACF may store the form as an ID, or as an array
                                // (form object) depending on the field's return
                                // format -- handle both.
                                $re_form_id = is_array( $re_news_form_id )
                                    ? ( $re_news_form_id['id'] ?? '' )
                                    : $re_news_form_id;

                                if ( $re_form_id ) {
                                    gravity_form(
                                        (int) $re_form_id,
                                        false, // title
                                        false, // description
                                        false, // deprecated
                                        null,  // field values
                                        true,  // ajax
                                        0,     // tabindex
                                        true   // echo
                                    );
                                }
                            } else {
                                // Fallback before a Gravity Form is selected in
                                // the options page: a non-functional visual stub
                                // so the footer layout still reads correctly.
                                ?>
                                <p class="site-footer__newsletter-note">
                                    <?php esc_html_e( 'Select a newsletter form under Red Egg Site Settings.', 'red-egg' ); ?>
                                </p>
                                <?php
                            }
                            ?>
                        </div>

                        <?php if ( is_array( $re_social ) && count( $re_social ) > 0 ) : ?>
                            <ul class="site-footer__social">
                                <?php foreach ( $re_social as $icon ) :
                                    // Repeater 'icons' -> row -> 'social' group with
                                    // 'link' (URL) + 'icon_class' (FA brand slug).
                                    $social  = $icon['social'] ?? [];
                                    $s_url   = $social['link'] ?? '';
                                    $s_class = $social['icon_class'] ?? '';
                                    if ( ! $s_url || ! $s_class ) {
                                        continue;
                                    }
                                    ?>
                                    <li>
                                        <a href="<?php echo esc_url( $s_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr( $s_class ); ?>">
                                            <i class="fa-brands fa-<?php echo esc_attr( $s_class ); ?>"></i>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </div><!-- .site-footer__col--newsletter -->

                    <!-- Column 3: Footer Nav -->
                    <div class="site-footer__col site-footer__col--nav">
                        <?php
                        wp_nav_menu( [
                            'theme_location' => 'footer',
                            'menu_id'        => 'footer-menu',
                            'menu_class'     => 'footer-menu',
                            'container'      => false,
                            'fallback_cb'    => false,
                            'depth'          => 1,
                        ] );
                        ?>
                    </div><!-- .site-footer__col--nav -->

                </div><!-- .site-footer__grid -->
            </div><!-- .block-wrapper -->
        </div><!-- .site-footer__inner -->

        <div class="site-footer__bottom">
            <div class="block-wrapper">
                <p>&copy; <?php echo esc_html( date( 'Y' ) ); ?> &nbsp;|&nbsp; <a href="<?php echo esc_url( get_privacy_policy_url() ); ?>"><?php esc_html_e( 'Privacy Policy', 'red-egg' ); ?></a> &nbsp;|&nbsp; <?php esc_html_e( 'Website Design by Red Egg Marketing', 'red-egg' ); ?></p>
            </div>
        </div><!-- .site-footer__bottom -->
    </footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
