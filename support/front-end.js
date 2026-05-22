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

// Image Slider – Swiper initialization
import './blocks/image-slider/frontend';

// Awards Section – Swiper initialization
import './blocks/awards-section/frontend';

// Filter Case Studies – frontend interactivity
import './blocks/filter-case-studies/frontend';

// ---- Format Types ----

// Rotate Words – word swap animation
import './format-types/rotate-words/frontend';

// Blob Animation – GSAP MorphSVG blob morphing
import './js/blob-animation';


// Blob Animation – GSAP MorphSVG blob morphing
import './js/mask-morph';