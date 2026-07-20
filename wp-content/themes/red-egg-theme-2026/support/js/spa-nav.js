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

    swup.hooks.on( 'content:replace', function () {
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
