/**
 * Blob Animation – Frontend
 *
 * GSAP MorphSVG morphing between blob shapes with:
 * - Rotational type interpolation (no pinching)
 * - Subtle random x/y drift (max 50px)
 * - Subtle rotation and scale breathing
 */

( function() {

    function initBlobAnimations() {
        if ( typeof gsap === 'undefined' || typeof MorphSVGPlugin === 'undefined' ) {
            return;
        }

        gsap.registerPlugin( MorphSVGPlugin );

        var blobs = document.querySelectorAll( '[data-blob-enabled="true"]' );

        if ( blobs.length === 0 ) return;

        var shapes = {
            shape1: 'M646.7,199.1c-7.8-33.2-3.8-68.6-17.5-100.7-33.7-81.5-141.3-112.6-220.7-62.7-71.5,42.5-69.3,134.1-114.9,196.8C223.9,343.3,30.1,293.1,15.4,448.6c-9.4,150.5,206.7,204.9,316.2,122,102.3-71.7,162-93.4,280.4-36.4,195.7,85.9,375.9-168.4,156.2-264.9-52.8-15.3-107.1-1.8-121.5-70.3Z',
            shape2: 'M623.4,77c-208.5-49.5-122.1,158.6-397,106.3-72.5-11.9-135.3,28.9-147.9,102.7-34.3,152.5,93.9,306.7,250.2,229.7,39.1-19.1,78.8-45.5,123.9-44.3,49.5,1.3,95,25.4,143.9,30.4,97.1,5.9,219.1-58.2,214.5-167.7-5.8-109.4-76.3-232.8-187.6-257.1h0Z',
            shape3: 'M623.4,76.9c-208.5-49.5-122.1,158.6-397,106.3-72.5-11.9-135.3,28.9-147.9,102.6-34.3,152.5,93.9,306.7,250.2,229.7,39.1-19.1,78.8-45.5,123.9-44.3,49.5,1.3,95,25.4,143.9,30.4,97.1,5.9,219.1-58.2,214.5-167.7-5.8-109.4-76.3-232.8-187.6-257.1h0Z',
        };

        var shapeKeys = [ 'shape1', 'shape2', 'shape3' ];

        blobs.forEach( function( blob ) {
            var path = blob.querySelector( '.blob-decoration__path' );
            if ( ! path ) return;

            var startShape = blob.getAttribute( 'data-blob-shape' ) || 'shape1';
            var speed = parseFloat( blob.getAttribute( 'data-blob-speed' ) ) || 8;

            // ---- Morph timeline ----
            var sequence = shapeKeys.filter( function( key ) {
                return key !== startShape;
            } );
            sequence.push( startShape );

            var morphTl = gsap.timeline( {
                repeat: -1,
                defaults: {
                    duration: speed,
                    ease: 'sine.inOut',
                },
                yoyo: true
            } );

            sequence.forEach( function( shapeKey ) {
                morphTl.to( path, {
                    morphSVG: {
                        shape: shapes[ shapeKey ],
                        type: 'rotational',
                        map: 'complexity',
                        precision: 5,
                        origin: '50% 50%',
                        smooth: {
                            points: 88,
                            redraw: false
                        }
                    },
                } );
            } );

            // ---- Subtle random drift: max 50px in any direction ----
            gsap.to( blob, {
                x: 'random(-50, 50)',
                duration: 'random(' + ( speed * 2 ) + ', ' + ( speed * 3 ) + ')',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
            } );

            gsap.to( blob, {
                y: 'random(-50, 50)',
                duration: 'random(' + ( speed * 1.8 ) + ', ' + ( speed * 2.5 ) + ')',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
            } );

            // ---- Rotation + scale breathing ----
            gsap.to( blob, {
                rotation: 'random(-8, 8)',
                duration: 'random(' + ( speed * 1.6 ) + ', ' + ( speed * 2.5 ) + ')',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
            } );

            gsap.to( blob, {
                scale: 'random(0.95, 1.05)',
                duration: 'random(' + ( speed * 1.8 ) + ', ' + ( speed * 2.8 ) + ')',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
            } );

        } );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', initBlobAnimations );
    } else {
        initBlobAnimations();
    }

} )();
