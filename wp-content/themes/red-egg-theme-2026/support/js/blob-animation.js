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
            shape1: 'M432.34,67.57c-23.71-63.55-101.52-87.66-155.32-48.89-53.8,38.77-55.52,115.64-80.89,153.53-19.56,30.71-51.29,51.55-85.75,62.11-22.81,7.6-46.86,13.63-66.55,27.59C18.2,279.63,2.39,309.84.29,340.81c-5.28,71.19,61.43,128.93,130.5,126.21,33.06-.23,64.98-12.45,92.04-31.01,34.06-22.81,67.92-53.89,111.04-54.73,30.72-.88,58.47,15.04,86.33,26.35,33.57,14.69,72.37,17.28,106.43,2.92,60.57-23.08,90.99-97.74,62.71-156.14-11.77-24.61-33.71-43.92-59.17-53.44-17.85-7.47-39.62-5.28-56.73-12.6-16.44-7.12-22.84-19.48-28.74-41.97-5.89-22.49-2.7-53.74-12.36-78.82Z',
            shape2: 'M314.53,14.84c-19.86,8.74-59.5,33.32-93.52,36.27-34.27,3.79-69.18-3.81-103.53-3.41C17.22,45.47-35.78,153.77,27.27,231.46c16.23,19.53,38.11,33.31,58.63,47.99,14.04,10.02,27.68,20.75,38.79,34.01,31.09,36.32,37.96,88.26,67.56,125.49,27.95,35.92,77.42,53.6,121.67,42.21,31.43-7.77,59.27-28.79,75.29-56.94,27.1-50.99,25.12-89.39,85.09-117.04,31.29-14.99,66.85-22.05,94.58-43.76,29.65-22.61,43.06-62.06,17.94-93.1-24.04-30.84-65.67-39.84-94.55-64.85-28.17-23.28-35.39-62.5-62.09-86.95C415.25,4.03,394.5-1.23,374.09.24c-20.39,1-39.7,5.87-59.56,14.6Z',
            shape3: 'M447.77,6.88c-32.34-6.63-53.29-10.22-79.02-2.55-23.1,6.89-40.68,23.89-56.31,41.46-20.07,22.57-43.29,41.23-73.12,48.61-37.48,9.78-75.68,2.39-113.66-1.31-32.77-3.26-68.31.37-91.7,26.04C19.23,134.64,2.65,165.33.47,202.35c-2.19,37.11,3.18,61.05,17.37,91.66,32.04,69.11,106.68,109.48,190.76,68.47,31.71-15.47,63.9-36.87,100.55-35.89,40.15,1.07,77.06,20.6,116.79,24.61,40.84,4.12,83.26-11.44,117.29-32.92,37.26-23.51,57.44-58.41,56.74-103.02-.32-20.61-4.43-41.05-10.87-60.58-10.47-31.75-26.72-63.27-48.45-89.21-24.22-28.92-58.94-51.62-92.89-58.59Z',
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
                x: 'random(-150, 150)',
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
