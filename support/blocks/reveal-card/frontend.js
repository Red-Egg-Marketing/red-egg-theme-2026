/**
 * Reveal Card – Frontend
 *
 * 1. Click the toggle button to flip the card (front <-> back).
 * 2. When the back content is taller than the card, it auto-scrolls
 *    vertically (gentle yoyo), pausing on hover or touch.
 *
 * Hardened against double-firing: some plugins / accessibility
 * overlays re-dispatch click events, so we (a) never bind a card
 * twice, (b) ignore a duplicate click inside a short window, and
 * (c) set the flipped state explicitly instead of blind-toggling.
 *
 * No React — plain DOM. Compiled into main.js via front-end.js.
 */

const SPEED = 26;        // px per second
const HOLD = 1400;       // pause (ms) at the top/bottom of a pass
const DEBOUNCE = 150;    // ms – swallow duplicate click dispatches

function buildAutoScroll( card ) {
    const viewport = card.querySelector( '.reveal-card__back-scroll' );
    const inner = card.querySelector( '.reveal-card__back-inner' );
    if ( ! viewport || ! inner ) {
        return null;
    }

    let raf = null;
    let paused = false;
    let dir = 1;
    let pos = 0;
    let last = 0;
    let holdUntil = 0;

    const overflow = () => inner.scrollHeight - viewport.clientHeight;

    const step = ( ts ) => {
        if ( ! last ) {
            last = ts;
        }
        const dt = ( ts - last ) / 1000;
        last = ts;

        const max = overflow();
        if ( max <= 0 ) {
            inner.style.transform = 'translateY(0)';
            raf = null;
            return;
        }

        if ( ! paused && ts >= holdUntil ) {
            pos += dir * SPEED * dt;
            if ( pos >= max ) {
                pos = max;
                dir = -1;
                holdUntil = ts + HOLD;
            } else if ( pos <= 0 ) {
                pos = 0;
                dir = 1;
                holdUntil = ts + HOLD;
            }
            inner.style.transform = 'translateY(' + ( -pos ) + 'px)';
        }

        raf = requestAnimationFrame( step );
    };

    const start = () => {
        stop();
        last = 0;
        pos = 0;
        dir = 1;
        holdUntil = performance.now() + HOLD;
        inner.style.transform = 'translateY(0)';
        raf = requestAnimationFrame( step );
    };

    const stop = () => {
        if ( raf ) {
            cancelAnimationFrame( raf );
        }
        raf = null;
    };

    viewport.addEventListener( 'mouseenter', () => { paused = true; } );
    viewport.addEventListener( 'mouseleave', () => { paused = false; } );
    viewport.addEventListener( 'touchstart', () => { paused = true; }, { passive: true } );
    viewport.addEventListener( 'touchend', () => { paused = false; }, { passive: true } );

    return { start, stop };
}

function buildTimeline(card) {
  const front   = card.querySelector('.reveal-card__face--front');
  const back    = card.querySelector('.reveal-card__face--back');
  const heading = front.querySelector('.reveal-card__front-content h3');
  const rest    = front.querySelectorAll('.reveal-card__icon, .reveal-card__front-content p');

  // Back starts hidden but laid out (also set this in CSS to avoid a flash).
  gsap.set(back, { autoAlpha: 0 });

  return gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    .to(heading, { y: -20, duration: 0.4 })                 // 1. header slides up
    .to(rest,    { autoAlpha: 0, duration: 0.3 }, '-=0.2')  // 2. other content fades
    .to(heading, { autoAlpha: 0, duration: 0.3 })           // 3. header fades
    .to(back,    { autoAlpha: 1, duration: 0.4 }, '-=0.1'); // 4. back reveals/fades in
}

function initRevealCard( card ) {
  if (card.dataset.revealCardReady === '1') return;
  card.dataset.revealCardReady = '1';

  const btn = card.querySelector('.reveal-card__toggle');
  if (!btn || typeof gsap === 'undefined') return;

  const scroller = buildAutoScroll(card);
  const tl = buildTimeline(card);
  let lastClick = 0;

  // Start the auto-scroll exactly when the back finishes revealing.
  if (scroller) tl.eventCallback('onComplete', () => scroller.start());

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const now = e.timeStamp || Date.now();
    if (now - lastClick < DEBOUNCE) return;   // swallow duplicate dispatch
    lastClick = now;

    // Works mid-animation too: reverses an in-progress open, replays an in-progress close.
    const opening = tl.reversed() || tl.progress() === 0;

    if (opening) {
      card.classList.add('is-flipped');                    // keeps the +/× icon swap
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close details');
      tl.play();
    } else {
      card.classList.remove('is-flipped');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Show details');
      if (scroller) scroller.stop();                       // stop before closing
      tl.reverse();
    }
  });
}

function initRevealCards() {
    document.querySelectorAll( '.reveal-card' ).forEach( initRevealCard );
}

if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', initRevealCards );
} else {
    initRevealCards();
}
