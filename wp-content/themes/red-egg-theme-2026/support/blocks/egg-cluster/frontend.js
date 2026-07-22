/**
 * Egg Cluster – intro "attract" sequence
 *
 * On load, plays a choreographed note sequence (one egg lit red at a
 * time, previous goes white) to telegraph that the eggs are
 * interactive, then holds top-right red as the resting state -- on
 * brand for Red Egg. Plays once per cluster per page view.
 *
 * The lit state is driven by toggling .is-popping on an egg, which
 * the CSS treats exactly like :hover (red layer fades in). Hover
 * still works during and after the sequence -- they're independent.
 *
 * Timing is written as musical note durations at 90 BPM:
 *   quarter = 667ms, 1/8 = 333ms, 1/2 = 1334ms, 1/16 = 167ms.
 *
 * SPA-safe via onPageView; per-cluster guard so it doesn't replay on
 * re-runs. Skipped under prefers-reduced-motion (still lands on the
 * resting red egg, just without the animation).
 */

import { onPageView } from '../../js/lifecycle';

( function () {

    // 90 BPM tempo -> note durations in ms (quarter = 60000/90)
    var QUARTER = 667;
    var EIGHTH = QUARTER / 2;   // ~333
    var HALF = QUARTER * 2;     // ~1334
    var SIXTEENTH = QUARTER / 4; // ~167

    // Grid index map (matches _style-block.scss egg--1..4)
    var TL = 0; // top-left    (egg--1)
    var TR = 1; // top-right   (egg--2)
    var BL = 2; // bottom-left (egg--3)
    var BR = 3; // bottom-right(egg--4)

    function rand( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    // Build the score: array of { egg: index, dur: ms }. Each note
    // lights that egg for its duration; the next note lights the next
    // egg (and the previous goes white) since only one is ever lit.
    function buildScore() {
        var score = [];

        // Phrase 1: four top-right eighth-note taps, then a half-note
        // walk around the corners ending back on top-right.
        score.push( { egg: TR, dur: EIGHTH } );
        score.push( { egg: TR, dur: EIGHTH } );
        score.push( { egg: TR, dur: EIGHTH } );
        score.push( { egg: TR, dur: EIGHTH } );
        score.push( { egg: TL, dur: HALF } );
        score.push( { egg: BL, dur: HALF } );
        score.push( { egg: BR, dur: HALF } );
        score.push( { egg: TR, dur: HALF } );

        // Phrase 2: fast sixteenth-note loop around the four corners,
        // repeated 4 times, ending on top-right.
        for ( var rep = 0; rep < 4; rep++ ) {
            score.push( { egg: TL, dur: SIXTEENTH } );
            score.push( { egg: BL, dur: SIXTEENTH } );
            score.push( { egg: BR, dur: SIXTEENTH } );
            score.push( { egg: TR, dur: SIXTEENTH } );
        }

        return score;
    }

    function playScore( cluster ) {
        var eggs = Array.prototype.slice.call(
            cluster.querySelectorAll( '.egg-cluster__egg' )
        );
        // Choreography assumes a 4-egg grid; if a different count is
        // configured, fall straight to the resting state instead.
        if ( eggs.length < 4 ) {
            if ( eggs.length ) {
                eggs[ eggs.length - 1 ].classList.add( 'is-resting-red' );
            }
            return;
        }

        var score = buildScore();
        var t = 200; // small initial beat before the first note

        // Fade duration of the .is-popping state (must match the CSS
        // transition on .is-popping .egg-cluster__layer--red). The
        // off-gap between notes has to exceed this, or a repeated
        // same-egg note re-lights before the previous has visibly
        // faded and the two blur into one continuous hold.
        var FADE = 80;

        score.forEach( function ( note ) {
            var egg = eggs[ note.egg ];
            var start = t;
            // Off-gap sized to clear the fade (so consecutive same-egg
            // notes like the 4 top-right taps read as distinct hits),
            // but never more than ~40% of the note so short notes still
            // spend most of their time lit.
            var gap = Math.min( FADE + 40, note.dur * 0.4 );
            var litFor = Math.max( note.dur - gap, 40 );
            window.setTimeout( function () {
                egg.classList.add( 'is-popping' );
            }, start );
            window.setTimeout( function () {
                egg.classList.remove( 'is-popping' );
            }, start + litFor );
            t += note.dur;
        } );

        // Stop at top-right, held red as the resting brand state.
        // Applied as the transient class clears so there's no flash gap.
        window.setTimeout( function () {
            eggs[ TR ].classList.add( 'is-resting-red' );
        }, t );
    }

    function initEggIntro() {
        var reduceMotion = window.matchMedia &&
            window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

        var clusters = document.querySelectorAll( '.egg-cluster' );
        clusters.forEach( function ( cluster ) {
            if ( cluster.dataset.introPlayed ) return;
            cluster.dataset.introPlayed = '1';

            var eggs = cluster.querySelectorAll( '.egg-cluster__egg' );

            if ( reduceMotion ) {
                // No animation, but still land on the resting state:
                // top-right red (or last egg if fewer than 4).
                if ( eggs.length ) {
                    var idx = eggs.length >= 4 ? TR : eggs.length - 1;
                    eggs[ idx ].classList.add( 'is-resting-red' );
                }
                return;
            }

            playScore( cluster );
        } );
    }

    onPageView( initEggIntro );

} )();
