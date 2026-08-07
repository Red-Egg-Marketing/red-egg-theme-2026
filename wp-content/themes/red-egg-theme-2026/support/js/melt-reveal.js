/**
 * Melt Reveal
 *
 * Opt-in "drip / melt" reveal for content images — the same effect the
 * case studies slider uses, generalised so any tagged image melts into
 * view on scroll, independently.
 *
 * Blocks opt in via the "Melt reveal on scroll" toggle (see
 * block-extensions/melt.js for core Image/Gallery, plus the toggle on
 * image-text, media-content-media, and the filterable Posts/Case
 * Studies grids), which puts a `has-melt` class on the image's wrapper.
 *
 * How it works:
 *   - The slider's fixed 765x431 drip clip is re-expressed here in
 *     normalised objectBoundingBox (0-1) coordinates, so one shape
 *     scales to any image at any aspect ratio and stays correct through
 *     responsive resizes.
 *   - Each tagged image gets its OWN cloned <clipPath> (unique id) so it
 *     animates on its own ScrollTrigger and reveals when it enters the
 *     viewport, rather than all sharing one timeline.
 *   - The path starts on the drippy shape and tweens to a FLAT-bottom
 *     shape, so the image fills completely once revealed (GSAP
 *     attr-tweens the `d` string; both paths share identical structure).
 *
 * Excludes hero images (per design) and the slider's own images (it
 * runs its own morph). SPA-safe: rebuilt on each page view, torn down on
 * leave, and it re-scans (incrementally, without re-melting what's
 * already revealed) when a client-rendered grid signals
 * `red-egg:content-updated` — e.g. the filterable grids after a
 * fetch / filter / sort / load-more.
 */

( function () {
    if ( window.__reMeltBound ) return;
    window.__reMeltBound = true;

    var SVGNS = 'http://www.w3.org/2000/svg';

    // Drip clip in normalised objectBoundingBox units (0-1), derived
    // from the slider's 765x431 paths. Structure is identical between
    // the two so GSAP can tween the `d` string directly.
    //
    // MID  = drippy start shape.
    // FULL = flat bottom (y=1 all the way across) so the reveal fills
    //        the image completely — no scalloping or lifted corners.
    var MID  = 'M0 0H1V0.30394C1 0.3206 0.98642 0.39443 0.96969 0.39443C0.92852 0.39443 0.85383 0.2413 0.79996 0.2413C0.72186 0.2413 0.67807 0.48492 0.59997 0.48492C0.52187 0.48492 0.47807 0.18097 0.39998 0.18097C0.32188 0.18097 0.27808 0.42459 0.19999 0.42459C0.14612 0.42459 0.07142 0.27378 0.03025 0.27378C0.01353 0.27378 0 0.3206 0 0.30394V0Z';
    var FULL = 'M0 0H1V1C1 1 0.98642 1 0.96969 1C0.92852 1 0.85383 1 0.79996 1C0.72186 1 0.67807 1 0.59997 1C0.52187 1 0.47807 1 0.39998 1C0.32188 1 0.27808 1 0.19999 1C0.14612 1 0.07142 1 0.03025 1C0.01353 1 0 1 0 1V0Z';

    // Images living inside these never melt.
    var EXCLUDE = '.hero, .hero-background, .hero-case-study, .hero-media, .cs-slide__image';

    var MIN_SIZE = 80; // px — guards against a tagged icon/logo

    var counter = 0;
    var timelines = [];
    var defs = null;

    function ensureDefs() {
        var svg = document.getElementById( 're-melt-defs' );
        if ( ! svg ) {
            svg = document.createElementNS( SVGNS, 'svg' );
            svg.setAttribute( 'id', 're-melt-defs' );
            svg.setAttribute( 'aria-hidden', 'true' );
            svg.setAttribute( 'width', '0' );
            svg.setAttribute( 'height', '0' );
            svg.style.position = 'absolute';
            svg.style.width = '0';
            svg.style.height = '0';
            svg.style.overflow = 'hidden';
            defs = document.createElementNS( SVGNS, 'defs' );
            svg.appendChild( defs );
            document.body.appendChild( svg );
        } else {
            defs = svg.querySelector( 'defs' );
        }
        return defs;
    }

    function teardown() {
        timelines.forEach( function ( tl ) {
            try {
                if ( tl.scrollTrigger ) tl.scrollTrigger.kill();
                tl.kill();
            } catch ( e ) {}
        } );
        timelines = [];
        if ( defs ) defs.innerHTML = '';
        Array.prototype.slice
            .call( document.querySelectorAll( 'img[data-melt]' ) )
            .forEach( function ( img ) {
                img.style.clipPath = '';
                img.style.webkitClipPath = '';
                delete img.dataset.melt;
            } );
    }

    function attach( img ) {
        var rect = img.getBoundingClientRect();
        if ( rect.width < MIN_SIZE || rect.height < MIN_SIZE ) return;

        var id = 're-melt-clip-' + ( ++counter );
        var cp = document.createElementNS( SVGNS, 'clipPath' );
        cp.setAttribute( 'id', id );
        cp.setAttribute( 'clipPathUnits', 'objectBoundingBox' );
        var path = document.createElementNS( SVGNS, 'path' );
        path.setAttribute( 'd', MID );
        cp.appendChild( path );
        defs.appendChild( cp );

        img.style.clipPath = 'url(#' + id + ')';
        img.style.webkitClipPath = 'url(#' + id + ')';
        img.dataset.melt = '1';

        var tl = gsap.timeline( {
            scrollTrigger: {
                trigger: img,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        } );
        tl.to( path, { attr: { d: FULL }, duration: 4.5, ease: 'power2.out' } );
        timelines.push( tl );
    }

    // Process any not-yet-handled tagged images. Safe to call repeatedly
    // (the data-melt flag makes it idempotent) so client-rendered grids
    // can re-trigger it without re-melting what's already revealed.
    function scan() {
        if ( typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' ) {
            return;
        }
        gsap.registerPlugin( ScrollTrigger );
        ensureDefs();

        Array.prototype.slice
            .call( document.querySelectorAll( '.has-melt img' ) )
            .forEach( function ( img ) {
                if ( img.closest( EXCLUDE ) ) return;
                if ( img.dataset.melt ) return;

                if ( img.complete && img.naturalWidth ) {
                    attach( img );
                } else {
                    img.addEventListener(
                        'load',
                        function () {
                            attach( img );
                            ScrollTrigger.refresh();
                        },
                        { once: true }
                    );
                }
            } );

        ScrollTrigger.refresh();
    }

    function init() {
        teardown();
        scan();
    }

    // Debounced scan, shared by the content-updated event and the
    // MutationObserver below.
    var scanTimer = null;
    function scheduleScan() {
        window.clearTimeout( scanTimer );
        scanTimer = window.setTimeout( scan, 120 );
    }

    // Client-rendered grids (filterable Posts / Case Studies) insert
    // their cards asynchronously after a fetch. Rather than depend only
    // on a dispatched event firing at the right moment, watch the DOM
    // for inserted images and re-scan (idempotently). `has-melt` sits on
    // the grid (an ancestor of the cards), so scan() does the ancestor
    // check — here we only need to notice that images arrived.
    var mo = null;
    function startObserver() {
        if ( mo || typeof MutationObserver === 'undefined' ) return;
        mo = new MutationObserver( function ( mutations ) {
            for ( var i = 0; i < mutations.length; i++ ) {
                var added = mutations[ i ].addedNodes;
                for ( var j = 0; j < added.length; j++ ) {
                    var n = added[ j ];
                    if ( ! n || n.nodeType !== 1 ) continue;
                    if (
                        ( n.matches && n.matches( 'img' ) ) ||
                        ( n.querySelector && n.querySelector( 'img' ) )
                    ) {
                        scheduleScan();
                        return;
                    }
                }
            }
        } );
        mo.observe( document.body, { childList: true, subtree: true } );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', init );
    } else {
        init();
    }

    startObserver();

    document.addEventListener( 'red-egg:page-view', init );
    document.addEventListener( 'red-egg:page-leave', teardown );
    // Client-rendered grids also fire this after they render/update.
    document.addEventListener( 'red-egg:content-updated', scheduleScan );
} )();
