/**
 * Desktop Mega Menu Navigation
 *
 * Top-level items with children render (via Red_Egg_Mega_Walker) as
 * .mega-toggle buttons that open a full-width .mega-menu panel.
 * Click to toggle; close via the panel's X, Escape, or outside click.
 * Desktop only — bindings are inert below the $small-width breakpoint.
 *
 *    ____          _   _____
 *   |  _ \ ___  __| | | ____|__ _  __ _
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |
 *   |  _ <  __/ (_| | | |__| (_| | (_| |
 *   |_| \_\___|\__,_| |_____\__, |\__, |
 *                            |___/ |___/
 */

const DESKTOP_MQ = '(min-width: 768px)';

function initMegaMenu() {
    const toggles = Array.from( document.querySelectorAll( '.mega-toggle' ) );
    if ( ! toggles.length ) {
        return;
    }

    const panels = Array.from( document.querySelectorAll( '.mega-menu' ) );
    const mq = window.matchMedia( DESKTOP_MQ );
    let openPanel = null;
    let activeToggle = null;

    const panelFor = ( toggle ) =>
        document.getElementById( toggle.getAttribute( 'aria-controls' ) );

    function openMega( toggle ) {
        const panel = panelFor( toggle );
        if ( ! panel ) {
            return;
        }
        if ( openPanel && openPanel !== panel ) {
            closeMega( { restoreFocus: false } );
        }
        panel.hidden = false;
        // Force reflow so the transition runs from the hidden state.
        void panel.offsetWidth;
        panel.classList.add( 'is-open' );
        toggle.setAttribute( 'aria-expanded', 'true' );
        document.body.classList.add( 'mega-open' );
        openPanel = panel;
        activeToggle = toggle;

        const closeBtn = panel.querySelector( '.mega-menu__close' );
        if ( closeBtn ) {
            closeBtn.focus();
        }
    }

    function closeMega( { restoreFocus = true } = {} ) {
        if ( ! openPanel ) {
            return;
        }
        const panel = openPanel;
        const toggle = activeToggle;
        panel.classList.remove( 'is-open' );
        if ( toggle ) {
            toggle.setAttribute( 'aria-expanded', 'false' );
        }
        document.body.classList.remove( 'mega-open' );

        const onEnd = () => {
            panel.hidden = true;
            panel.removeEventListener( 'transitionend', onEnd );
        };
        panel.addEventListener( 'transitionend', onEnd );
        // Fallback if no transition fires.
        window.setTimeout( () => { panel.hidden = true; }, 400 );

        openPanel = null;
        activeToggle = null;

        if ( restoreFocus && toggle ) {
            toggle.focus();
        }
    }

    toggles.forEach( ( toggle ) => {
        toggle.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            if ( ! mq.matches ) {
                return; // Desktop only.
            }
            const panel = panelFor( toggle );
            if ( panel && panel === openPanel ) {
                closeMega();
            } else {
                openMega( toggle );
            }
        } );
    } );

    panels.forEach( ( panel ) => {
        const closeBtn = panel.querySelector( '.mega-menu__close' );
        if ( closeBtn ) {
            closeBtn.addEventListener( 'click', () => closeMega() );
        }
    } );

    // Escape closes.
    document.addEventListener( 'keydown', ( e ) => {
        if ( 'Escape' === e.key && openPanel ) {
            closeMega();
        }
    } );

    // Click outside the panel and its toggle closes.
    document.addEventListener( 'click', ( e ) => {
        if ( ! openPanel ) {
            return;
        }
        if ( openPanel.contains( e.target ) || ( activeToggle && activeToggle.contains( e.target ) ) ) {
            return;
        }
        closeMega( { restoreFocus: false } );
    } );

    // Close if resized to mobile.
    mq.addEventListener( 'change', ( ev ) => {
        if ( ! ev.matches && openPanel ) {
            closeMega( { restoreFocus: false } );
        }
    } );
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', initMegaMenu );
} else {
    initMegaMenu();
}
