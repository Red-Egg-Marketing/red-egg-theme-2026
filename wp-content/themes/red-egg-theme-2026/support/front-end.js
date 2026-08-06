/**
 * Frontend Entry Point
 * 
 * Imports all block frontend.js files that need
 * client-side interactivity (API calls, sliders, etc).
 * Compiled to assets/js/main.js by webpack.
 * 
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

// Block 5: Case Studies Slider – frontend interactivity
import './blocks/case-studies-slider/frontend';

// Block 6: Testimonials – handled by PHP render callback (shortcode)

// Block 7: Insights – frontend interactivity
import './blocks/insights/frontend';

// ---- Global Scripts ----

// Custom video play/pause controls
import './js/video';

// Desktop mega menu navigation
import './js/navigation';

// Mobile navigation (full-screen overlay + accordion)
import './js/mobile-nav';

// Lightbox – GLightbox for opted-in images/galleries
import './js/lightbox';

// Image Slider – Swiper initialization
import './blocks/image-slider/frontend';

// Awards Section – Swiper initialization
import './blocks/awards-section/frontend';

// Filter Case Studies – frontend interactivity
import './blocks/filter-case-studies/frontend';

// Filter Posts – frontend interactivity
import './blocks/filter-posts/frontend';

// Testimonials – reviews slider
import './blocks/testimonials/frontend';

// Reveal Card – click-to-flip + auto-scroll back content
import './blocks/reveal-card/frontend';

// ---- Format Types ----

// Rotate Words – word swap animation
import './format-types/rotate-words/frontend';

// Blob Animation – GSAP MorphSVG blob morphing
import './js/blob-animation';

// Blob Undulate – gentle point wobble for path.blob-animation (SVG upload areas)
import './js/blob-undulate';

// Squiggle Decoration – GSAP ScrollTrigger clip-path reveal
import './js/squiggle-animation';


// Blob Animation – GSAP MorphSVG blob morphing
import './js/mask-morph';

// ---- Blog ----

// FAQ Accordion – expand/collapse
import './blocks/faq-accordion/frontend';

// Table of Contents – collapsible on mobile
import './js/toc';

// Smooth scroll for internal anchor links (site-wide)
import './blocks/section-nav/frontend';

import './js/smooth-scroll';

// ---- SPA Navigation ----

// Swup page transitions – swaps #content, dispatches
// red-egg:page-leave / red-egg:page-view lifecycle events
import './js/spa-nav';

// Image fade-in + loading placeholders (SPA-aware)
import './js/image-fade';

// Egg cluster intro "attract" sequence
import './blocks/egg-cluster/frontend';