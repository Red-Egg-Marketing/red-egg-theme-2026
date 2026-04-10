<?php
/**
 * The footer for the theme
 *
 * Dark gray footer with logo, contact info, newsletter signup,
 * social links, footer nav, and copyright line.
 *
 * @package Red_Egg
 */
?>

    </div><!-- #content -->

    <footer id="colophon" class="site-footer">
        <div class="site-footer__inner">
            <div class="block-wrapper">
                <div class="site-footer__grid">

                    <!-- Column 1: Logo + Contact Info -->
                    <div class="site-footer__col site-footer__col--info">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-footer__logo" aria-label="<?php bloginfo( 'name' ); ?>">
                            <img src="<?php echo esc_url( get_template_directory_uri() . '/img/re-logo-inline-white.svg' ); ?>" alt="<?php bloginfo( 'name' ); ?>" />
                        </a>
                        <div class="site-footer__contact">
                            <p>
                                <a href="mailto:hello@redeggmarketing.com">hello@redeggmarketing.com</a><br />
                                720.513.5035
                            </p>
                            <p>
                                4045 Pecos Street, Suite 180<br />
                                Denver, CO 80211
                            </p>
                        </div><!-- .site-footer__contact -->
                    </div><!-- .site-footer__col--info -->

                    <!-- Column 2: Newsletter Signup -->
                    <div class="site-footer__col site-footer__col--newsletter">
                        <p class="site-footer__newsletter-heading"><?php esc_html_e( 'Get Monthly Marketing Tips', 'red-egg' ); ?></p>
                        <div class="site-footer__newsletter-form">
                            <input type="email" placeholder="<?php esc_attr_e( 'Enter your email', 'red-egg' ); ?>" class="site-footer__newsletter-input" />
                            <button type="submit" class="site-footer__newsletter-submit"><?php esc_html_e( 'SUBMIT', 'red-egg' ); ?></button>
                        </div>
                        <div class="site-footer__social">
                            <a href="https://www.facebook.com/redeggmarketing" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <img src="<?php echo esc_url( get_template_directory_uri() . '/img/icon-facebook-white.svg' ); ?>" alt="" />
                            </a>
                            <a href="https://www.instagram.com/redeggmarketing" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <img src="<?php echo esc_url( get_template_directory_uri() . '/img/icon-instagram-white.svg' ); ?>" alt="" />
                            </a>
                            <a href="https://www.linkedin.com/company/red-egg-marketing" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <img src="<?php echo esc_url( get_template_directory_uri() . '/img/icon-linkedin-white.svg' ); ?>" alt="" />
                            </a>
                            <a href="https://www.tiktok.com/@redeggmarketing" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <img src="<?php echo esc_url( get_template_directory_uri() . '/img/icon-tiktok-white.svg' ); ?>" alt="" />
                            </a>
                        </div><!-- .site-footer__social -->
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
