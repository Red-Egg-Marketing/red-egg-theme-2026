/**
 * Egg Cluster – intro "attract" sequence
 *
 * On load, plays a short playful sequence of eggs popping red at
 * random (overlapping) to telegraph that they're interactive, then
 * settles back to all-white ready for real hover. Plays once per
 * cluster per page view.
 *
 * The pop is driven by toggling .is-popping on an egg, which the CSS
 * treats exactly like :hover (red layer fades in). Hover still works
 * during and after the sequence -- they're independent.
 *
 * SPA-safe via onPageView; per-element guard so it doesn't replay on
 * re-runs. Skipped entirely under prefers-reduced-motion.
 */

import { onPageView } from '../../js/lifecycle';

( function () {

    var POP_HOLD = 550;   // ms an egg stays red
    var POP_GAP_MIN = 120; // ms between successive pops
    var POP_GAP_MAX = 380;

    function rand( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    // Fisher-Yates shuffle so each egg pops once in random order,
    // then we sprinkle a few random repeats for a livelier feel.
    function shuffle( arr ) {
        var a = arr.slice();
        for ( var i = a.length - 1; i > 0; i-- ) {
            var j = Math.floor( Math.random() * ( i + 1 ) );
            var t = a[ i ]; a[ i ] = a[ j ]; a[ j ] = t;
        }
        return a;
    }

    function playSequence( cluster ) {
        var eggs = Array.prototype.slice.call(
            cluster.querySelectorAll( '.egg-cluster__egg' )
        );
        if ( ! eggs.length ) return;

        // Build a pop order: every egg once (shuffled), plus 2-3 random
        // extra pops interleaved for the playful overlapping feel.
        var order = shuffle( eggs );
        var extras = rand( 2, 3 );
        for ( var e = 0; e < extras; e++ ) {
            order.splice( rand( 1, order.length ), 0, eggs[ rand( 0, eggs.length - 1 ) ] );
        }

        var t = 200; // small initial beat before the first pop
        order.forEach( function ( egg ) {
            var start = t;
            window.setTimeout( function () {
                egg.classList.add( 'is-popping' );
            }, start );
            window.setTimeout( function () {
                egg.classList.remove( 'is-popping' );
            }, start + POP_HOLD );
            t += rand( POP_GAP_MIN, POP_GAP_MAX );
        } );

        // Resting state: after the sequence, one random egg stays red
        // (the brand is Red Egg). This is a separate persistent class,
        // not a transient pop, so hover on the other eggs still works
        // independently and this egg stays red as its base state.
        var restingEgg = eggs[ rand( 0, eggs.length - 1 ) ];
        window.setTimeout( function () {
            restingEgg.classList.add( 'is-resting-red' );
        }, t + POP_HOLD );
    }

    function initEggIntro() {
        var reduceMotion = window.matchMedia &&
            window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

        var clusters = document.querySelectorAll( '.egg-cluster' );
        clusters.forEach( function ( cluster ) {
            if ( cluster.dataset.introPlayed ) return;
            cluster.dataset.introPlayed = '1';

            if ( reduceMotion ) {
                // No attract animation, but still land on the brand's
                // resting state: one random egg red, applied instantly.
                var eggs = cluster.querySelectorAll( '.egg-cluster__egg' );
                if ( eggs.length ) {
                    eggs[ rand( 0, eggs.length - 1 ) ].classList.add( 'is-resting-red' );
                }
                return;
            }

            playSequence( cluster );
        } );
    }

    onPageView( initEggIntro );

} )();
