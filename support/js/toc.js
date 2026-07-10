/**
 * Table of Contents – Frontend
 *
 * 1. Per-item carets expand/collapse their children. Every level
 *    below the top (H2) starts collapsed.
 * 2. On mobile the whole TOC list is collapsed behind the heading
 *    toggle; on desktop it is always shown (CSS).
 * Compiled into main.js via front-end.js.
 */

function initToc() {
    const blocks = document.querySelectorAll( '.post-toc' );

    blocks.forEach( ( toc ) => {

        // Whole-box toggle (mobile).
        // NOTE: main.js is enqueued under two handles, so the bundle can
        // run twice. Guard against binding the same control twice (which
        // would toggle open + closed on a single click = no-op).
        const toggle = toc.querySelector( '.post-toc__toggle' );
        if ( toggle && ! toggle.dataset.tocBound ) {
            toggle.dataset.tocBound = 'true';
            toggle.addEventListener( 'click', () => {
                const isOpen = toc.classList.toggle( 'is-open' );
                toggle.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
            } );
        }

        // Per-item expand/collapse carets.
        toc.querySelectorAll( '.post-toc__caret[aria-expanded]' ).forEach( ( caret ) => {
            if ( caret.dataset.tocBound ) {
                return;
            }
            caret.dataset.tocBound = 'true';

            caret.addEventListener( 'click', () => {
                const item = caret.closest( '.post-toc__item' );
                if ( ! item ) {
                    return;
                }
                const isOpen = item.classList.toggle( 'is-open' );
                caret.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
            } );
        } );
    } );
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', initToc );
} else {
    initToc();
}
