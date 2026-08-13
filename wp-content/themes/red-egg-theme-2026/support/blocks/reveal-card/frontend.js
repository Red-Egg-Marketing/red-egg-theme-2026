/**
 * Reveal Card – Frontend
 *
 * 1. Click the toggle button to flip the card (front <-> back).
 * 2. When the back content is taller than the card, it's natively
 *    scrollable (overflow-y: auto in CSS) — no auto-scroll.
 *
 * Hardened against double-firing: some plugins / accessibility
 * overlays re-dispatch click events, so we (a) never bind a card
 * twice, (b) ignore a duplicate click inside a short window, and
 * (c) set the flipped state explicitly instead of blind-toggling.
 *
 * No React — plain DOM. Compiled into main.js via front-end.js.
 */

import { onPageView } from '../../js/lifecycle';

const DEBOUNCE = 150;    // ms – swallow duplicate click dispatches

function buildTimeline(card) {
  const front   = card.querySelector('.reveal-card__face--front');
  const back    = card.querySelector('.reveal-card__face--back');
  const heading = front.querySelector('.reveal-card__front-content h3');
  const rest    = front.querySelectorAll('.reveal-card__icon, .reveal-card__front-content p');

  // Back starts hidden but laid out (also set this in CSS to avoid a flash).
  gsap.set(back, { autoAlpha: 0 });

  // The card's own back-h4 color (varies per card via WP palette
  // classes — magenta/purple/orange/etc). Read the rendered value so
  // the front h3 morphs to exactly this card's color; visibility:hidden
  // doesn't affect computed color.
  const backH4 = back.querySelector('h4');
  const h4Color = backH4 ? window.getComputedStyle(backH4).color : '';

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
    .to(rest,    { autoAlpha: 0, duration: 0.4 })  // 1. other content fades
    .to(rest,    { height: 0, duration: 0.4, marginBottom: 0 })  // 2. collapse — h3 rides up
    // 4. back reveals only AFTER the heading has fully settled onto the
    // h4's slot (0.8s: collapse + morph both done) — its h4 fades in
    // exactly on top of the morphed h3, so the handoff is invisible.
    .to(back,    { autoAlpha: 1, duration: 0.4, zIndex: 2 }, 0.8)

  // 3. heading morphs to this card's h4 color, starting with the
  // slide-up (the height collapse at 0.4s). Typography + padding morph
  // to the h4's exact slot via CSS with the same 0.4s delay.
  if (h4Color) {
    tl.to(heading, { color: h4Color, duration: 0.4 }, 0.4);
  }

  return tl;
}

function initRevealCard( card ) {
  if (card.dataset.revealCardReady === '1') return;
  card.dataset.revealCardReady = '1';

  const btn = card.querySelector('.reveal-card__toggle');
  if (!btn || typeof gsap === 'undefined') return;

  const tl = buildTimeline(card);
  let lastClick = 0;

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
      tl.reverse();
    }
  });
}

function initRevealCards() {
    document.querySelectorAll( '.reveal-card' ).forEach( initRevealCard );
}

onPageView( initRevealCards );
