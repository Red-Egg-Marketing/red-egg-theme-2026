/**
 * FAQ Accordion – Frontend
 *
 * Plain DOM (no React). Toggles each item open/closed and
 * animates the panel height. Items open independently.
 * Compiled into main.js via front-end.js.
 */

function initAccordion() {
    const items = document.querySelectorAll( '.faq-accordion__item' );

    items.forEach( ( item ) => {
        const trigger = item.querySelector( '.faq-accordion__trigger' );
        const panel   = item.querySelector( '.faq-accordion__panel' );

        if ( ! trigger || ! panel || trigger.dataset.accordionBound ) {
            return;
        }
        trigger.dataset.accordionBound = 'true';

        const close = () => {
            item.classList.remove( 'is-open' );
            trigger.setAttribute( 'aria-expanded', 'false' );
            panel.style.maxHeight = null;
        };

        const open = () => {
            item.classList.add( 'is-open' );
            trigger.setAttribute( 'aria-expanded', 'true' );
            panel.style.maxHeight = panel.scrollHeight + 'px';
        };

        trigger.addEventListener( 'click', () => {
            if ( item.classList.contains( 'is-open' ) ) {
                close();
            } else {
                open();
            }
        } );
    } );

    // Keep any open panels sized correctly on resize.
    let resizeRaf = null;
    window.addEventListener( 'resize', () => {
        if ( resizeRaf ) {
            cancelAnimationFrame( resizeRaf );
        }
        resizeRaf = requestAnimationFrame( () => {
            document.querySelectorAll( '.faq-accordion__item.is-open' ).forEach( ( item ) => {
                const panel = item.querySelector( '.faq-accordion__panel' );
                if ( panel ) {
                    panel.style.maxHeight = panel.scrollHeight + 'px';
                }
            } );
        } );
    } );
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', initAccordion );
} else {
    initAccordion();
}
