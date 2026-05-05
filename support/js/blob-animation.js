/**
 * Blob Animation – Frontend
 *
 * GSAP MorphSVG morphing between blob shapes with:
 * - Rotational type interpolation (no pinching)
 * - Free-floating drift on x/y axis
 * - Subtle scale breathing
 * - Mouse repulsion (blob retreats from cursor)
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
            shape1: 'M655.12,194.37c-8.05-34.45-3.89-71.12-18.14-104.45C602.06,5.44,490.46-26.81,408.14,24.92c-16.26,10.16-30.11,23.27-40.98,38.14-36.36,49.71-40.81,115.58-78.18,165.94-28.81,40.83-75.58,68.53-126.33,82.56-33.6,10.1-69.03,18.11-98.04,36.68C26.81,371.79,3.51,411.94.44,453.11c-7.77,94.62,90.51,171.37,192.27,167.76,48.7-.31,95.75-16.54,135.61-41.21,50.18-30.32,100.06-71.64,163.6-72.75,45.26-1.17,86.14,19.99,127.18,35.02,49.46,19.53,106.62,22.97,156.8,3.88,89.24-30.68,134.06-129.92,92.39-207.55-17.34-32.71-49.67-58.37-87.18-71.03-26.29-9.92-58.37-7.03-83.58-16.75-24.22-9.47-36.94-33.09-42.34-55.79l-.08-.32Z',
            shape2: 'M254.8,47.3c32-24.4,73.3-39.9,113.8-34,96.7,16.8,116.2,130.2,241.5,156.8,22.8,5.4,46.4,6.8,69.8,5.6,38.6-1.8,79.9-7.6,115.7,10.4,47,23,50.4,77.1,42.8,123.2-11.6,73.8-41.4,144.7-86,204.8-23.2,31-51,59.8-85.8,77.7-41.8,22-96.7,25.2-136.3-3-34.3-23.9-53.7-63.8-77.3-97.4-16.1-23.2-35-45-57.9-61.6-64.2-48.9-140.8-26.8-214.4-27.3-38.2-.3-78.9-10.1-106.2-38.2-33.8-33.6-42.7-90.4-18.1-128.2,20.4-33.1,68.5-46.2,96-72.2,12-11.3,22.4-24.1,32.3-37.2,21.2-28.1,41.4-57.4,69.7-79l.3-.2h0Z',
            shape3: 'M623.38,76.95c-31.66-6.29-65.68-12.61-97.4-3.15-28.47,8.5-50.15,29.48-69.4,51.15-24.74,27.84-53.36,50.87-90.12,59.96-46.2,12.07-93.27,2.95-140.08-1.62-40.39-4.02-84.19.46-113.03,32.12-18.15,19.14-29.24,44.78-34.9,70.52-1.22,5.53-2.22,11.1-2.99,16.7-21.68,149.96,103.61,286.01,253.15,212.99,39.08-19.08,78.76-45.48,123.94-44.28,49.48,1.32,94.98,25.42,143.94,30.36,50.34,5.07,102.63-14.12,144.57-40.61,45.92-29.01,70.8-72.06,69.93-127.1-.4-25.42-5.46-50.64-13.39-74.74-27.29-82.85-86.45-164.4-173.92-182.29l-.29-.06h-.01Z',
        };

        var shapeKeys = [ 'shape1', 'shape2', 'shape3' ];

        // ---- Mouse tracking for repulsion ----
        var mouse = { x: -1000, y: -1000 };
        var repulseRadius = 300;
        var repulseStrength = 60;

        document.addEventListener( 'mousemove', function( e ) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        } );

        blobs.forEach( function( blob ) {
            var path = blob.querySelector( '.blob-decoration__path' );
            if ( ! path ) return;

            var startShape = blob.getAttribute( 'data-blob-shape' ) || 'shape1';
            var speed = parseFloat( blob.getAttribute( 'data-blob-speed' ) ) || 8;

            // ---- Morph timeline with rotational type ----
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
            } );

            sequence.forEach( function( shapeKey ) {
                morphTl.to( path, {
                    morphSVG: {
                        shape: shapes[ shapeKey ],
                        type: 'rotational',
                        origin: '50% 50%',
                    },
                } );
            } );

            // ---- Free-floating drift (staggered x, y, rotation, scale) ----
            // Each axis runs on its own timeline for organic, non-repetitive movement
            gsap.to( blob, {
                x: 'random(-80, 80)',
                duration: 'random(' + ( speed * 1.2 ) + ', ' + ( speed * 2 ) + ')',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
            } );

            gsap.to( blob, {
                y: 'random(-60, 60)',
                duration: 'random(' + ( speed * 1.4 ) + ', ' + ( speed * 2.2 ) + ')',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                repeatRefresh: true,
            } );

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

            // ---- Mouse repulsion (The Thing effect) ----
            var repulseX = { value: 0 };
            var repulseY = { value: 0 };

            gsap.ticker.add( function() {
                var rect = blob.getBoundingClientRect();
                var blobCenterX = rect.left + rect.width / 2;
                var blobCenterY = rect.top + rect.height / 2;

                var dx = blobCenterX - mouse.x;
                var dy = blobCenterY - mouse.y;
                var dist = Math.sqrt( dx * dx + dy * dy );

                var targetX = 0;
                var targetY = 0;

                if ( dist < repulseRadius && dist > 0 ) {
                    var force = ( 1 - dist / repulseRadius ) * repulseStrength;
                    targetX = ( dx / dist ) * force;
                    targetY = ( dy / dist ) * force;
                }

                // Smooth lerp toward target
                repulseX.value += ( targetX - repulseX.value ) * 0.08;
                repulseY.value += ( targetY - repulseY.value ) * 0.08;

                gsap.set( blob.querySelector( '.blob-decoration__svg' ), {
                    x: repulseX.value,
                    y: repulseY.value,
                } );
            } );
        } );
    }

    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', initBlobAnimations );
    } else {
        initBlobAnimations();
    }

} )();
