/**
 * Blob Animation – Frontend
 *
 * GSAP MorphSVG morphing between blob shapes with:
 * - Rotational type interpolation (no pinching)
 * - Smooth pendulum x drift (left edge ↔ right edge)
 * - Smooth pendulum y drift (top ↔ bottom of parent)
 * - Subtle rotation and scale breathing
 */

import { onPageView } from './lifecycle';

( function() {

    function initMaskAnimations() {
        if ( typeof gsap === 'undefined' || typeof MorphSVGPlugin === 'undefined' || typeof ScrollTrigger === 'undefined' ) {
            return;
        }

        gsap.registerPlugin( MorphSVGPlugin, ScrollTrigger );

        var masks = document.querySelectorAll( '.mask-enabled' );

        if ( masks.length === 0 ) return;

        const maskPath = document.querySelector( '#DripMask1 path' );

        // The SVG mask is part of the React-rendered slider DOM — on a
        // fresh page:view it may not exist yet. Bail and wait for the
        // csSliderReady re-run instead of crashing.
        if ( ! maskPath ) return;

        // Idempotent: page:view, csSliderReady, and the double main.js
        // enqueue can all call this for the same DOM.
        if ( maskPath.dataset.morphInit ) return;
        maskPath.dataset.morphInit = '1';
        const midPath = 'M0 0H765V131C765 138.18 754.608 170 741.816 170C710.32 170 653.182 104 611.97 104C552.226 104 518.72 209 458.977 209C399.233 209 365.727 78 305.983 78C246.24 78 212.733 183 152.99 183C111.778 183 54.64 118 23.144 118C10.352 118 0 138.18 0 131V0Z';
        const fullPath = 'M0 0H765V418C765 425.18 754.608 431 741.816 431C710.32 431 653.182 431 611.97 431C552.226 431 518.72 431 458.977 431C399.233 431 365.727 431 305.983 431C246.24 431 212.733 431 152.99 431C111.778 431 54.64 431 23.144 431C10.352 431 0 425.18 0 418V0Z';

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".case-studies-slider__body",
            start: "top 70%",
            pin: false,
            toggleActions: "play none none none",
          }
        });

        tl.to(
          maskPath,
          {
            attr: { d: midPath },
            duration: 0,
            ease: "power2.inOut"
          },
        )
        .to(
          maskPath,
          {
            attr: { d: fullPath },
            duration: 4.5,
            ease: "power2.out"
          }
        );

    }

    // Re-run whenever the case-studies slider (re)mounts its React DOM,
    // and after every SPA page swap.
    document.addEventListener( 'csSliderReady', initMaskAnimations );
    onPageView( initMaskAnimations );

} )();
