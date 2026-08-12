/**
 * Egg Cluster – resting red egg
 *
 * Sets the persistent resting state: the top-right egg (egg--2 in the
 * 2-col desktop grid) holds red as the on-brand default. Hover behavior
 * is pure CSS — hovering any egg makes IT the red one and releases the
 * resting egg, so exactly one egg is red at any time (see
 * _style-block.scss).
 *
 * SPA-safe via onPageView; per-cluster guard against re-runs.
 */

import { onPageView } from '../../js/lifecycle';

( function () {

    function initEggResting() {
        var clusters = document.querySelectorAll( '.egg-cluster' );
        clusters.forEach( function ( cluster ) {
            if ( cluster.dataset.restingSet ) return;
            cluster.dataset.restingSet = '1';

            var eggs = cluster.querySelectorAll( '.egg-cluster__egg' );
            if ( ! eggs.length ) return;

            // Top-right in the 2-col grid = second egg; lone egg = itself.
            var idx = eggs.length >= 2 ? 1 : 0;
            eggs[ idx ].classList.add( 'is-resting-red' );
        } );
    }

    onPageView( initEggResting );

} )();
