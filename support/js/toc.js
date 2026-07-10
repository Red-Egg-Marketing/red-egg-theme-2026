/**
 * Table of Contents – Frontend
 *
 * On mobile the TOC list is collapsed behind a toggle button.
 * On desktop the list is always shown (CSS forces it open), and
 * the toggle simply acts as a non-interactive heading.
 * Compiled into main.js via front-end.js.
 */

function initToc() {
    const blocks = document.querySelectorAll( '.post-toc' );

    blocks.forEach( ( toc ) => {
        const toggle = toc.querySelector( '.post-toc__toggle' );
        if ( ! toggle ) {
            return;
        }

        toggle.addEventListener( 'click', () => {
            const isOpen = toc.classList.toggle( 'is-open' );
            toggle.setAttribute( 'aria-expanded', isOpen ? 'true' : 'false' );
        } );
    } );
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', initToc );
} else {
    initToc();
}
