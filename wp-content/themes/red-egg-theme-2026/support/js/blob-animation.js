/**
 * Blob Animation – Frontend
 *
 * GSAP MorphSVG morphing between blob shapes with:
 * - Rotational type interpolation (no pinching)
 * - Subtle random x/y drift (max 50px)
 * - Subtle rotation and scale breathing
 * - Gentle cursor bias: the inner artwork leans a few px toward the
 *   pointer, layered on the ambient drift (see cursor-follow helpers below)
 *
 * Easter egg: typing the secret word (see SECRET_CODE below) briefly morphs
 * every on-screen blob into an eggshell smiley face, then rebuilds the
 * ambient animation. See triggerSmiley()/restoreBlobs() below.
 *
 *        _______
 *      /  ^   ^  \      <- type it and see
 *     |   .   .   |
 *     |    \_/    |
 *      \_________/
 */

import { onPageView } from './lifecycle';

( function() {

    // ---- Cursor bias state ------------------------------------------------
    // The pull is applied to each blob's inner .blob-decoration__svg, NOT the
    // outer .blob-decoration div. The div owns the ambient x/y drift, rotation
    // and scale, so keeping the cursor lean on a separate element means the two
    // motions never fight over the same transform matrix.
    var MAX_PULL = 175;                    // px — keep small; "only slightly noticeable"
    var pointer = { x: null, y: null };
    var followers = [];
    var pointerBound = false;
    var tickQueued = false;
    var prefersReduced = window.matchMedia && window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

    // ---- Shared shape data (module scope so the smiley restore can reach it) -
    var SHAPES = {
        shape1: 'M303.4,5.12C292.27,8.85 281.29,15.12 272.08,22.46C262.87,29.8 254.9,39.4 248.15,49.16C241.39,58.93 236.35,70.09 231.57,81.05C226.78,92.01 223.4,103.6 219.43,114.92C215.46,126.24 212.58,138.05 207.75,148.97C202.93,159.88 197.54,170.89 190.46,180.39C183.39,189.9 174.59,198.58 165.31,206C156.02,213.41 145.46,219.65 134.74,224.87C124.03,230.1 112.3,233.29 101.02,237.36C89.74,241.42 77.84,244.19 67.06,249.25C56.28,254.3 45.2,259.99 36.32,267.69C27.43,275.4 19.5,285.22 13.74,295.48C7.97,305.74 3.79,317.64 1.72,329.24C-0.36,340.83 -0.55,353.43 1.27,365.07C3.08,376.7 7.17,388.58 12.6,399.06C18.04,409.54 25.58,419.49 33.86,427.94C42.15,436.4 52.04,443.91 62.33,449.79C72.62,455.68 84.1,460.39 95.59,463.26C107.08,466.14 119.39,467.21 131.26,467.02C143.14,466.83 155.31,465.08 166.83,462.13C178.35,459.17 189.7,454.59 200.4,449.31C211.09,444.02 220.99,437.02 230.99,430.41C240.99,423.8 250.32,416.13 260.41,409.67C270.5,403.21 280.6,396.3 291.52,391.66C302.45,387.01 314.28,382.94 325.97,381.77C337.66,380.61 350.07,382.13 361.65,384.66C373.23,387.19 384.29,392.55 395.44,396.94C406.6,401.33 417.23,407.28 428.57,411C439.92,414.72 451.71,418.04 463.51,419.27C475.32,420.5 487.7,420.33 499.39,418.38C511.07,416.44 522.98,412.77 533.62,407.6C544.25,402.43 554.62,395.47 563.19,387.36C571.76,379.25 579.31,369.27 585.03,358.93C590.75,348.58 595.12,336.88 597.51,325.31C599.9,313.74 600.67,301.22 599.35,289.51C598.04,277.79 594.71,265.64 589.63,255.02C584.56,244.41 577.23,234.15 568.9,225.82C560.58,217.5 550.29,210.18 539.69,205.07C529.09,199.95 516.84,198.14 505.3,195.12C493.76,192.1 479.87,192.89 470.43,186.95C460.99,181.02 453.52,169.94 448.66,159.51C443.8,149.08 443.1,136.21 441.28,124.39C439.46,112.57 440.2,100.22 437.73,88.58C435.26,76.95 432.04,64.94 426.47,54.58C420.9,44.23 413.07,34.29 404.3,26.46C395.53,18.62 384.77,11.98 373.86,7.58C362.95,3.18 350.59,0.48 338.84,0.07C327.1,-0.34 314.53,1.39 303.4,5.12Z',
        shape2: 'M294.05,24.94C283.51,29.84 273.29,35.58 262.49,39.76C251.68,43.94 240.56,47.96 229.22,50.01C217.88,52.07 206.05,52.13 194.45,52.1C182.86,52.08 171.25,50.61 159.65,49.88C148.05,49.15 136.43,47.72 124.84,47.73C113.25,47.74 101.36,47.65 90.11,49.96C78.87,52.27 67.42,56.13 57.37,61.59C47.32,67.05 37.65,74.4 29.8,82.71C21.95,91.02 15.11,101.07 10.26,111.43C5.42,121.78 2.09,133.48 0.75,144.83C-0.59,156.18 -0.03,168.31 2.22,179.53C4.46,190.75 8.77,202.05 14.24,212.13C19.71,222.21 27.11,231.62 35.03,239.99C42.95,248.35 52.56,255.25 61.76,262.34C70.95,269.44 81,275.45 90.19,282.55C99.38,289.64 108.88,296.62 116.89,304.93C124.89,313.24 132.06,322.64 138.22,332.42C144.37,342.19 148.93,353.05 153.81,363.59C158.69,374.13 162.52,385.17 167.48,395.68C172.43,406.18 177.15,416.99 183.52,426.61C189.89,436.23 197.18,445.72 205.69,453.4C214.2,461.08 224.25,467.75 234.6,472.7C244.95,477.64 256.45,481.29 267.77,483.08C279.09,484.87 291.18,485.06 302.52,483.44C313.85,481.83 325.4,478.25 335.78,473.38C346.16,468.51 356.23,461.85 364.79,454.23C373.36,446.61 380.94,437.31 387.18,427.65C393.42,417.98 397.48,406.81 402.25,396.22C407.03,385.63 410.43,374.32 415.83,364.1C421.24,353.88 426.99,343.35 434.69,334.91C442.39,326.48 452.18,319.48 462.01,313.47C471.84,307.47 482.95,303.38 493.66,298.89C504.37,294.39 515.61,291.1 526.27,286.5C536.92,281.89 547.97,277.55 557.59,271.26C567.21,264.96 577.11,257.67 583.99,248.73C590.88,239.78 597.08,228.45 598.92,217.58C600.76,206.7 599.29,193.67 595.03,183.49C590.78,173.3 581.85,164.17 573.39,156.48C564.94,148.78 554.26,143.31 544.31,137.32C534.37,131.34 523.45,126.85 513.72,120.57C503.99,114.29 493.95,107.84 485.94,99.64C477.93,91.44 471.92,81.14 465.67,71.38C459.41,61.62 455.06,50.52 448.42,41.07C441.78,31.62 434.88,21.36 425.84,14.69C416.79,8.02 405.22,3.24 394.15,1.07C383.08,-1.11 370.82,0.11 359.41,1.65C348,3.2 336.58,6.44 325.69,10.32C314.8,14.2 304.58,20.03 294.05,24.94Z',
        shape3: 'M301.84,57C293.64,64.64 285.2,72.37 275.8,78.32C266.39,84.27 256.01,89.3 245.43,92.71C234.85,96.11 223.46,97.78 212.33,98.75C201.2,99.73 189.85,99.14 178.65,98.54C167.44,97.95 156.29,96.27 145.1,95.2C133.92,94.14 122.72,92.21 111.54,92.16C100.36,92.11 88.76,92.28 78.02,94.87C67.27,97.47 56.11,101.56 47.08,107.73C38.05,113.9 30.24,122.85 23.86,131.89C17.48,140.93 12.59,151.49 8.8,161.96C5.01,172.43 2.55,183.64 1.13,194.71C-0.29,205.78 -0.46,217.23 0.28,228.38C1.03,239.53 2.75,250.82 5.6,261.61C8.46,272.4 12.63,283.04 17.44,293.14C22.24,303.23 27.8,313.22 34.43,322.19C41.05,331.16 48.74,339.71 57.2,346.95C65.65,354.2 75.19,360.72 85.14,365.65C95.1,370.59 106.05,374.37 116.95,376.54C127.84,378.71 139.39,379.33 150.5,378.65C161.6,377.97 172.87,375.63 183.56,372.44C194.24,369.24 204.45,364.2 214.63,359.48C224.81,354.75 234.43,348.77 244.63,344.1C254.83,339.42 265.09,334.33 275.82,331.41C286.56,328.49 297.95,326.64 309.05,326.59C320.14,326.54 331.41,328.9 342.4,331.12C353.38,333.33 364.08,337.01 374.95,339.88C385.81,342.75 396.56,346.33 407.58,348.33C418.59,350.32 429.89,351.95 441.04,351.85C452.18,351.75 463.52,350.13 474.43,347.72C485.34,345.32 496.12,341.63 506.48,337.4C516.85,333.16 527.05,328.13 536.61,322.32C546.16,316.51 555.77,310.19 563.82,302.53C571.86,294.87 579.34,285.94 584.88,276.36C590.42,266.79 594.56,255.87 597.06,245.07C599.55,234.27 600.12,222.72 599.87,211.57C599.62,200.42 597.85,189.13 595.55,178.18C593.24,167.23 589.84,156.41 586.04,145.86C582.24,135.31 577.76,124.92 572.73,114.91C567.69,104.89 562.09,95.05 555.83,85.76C549.56,76.47 542.74,67.39 535.13,59.19C527.53,50.98 519.13,43.28 510.21,36.55C501.29,29.81 491.66,23.64 481.62,18.78C471.58,13.91 460.78,10.27 449.98,7.36C439.18,4.45 427.95,2.37 416.82,1.32C405.7,0.28 394.12,-0.65 383.22,1.09C372.33,2.83 361.16,6.54 351.45,11.78C341.75,17.01 333.24,24.95 324.97,32.48C316.7,40.02 310.04,49.36 301.84,57Z',
    };
    var shapeKeys = [ 'shape1', 'shape2', 'shape3' ];

    // Organic face + features, drawn in the same 0 0 600 484 viewBox as the
    // blobs so they share the undulating edge language (preserveAspectRatio
    // "none" stretches them to the container exactly like the blob shapes).
    var FACE_PATH = 'M538.77,250C539.89,260.11 538.14,270.74 536.07,280.77C534.01,290.79 529.97,300.55 526.38,310.15C522.79,319.75 519.26,329.36 514.55,338.37C509.83,347.38 504.63,356.42 498.1,364.23C491.56,372.05 483.1,378.66 475.35,385.28C467.6,391.9 458.97,397.11 451.61,403.94C444.26,410.77 438.16,418.4 431.21,426.27C424.26,434.14 418.16,444.18 409.92,451.16C401.68,458.14 392.01,464.87 381.76,468.14C371.5,471.41 359.41,471.17 348.38,470.76C337.34,470.35 326.17,467.03 315.56,465.66C304.94,464.29 294.97,463.29 284.67,462.54C274.36,461.79 264,462.36 253.73,461.15C243.46,459.94 233.05,458.08 223.07,455.26C213.1,452.44 203.61,448.12 193.87,444.22C184.13,440.32 174.34,436.41 164.64,431.85C154.94,427.29 144.21,423.17 135.68,416.84C127.15,410.52 118.95,402.76 113.47,393.9C107.99,385.05 105.5,373.79 102.8,363.72C100.1,353.65 100.01,343 97.27,333.5C94.53,324.01 90.81,315.7 86.37,306.76C81.94,297.82 74.86,289.35 70.67,279.89C66.48,270.43 62.36,260.11 61.23,250C60.11,239.89 61.86,229.26 63.93,219.23C65.99,209.21 70.03,199.45 73.62,189.85C77.21,180.25 80.74,170.64 85.45,161.63C90.17,152.62 95.37,143.58 101.9,135.77C108.44,127.95 116.9,121.34 124.65,114.72C132.4,108.1 141.03,102.89 148.39,96.06C155.74,89.23 161.84,81.6 168.79,73.73C175.74,65.86 181.84,55.82 190.08,48.84C198.32,41.86 207.99,35.13 218.24,31.86C228.5,28.59 240.59,28.83 251.62,29.24C262.66,29.65 273.83,32.97 284.44,34.34C295.06,35.71 305.03,36.71 315.33,37.46C325.64,38.21 336,37.64 346.27,38.85C356.54,40.06 366.95,41.92 376.93,44.74C386.9,47.56 396.39,51.88 406.13,55.78C415.87,59.68 425.66,63.59 435.36,68.15C445.06,72.71 455.79,76.83 464.32,83.16C472.85,89.48 481.05,97.24 486.53,106.1C492.01,114.95 494.5,126.21 497.2,136.28C499.9,146.35 499.99,157 502.73,166.5C505.47,175.99 509.19,184.3 513.63,193.24C518.06,202.18 525.14,210.65 529.33,220.11C533.52,229.57 537.64,239.89 538.77,250Z';
    var EYE_L_PATH = 'M245.25,196C245.31,198.76 243.77,201.7 242.79,204.32C241.81,206.95 240.9,209.64 239.37,211.76C237.85,213.88 235.42,215.23 233.65,217.04C231.87,218.84 230.35,220.36 228.72,222.57C227.09,224.79 226,228.81 223.87,230.33C221.74,231.85 218.53,231.96 215.95,231.69C213.37,231.41 210.8,229.55 208.38,228.69C205.96,227.84 203.62,227.57 201.43,226.55C199.25,225.53 197.47,223.82 195.28,222.58C193.08,221.33 190.47,220.62 188.24,219.09C186.01,217.55 182.87,215.85 181.87,213.35C180.86,210.84 181.97,206.95 182.2,204.06C182.43,201.16 183.18,198.67 183.25,196C183.31,193.33 182.38,190.69 182.59,188.05C182.79,185.41 183.7,182.84 184.47,180.16C185.25,177.47 185.74,174.2 187.24,171.94C188.75,169.69 191.06,167.48 193.5,166.61C195.95,165.75 199.39,167.15 201.88,166.75C204.38,166.34 206.15,165.11 208.48,164.18C210.81,163.26 213.36,161.39 215.85,161.19C218.34,160.99 220.98,162.07 223.42,162.97C225.86,163.88 228.62,164.78 230.5,166.61C232.37,168.45 233.6,171.47 234.65,173.99C235.69,176.52 235.47,179.45 236.77,181.74C238.06,184.04 240.99,185.41 242.4,187.78C243.81,190.16 245.18,193.24 245.25,196Z';
    var EYE_R_PATH = 'M419.91,196C419.31,198.8 418.19,201.39 417.25,203.91C416.3,206.42 415.46,208.86 414.25,211.11C413.05,213.36 411.29,214.98 410.01,217.39C408.74,219.8 408.29,223.39 406.61,225.56C404.92,227.74 402.42,229.98 399.92,230.46C397.41,230.95 394.17,228.91 391.59,228.47C389.02,228.03 386.87,228.06 384.48,227.83C382.09,227.59 379.63,227.66 377.26,227.07C374.88,226.47 372.62,225.36 370.21,224.26C367.81,223.16 364.51,222.5 362.82,220.47C361.12,218.44 360.41,214.94 360.05,212.09C359.68,209.25 361,206.08 360.64,203.4C360.29,200.71 358.51,198.63 357.91,196C357.31,193.37 356.81,190.38 357.05,187.63C357.29,184.88 358.26,182.07 359.35,179.51C360.45,176.95 361.6,173.95 363.61,172.3C365.61,170.65 369,170.5 371.39,169.6C373.77,168.7 375.81,168.32 377.93,166.88C380.05,165.44 381.79,162.06 384.12,160.97C386.46,159.87 389.43,159.9 391.95,160.32C394.47,160.74 397,162.16 399.24,163.48C401.49,164.81 403.77,166.32 405.43,168.3C407.1,170.28 407.64,173.34 409.23,175.38C410.81,177.41 413.01,178.53 414.94,180.49C416.88,182.45 420.01,184.54 420.84,187.12C421.67,189.71 420.51,193.2 419.91,196Z';
    var MOUTH_PATH = 'M193,345.61C195.23,349.36 201.92,352.39 206.38,354.97C210.83,357.54 215.29,359.17 219.75,361.05C224.21,362.93 228.67,364.2 233.13,366.23C237.58,368.25 242.04,370.68 246.5,373.2C250.96,375.72 255.42,379.02 259.88,381.34C264.33,383.66 268.79,385.98 273.25,387.14C277.71,388.3 282.17,388.43 286.63,388.3C291.08,388.18 295.54,386.98 300,386.39C304.46,385.8 308.92,385.1 313.38,384.77C317.83,384.45 322.29,384.77 326.75,384.44C331.21,384.11 335.67,384.04 340.13,382.8C344.58,381.57 349.04,379.54 353.5,377.02C357.96,374.51 362.42,370.8 366.88,367.69C371.33,364.58 375.79,361.06 380.25,358.35C384.71,355.64 389.17,353.56 393.63,351.43C398.08,349.31 404.77,348.77 407,345.61C409.23,342.45 409.23,334.16 407,332.48C404.77,330.8 398.08,334.8 393.63,335.54C389.17,336.27 384.71,336.18 380.25,336.89C375.79,337.61 371.33,338.42 366.88,339.81C362.42,341.2 357.96,343.46 353.5,345.23C349.04,347.01 344.58,349.28 340.13,350.46C335.67,351.64 331.21,352.23 326.75,352.31C322.29,352.38 317.83,351.39 313.38,350.93C308.92,350.46 304.46,349.62 300,349.52C295.54,349.42 291.08,349.94 286.63,350.33C282.17,350.72 277.71,351.79 273.25,351.85C268.79,351.91 264.33,351.7 259.88,350.71C255.42,349.71 250.96,347.65 246.5,345.88C242.04,344.1 237.58,341.63 233.13,340.06C228.67,338.48 224.21,337.29 219.75,336.44C215.29,335.59 210.83,335.6 206.38,334.94C201.92,334.28 195.23,330.7 193,332.48C190.77,334.26 190.77,341.86 193,345.61Z';

    // Eyes + grin are white; the face keeps the blob's native eggshell fill,
    // so there's no colour tween — it just changes shape.
    var C_WHITE = '#FFFFFF';   // eyes + grin

    // How long the morph into / out of the smiley takes (seconds). Bump for a
    // slower, more deliberate transition.
    var MORPH_DUR = 1.9;

    // ---- Registry of live blobs -------------------------------------------
    // Each entry: { el, path, startShape, speed, morphTl, tweens, smiley }
    // Populated on init, pruned lazily via document.contains() at use time.
    var registry = [];
    var smileActive = false;

    // ---- Cursor follow ----------------------------------------------------
    function registerCursorFollower( blob ) {
        if ( prefersReduced ) return;

        var svg = blob.querySelector( '.blob-decoration__svg' );
        if ( ! svg || svg.dataset.blobFollow ) return;
        svg.dataset.blobFollow = '1';

        followers.push( {
            el: svg,
            xTo: gsap.quickTo( svg, 'x', { duration: 15, ease: 'power2.out' } ),
            yTo: gsap.quickTo( svg, 'y', { duration: 10, ease: 'power2.out' } ),
            strength: gsap.utils.random( 1.2, 1.1 ),
        } );
    }

    function updateFollowers() {
        tickQueued = false;
        if ( pointer.x === null ) return;
        if ( smileActive ) return;              // hold still while smiling

        var halfW = window.innerWidth / 2;
        var halfH = window.innerHeight / 2;

        for ( var i = 0; i < followers.length; i++ ) {
            var f = followers[ i ];
            var rect = f.el.getBoundingClientRect();
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;

            var nx = Math.max( -1, Math.min( 1, ( pointer.x - cx ) / halfW ) );
            var ny = Math.max( -1, Math.min( 1, ( pointer.y - cy ) / halfH ) );

            f.xTo( nx * MAX_PULL * f.strength );
            f.yTo( ny * MAX_PULL * f.strength );
        }
    }

    function onPointerMove( e ) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        if ( ! tickQueued ) {
            tickQueued = true;
            requestAnimationFrame( updateFollowers );
        }
    }

    function bindPointerFollow() {
        followers = followers.filter( function( f ) { return document.contains( f.el ); } );
        if ( prefersReduced || pointerBound || followers.length === 0 ) return;
        pointerBound = true;
        window.addEventListener( 'mousemove', onPointerMove, { passive: true } );
    }

    // ---- Ambient animation ------------------------------------------------
    // Split into two parts so the smiley can kill/rebuild ONLY the path morph
    // (MorphSVG records its own from-state, so it must be rebuilt to avoid a
    // snap) while the drift/rotation/scale tweens are merely paused and resumed
    // in place. Pausing — rather than zeroing the transform — is what keeps the
    // CSS `translateY(-50%)` centering on center/double blobs from collapsing.
    function buildMorph( entry ) {
        var path = entry.path;
        var speed = entry.speed;

        var sequence = shapeKeys.filter( function( key ) {
            return key !== entry.startShape;
        } );
        sequence.push( entry.startShape );

        var morphTl = gsap.timeline( {
            repeat: -1,
            defaults: { duration: speed, ease: 'sine.inOut' },
            yoyo: true,
        } );

        sequence.forEach( function( shapeKey ) {
            morphTl.to( path, {
                morphSVG: {
                    shape: SHAPES[ shapeKey ],
                    type: 'rotational',
                    shapeIndex: 'auto',
                    precision: 5,
                    origin: '50% 50%',
                },
            } );
        } );

        entry.morphTl = morphTl;
    }

    function buildDrift( entry ) {
        var blob = entry.el;
        var speed = entry.speed;

        var driftX = gsap.to( blob, {
            x: 'random(-150, 150)',
            duration: 'random(' + ( speed * 2 ) + ', ' + ( speed * 3 ) + ')',
            ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true,
        } );

        var driftY = gsap.to( blob, {
            y: 'random(-200, 200)',
            duration: 'random(' + ( speed * 1.8 ) + ', ' + ( speed * 2.5 ) + ')',
            ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true,
        } );

        var rot = gsap.to( blob, {
            rotation: 'random(-8, 8)',
            duration: 'random(' + ( speed * 1.6 ) + ', ' + ( speed * 2.5 ) + ')',
            ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true,
        } );

        var scale = gsap.to( blob, {
            scale: 'random(0.95, 1.05)',
            duration: 'random(' + ( speed * 1.8 ) + ', ' + ( speed * 2.8 ) + ')',
            ease: 'sine.inOut', repeat: -1, yoyo: true, repeatRefresh: true,
        } );

        entry.tweens = [ driftX, driftY, rot, scale ];
    }

    function buildAmbient( entry ) {
        buildMorph( entry );
        buildDrift( entry );
    }

    function killDrift( entry ) {
        ( entry.tweens || [] ).forEach( function( t ) { t.kill(); } );
        entry.tweens = [];
    }

    function killMorph( entry ) {
        if ( entry.morphTl ) { entry.morphTl.kill(); entry.morphTl = null; }
    }

    // ---- Smiley easter egg ------------------------------------------------
    function svgEl( name, attrs ) {
        var el = document.createElementNS( 'http://www.w3.org/2000/svg', name );
        for ( var k in attrs ) {
            if ( Object.prototype.hasOwnProperty.call( attrs, k ) ) {
                el.setAttribute( k, attrs[ k ] );
            }
        }
        return el;
    }

    function buildSmileyFace() {
        var g = svgEl( 'g', { 'class': 'blob-smiley-face', 'opacity': '0' } );
        g.appendChild( svgEl( 'path', { d: EYE_L_PATH, fill: C_WHITE } ) );
        g.appendChild( svgEl( 'path', { d: EYE_R_PATH, fill: C_WHITE } ) );
        g.appendChild( svgEl( 'path', { d: MOUTH_PATH, fill: C_WHITE } ) );
        return g;
    }

    // How far (px) to raise the blob so the face clears up above the content
    // it's tucked behind. Measures the blob's direct siblings (the content in
    // the same positioned parent, ignoring other blobs) and lifts until the
    // blob's centre reaches the top edge of that content. Clamped so it never
    // leaves the top of the viewport. Returns 0 when nothing needs clearing.
    function computeLift( blob ) {
        var parent = blob.parentElement;
        if ( ! parent ) return 0;

        var blobRect = blob.getBoundingClientRect();
        var contentTop = null;

        var kids = parent.children;
        for ( var i = 0; i < kids.length; i++ ) {
            var k = kids[ i ];
            if ( k === blob ) continue;
            if ( k.classList && k.classList.contains( 'blob-decoration' ) ) continue; // ignore sibling blobs
            var r = k.getBoundingClientRect();
            if ( r.width === 0 && r.height === 0 ) continue;                            // ignore hidden
            if ( contentTop === null || r.top < contentTop ) contentTop = r.top;
        }

        // No detectable content sibling — fall back to ~60% of the blob height.
        if ( contentTop === null ) return blobRect.height * 0.6;

        var blobCentre = blobRect.top + blobRect.height / 2;
        var lift = blobCentre - contentTop;   // raise centre to the content's top edge
        if ( lift < 0 ) lift = 0;             // already above the content

        var maxUp = Math.max( 0, blobRect.top - 8 );  // keep it in the viewport
        if ( lift > maxUp ) lift = maxUp;

        return lift;
    }

    function triggerSmiley() {
        if ( smileActive ) return;

        var live = registry.filter( function( e ) { return document.contains( e.el ); } );
        if ( live.length === 0 ) return;

        smileActive = true;

        live.forEach( function( entry ) {
            // Kill the ambient drift/rotation/scale, leaving the blob frozen at
            // its current transform — do NOT zero it (that would wipe the CSS
            // translateY(-50%) centering on center/double blobs and drop them
            // downward). It's rebuilt fresh from the current transform on
            // restore, so no state carries across triggers. The face appears in
            // place, which also reads as more subtle.
            killDrift( entry );
            killMorph( entry );

            var blob = entry.el;
            var path = entry.path;
            var svg  = blob.querySelector( '.blob-decoration__svg' );
            if ( ! svg ) return;

            // Only the inner artwork's cursor lean gets reset — it carries no
            // layout transform, so zeroing it is safe.
            gsap.to( svg, { x: 0, y: 0, duration: 0.4 } );

            // Rise up out from behind the content so the face reveals above it.
            // Remember the current y so restore can ease it straight back.
            var currentY = gsap.getProperty( blob, 'y' ) || 0;
            entry.smileY = currentY;
            var lift = computeLift( blob );
            gsap.to( blob, { y: currentY - lift, duration: 1.4, ease: 'power2.inOut' } );

            // Morph the blob outline into a round face. Fill is left alone, so
            // the face stays the blob's native eggshell.
            gsap.to( path, {
                duration: MORPH_DUR, ease: 'back.out(1.2)',
                morphSVG: { shape: FACE_PATH, type: 'rotational', shapeIndex: 'auto', precision: 5, origin: '50% 50%' },
            } );

            // Pop the eyes + grin in once the face has mostly formed.
            var popIn = MORPH_DUR * 0.7;
            var face = buildSmileyFace();
            svg.appendChild( face );
            entry.smiley = face;
            gsap.to( face, { opacity: 1, duration: 0.4, delay: popIn } );
            gsap.fromTo( face,
                { transformOrigin: '50% 50%', scale: 0.6 },
                { scale: 1, duration: 0.7, delay: popIn, ease: 'back.out(2)' }
            );
        } );

        gsap.delayedCall( MORPH_DUR + 2.0, restoreBlobs );
    }

    function restoreBlobs() {
        var live = registry.filter( function( e ) { return document.contains( e.el ); } );

        live.forEach( function( entry ) {
            var path = entry.path;

            if ( entry.smiley ) {
                var face = entry.smiley;
                gsap.to( face, {
                    opacity: 0, duration: 0.3,
                    onComplete: function() { if ( face.parentNode ) { face.parentNode.removeChild( face ); } },
                } );
                entry.smiley = null;
            }

            // Ease back down to where it was before the lift.
            var backY = ( typeof entry.smileY === 'number' ) ? entry.smileY : ( gsap.getProperty( entry.el, 'y' ) || 0 );
            gsap.to( entry.el, { y: backY, duration: 1.4, ease: 'power2.inOut' } );

            gsap.to( path, {
                duration: MORPH_DUR, ease: 'sine.inOut',
                morphSVG: { shape: SHAPES[ entry.startShape ], type: 'rotational', shapeIndex: 'auto', precision: 5, origin: '50% 50%' },
                onComplete: function() {
                    if ( ! document.contains( entry.el ) ) { return; }
                    // Pin to the exact pre-lift y, then rebuild the morph loop
                    // and drift fresh from there so nothing snaps on repeat.
                    gsap.set( entry.el, { y: backY } );
                    buildMorph( entry );
                    buildDrift( entry );
                },
            } );
        } );

        smileActive = false;
    }

    // ---- Secret code listener (bound once, queries the registry live) -----
    // Type this word anywhere outside a text field to trigger the smiley.
    // It's just an array of keys — swap it for any word or sequence.
    var SECRET_CODE = [ 's', 'm', 'i', 'l', 'e' ];
    var codePos = 0;
    var codeBound = false;

    function keyMatches( key, expected ) {
        if ( key === expected ) return true;
        return expected.length === 1 && typeof key === 'string' && key.toLowerCase() === expected;
    }

    function bindSecretCode() {
        if ( codeBound ) return;
        codeBound = true;

        window.addEventListener( 'keydown', function( e ) {
            // Ignore while typing in a field.
            var t = e.target;
            if ( t && ( t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable ) ) {
                codePos = 0;
                return;
            }

            if ( keyMatches( e.key, SECRET_CODE[ codePos ] ) ) {
                codePos++;
                if ( codePos === SECRET_CODE.length ) {
                    codePos = 0;
                    triggerSmiley();
                }
            } else {
                // Reset — but if this key is a fresh first char, start at 1.
                codePos = keyMatches( e.key, SECRET_CODE[ 0 ] ) ? 1 : 0;
            }
        } );
    }

    // ---- Init -------------------------------------------------------------
    function initBlobAnimations() {
        if ( typeof gsap === 'undefined' || typeof MorphSVGPlugin === 'undefined' ) {
            return;
        }

        gsap.registerPlugin( MorphSVGPlugin );

        var blobs = document.querySelectorAll( '[data-blob-enabled="true"]' );
        if ( blobs.length === 0 ) {
            // Still bind the code — a later Swup page may have blobs, and the
            // handler no-ops gracefully when the registry is empty.
            bindSecretCode();
            return;
        }

        blobs.forEach( function( blob ) {
            if ( blob.dataset.blobInit ) return;
            blob.dataset.blobInit = '1';

            var path = blob.querySelector( '.blob-decoration__path' );
            if ( ! path ) return;

            var entry = {
                el: blob,
                path: path,
                startShape: blob.getAttribute( 'data-blob-shape' ) || 'shape1',
                speed: parseFloat( blob.getAttribute( 'data-blob-speed' ) ) || 8,
                morphTl: null,
                tweens: [],
                smiley: null,
            };

            registry.push( entry );
            buildAmbient( entry );
            registerCursorFollower( blob );
        } );

        bindPointerFollow();
        bindSecretCode();
    }

    onPageView( initBlobAnimations );

} )();
