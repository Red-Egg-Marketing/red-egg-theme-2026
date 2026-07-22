/**
 * Page Lifecycle – SPA-aware init registry
 *
 * With Swup swapping #content without a hard reload, frontend scripts
 * can no longer rely on DOMContentLoaded alone. Register inits here:
 *
 *   import { onPageView } from '../../js/lifecycle';
 *   onPageView( initMyBlock );
 *
 * onPageView runs the callback:
 *   1. Once on initial load (DOMContentLoaded, or immediately if the
 *      DOM is already parsed), and
 *   2. Again after every Swup content swap (red-egg:page-view event,
 *      dispatched by js/spa-nav.js).
 *
 * IMPORTANT: callbacks must be idempotent. main.js is enqueued under
 * two handles AND re-runs on every swap, so every init should guard
 * per-element (e.g. el.dataset.myBlockBound) before binding.
 *
 * onPageLeave runs just before the old content is replaced — use it
 * for teardown that can't be handled by per-element guards.
 */

export function onPageView( fn ) {
    if ( document.readyState === 'loading' ) {
        document.addEventListener( 'DOMContentLoaded', fn, { once: true } );
    } else {
        fn();
    }
    document.addEventListener( 'red-egg:page-view', fn );
}

export function onPageLeave( fn ) {
    document.addEventListener( 'red-egg:page-leave', fn );
}
