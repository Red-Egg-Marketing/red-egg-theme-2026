/**
 * SPA Navigation – Swup
 *
 * Intercepts internal links and swaps #content without a hard reload,
 * with a crossfade transition (see _spa-nav.scss). Emits lifecycle
 * events that block scripts subscribe to via js/lifecycle.js:
 *
 *   red-egg:page-leave  → before old content is replaced (teardown)
 *   red-egg:page-view   → after new content is in the DOM (re-init)
 *
 * Bailouts (hard reload instead of swap):
 *   - Pages containing a Gravity Form (GF inline scripts expect a
 *     full page load). Detected in the fetched HTML before swapping.
 *   - Pages containing GS Team plugin markup (its jQuery init never
 *     re-runs after a swap, no public re-init hook to call).
 *   - Logged-in views with the admin bar (keeps Edit links sane).
 *   - Any link with data-no-swup (Swup honors this natively).
 *
 * Swup + Body Class plugin load from jsDelivr as globals (see
 * functions.php). Body Class plugin keeps WP body_class() output in
 * sync so per-template CSS keeps working.
 */

( function () {
    // main.js runs under two script handles — only boot Swup once.
    if ( window.__reSwupInit ) return;
    window.__reSwupInit = true;

    if ( typeof Swup === 'undefined' ) return;

    // Logged-in with admin bar: hard reloads keep WP context correct.
    if ( document.getElementById( 'wpadminbar' ) ) return;

    var plugins = [];
    if ( typeof SwupBodyClassPlugin !== 'undefined' ) {
        plugins.push( new SwupBodyClassPlugin() );
    }

    var swup = new Swup( {
        containers: [ '#content' ],
        plugins: plugins,
    } );

    // ---- Loading indicator ------------------------------------------
    // A centered Red Egg mark that pulses its two egg paths in
    // sequence while a swap is in flight. Only shown if the swap runs
    // long (>300ms) so quick navigations don't flash it. Injected once
    // here so header/footer PHP stays untouched.
    var LOADER_DELAY = 300; // ms before the loader is allowed to show
    var loaderTimer = null;

    var loader = document.createElement( 'div' );
    loader.className = 'spa-loader';
    loader.setAttribute( 'aria-hidden', 'true' );
    loader.innerHTML =
        '<svg class="spa-loader__mark" width="56" height="50" viewBox="0 0 56 50" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Loading">' +
        '<path class="spa-loader__egg spa-loader__egg--red" d="M36.1314 0.895646C34.6015 0.895646 33.0572 1.26402 31.5411 1.93534C33.1525 3.3841 34.6825 5.11986 36.084 7.12063C36.0939 7.13492 36.1033 7.15032 36.1138 7.16406C36.1193 7.16406 36.1259 7.16351 36.1314 7.16351C38.7808 7.16351 42.1156 9.69046 44.8344 13.7569C47.8744 18.3044 49.6891 24.0967 49.6891 29.2523C49.6891 34.6602 47.9273 43.7321 36.1314 43.7321C24.3355 43.7321 22.5736 34.6602 22.5736 29.2523C22.5736 24.2369 24.2143 19.3573 26.4847 15.464C26.3073 15.1715 26.1321 14.8774 25.9431 14.5942C24.622 12.6171 23.2987 11.2937 22.1924 10.475C18.6444 15.7686 16.2617 22.6001 16.2617 29.2517C16.2617 42.0497 23.8755 49.9995 36.1314 49.9995C48.3873 49.9995 56 42.0492 56 29.2517C56 15.2062 45.9731 0.895096 36.1314 0.895096" fill="#DC2035"/>' +
        '<path class="spa-loader__egg spa-loader__egg--gray" d="M16.3217 42.5165C7.71187 40.8715 6.31196 33.1669 6.31196 28.3566C6.31196 16.9667 14.7692 6.26787 19.8692 6.26787C22.5186 6.26787 25.8539 8.79481 28.5732 12.8612C31.6121 17.4087 33.428 23.201 33.428 28.3566C33.428 31.5395 32.8148 35.9913 29.907 39.1165C31.4942 40.1105 33.5547 40.5987 36.1325 40.5987C36.3099 40.5987 36.4829 40.5932 36.6559 40.5883C38.6579 37.3092 39.7383 33.1779 39.7383 28.3566C39.7378 14.3111 29.7098 0 19.8686 0C10.0274 0 0 14.5761 0 28.3566C0 41.1552 7.61325 49.1055 19.8686 49.1055C20.6454 49.1055 21.4029 49.0725 22.1417 49.0092C19.7634 47.3109 17.8021 45.1243 16.3217 42.5165Z" fill="#424042"/>' +
        '</svg>';
    document.body.appendChild( loader );

    function showLoaderSoon() {
        window.clearTimeout( loaderTimer );
        loaderTimer = window.setTimeout( function () {
            loader.classList.add( 'is-visible' );
        }, LOADER_DELAY );
    }

    function hideLoader() {
        window.clearTimeout( loaderTimer );
        loader.classList.remove( 'is-visible' );
    }

    // visit:start fires when a navigation begins; page:view when the
    // new content is in. If the gap exceeds LOADER_DELAY the loader
    // shows; otherwise the timer is cleared before it ever appears.
    swup.hooks.on( 'visit:start', showLoaderSoon );
    swup.hooks.on( 'page:view', hideLoader );
    // Safety: also clear on any navigation error/abort so it can't
    // get stuck on screen.
    swup.hooks.on( 'visit:abort', hideLoader );

    // ---- Gravity Forms support --------------------------------------
    // GF renders its init as inline <script> tags right after the form
    // markup. Scripts inserted via innerHTML (how Swup swaps content)
    // never execute, so re-create them after each swap. GF core JS
    // (window.gform) is loaded on the first page view — the contact
    // section is on virtually every template — so only the inline
    // per-form init needs re-running. If GF core somehow isn't loaded
    // yet, fall back to a hard reload.
    swup.hooks.on( 'page:load', function ( visit, args ) {
        var html = args && args.page ? args.page.html : '';
        var hasForm = /gform_wrapper|gform_fields/.test( html );
        if ( hasForm && typeof window.gform === 'undefined' ) {
            swup.destroy();
            window.location.href = visit.to.url;
        }
    } );

    // ---- GS Team Members plugin bailout ------------------------------
    // GS Team (the "GS Team" admin menu / [gs_team] shortcode) is an
    // older jQuery plugin: it binds Magnific Popup + equal-height card
    // logic once via jQuery(document).ready() on the original page
    // load and doesn't expose a public re-init hook. After an SPA swap
    // that ready handler never fires again, so newly-injected member
    // cards lose their popups/click handlers with no clean way to
    // rewire them from the theme side. Hard-reload pages that contain
    // its markup rather than risk silently-broken popups.
    swup.hooks.on( 'page:load', function ( visit, args ) {
        var html = args && args.page ? args.page.html : '';
        var hasGsTeam = /gs_team_popup|gs_member_info|single-member-div/.test( html );
        if ( hasGsTeam ) {
            swup.destroy();
            window.location.href = visit.to.url;
        }
    } );

    swup.hooks.on( 'content:replace', function ( visit ) {
        // Explicit scroll reset: don't rely solely on Swup's built-in
        // scroll-to-top, since our own hooks.before('content:replace')
        // teardown runs in the same phase and could interfere with it.
        // This is the fallback Swup's own maintainers recommend when
        // the built-in behavior isn't landing reliably in a custom
        // integration. Skip it when the destination has a hash target
        // (e.g. a cross-page link to /services/#pricing) so Swup/our
        // own anchor-scroll handling can land on that section instead.
        var hasHashTarget = !! ( visit && visit.to && visit.to.hash );
        if ( ! hasHashTarget ) {
            window.scrollTo( 0, 0 );
        }

        var container = document.getElementById( 'content' );
        if ( ! container ) return;

        // Re-create every script tag inside the new content so the
        // browser executes it (GF inline init, conditional logic, etc).
        container.querySelectorAll( 'script' ).forEach( function ( old ) {
            if ( old.type && old.type !== 'text/javascript' && old.type !== 'module' ) {
                return; // skip JSON-LD / template scripts
            }
            var fresh = document.createElement( 'script' );
            Array.prototype.forEach.call( old.attributes, function ( attr ) {
                fresh.setAttribute( attr.name, attr.value );
            } );
            fresh.textContent = old.textContent;
            old.parentNode.replaceChild( fresh, old );
        } );
    } );

    // ---- Teardown before content swap ------------------------------
    swup.hooks.before( 'content:replace', function () {
        document.dispatchEvent( new CustomEvent( 'red-egg:page-leave' ) );

        var container = document.getElementById( 'content' );

        // Kill all ScrollTriggers — they cache measurements and pin
        // spacers against DOM that's about to disappear.
        if ( typeof ScrollTrigger !== 'undefined' ) {
            ScrollTrigger.getAll().forEach( function ( t ) {
                t.kill();
            } );
        }

        // Kill infinite GSAP tweens (blobs, marquees, rotate-words)
        // targeting elements inside the outgoing content.
        if ( typeof gsap !== 'undefined' && container ) {
            gsap.globalTimeline
                .getChildren( true, true, true )
                .forEach( function ( tween ) {
                    var targets =
                        typeof tween.targets === 'function'
                            ? tween.targets()
                            : [];
                    var inContainer = targets.some( function ( t ) {
                        return (
                            t instanceof Element && container.contains( t )
                        );
                    } );
                    if ( inContainer ) {
                        tween.kill();
                    }
                } );
        }

        // Close the mobile nav overlay if it's open (it lives outside
        // the swap container, so it would otherwise stay open).
        var menu = document.getElementById( 'mobile-menu' );
        if ( menu && menu.classList.contains( 'is-open' ) ) {
            menu.classList.remove( 'is-open' );
            menu.setAttribute( 'aria-hidden', 'true' );
            document.body.classList.remove( 'mobile-nav-open' );
            var toggle = document.querySelector( '.mobile-menu-toggle' );
            if ( toggle ) toggle.setAttribute( 'aria-expanded', 'false' );
        }
    } );

    // ---- Re-init after content swap ---------------------------------
    // ScrollTriggers on swapped-in content are created before images
    // load and sliders settle, so their trigger points can be measured
    // against a layout that shifts afterward. Refresh once the new
    // frame paints, then again (debounced) as images finish loading.
    var refreshTimer = null;
    function queueScrollTriggerRefresh() {
        window.clearTimeout( refreshTimer );
        refreshTimer = window.setTimeout( function () {
            if ( typeof ScrollTrigger !== 'undefined' ) {
                ScrollTrigger.refresh();
            }
        }, 150 );
    }

    swup.hooks.on( 'page:view', function () {
        document.dispatchEvent( new CustomEvent( 'red-egg:page-view' ) );

        window.requestAnimationFrame( queueScrollTriggerRefresh );

        var container = document.getElementById( 'content' );
        if ( container ) {
            container.querySelectorAll( 'img' ).forEach( function ( img ) {
                if ( ! img.complete ) {
                    img.addEventListener( 'load', queueScrollTriggerRefresh, { once: true } );
                }
            } );
        }

        // Manual pageview for analytics (gtag / GTM), if present.
        if ( typeof gtag === 'function' ) {
            gtag( 'event', 'page_view', {
                page_location: window.location.href,
                page_title: document.title,
            } );
        } else if ( window.dataLayer && window.dataLayer.push ) {
            window.dataLayer.push( {
                event: 'virtual_pageview',
                page_location: window.location.href,
                page_title: document.title,
            } );
        }
    } );
} )();
