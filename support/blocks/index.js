/**
 * Block Registration – Master Entry Point
 * 
 * This file imports all block index.js files so they
 * get compiled into editor.blocks.js by webpack.
 * 
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

// Block 1: Hero Background
import './hero-background/index';

// Block 1a: Hero Content (child: text/CTAs column)
import './hero-content/index';

// Block 1b: Hero Media (child: image/video column)
import './hero-media/index';

// Block 2: Columns Group
import './columns-group/index';

// Block 3: Text Cards Grid
import './text-cards-grid/index';

// Block 3b: Header Intro (reusable section header)
import './header-intro/index';

// Block 3b-i: Header Intro Left (child: label + heading)
import './header-intro-left/index';

// Block 3b-ii: Header Intro Right (child: description + buttons)
import './header-intro-right/index';

// Block 3c: Flip Card (child of Text Cards Grid)
import './flip-card/index';

// Block 3d: Reveal Card (parent) + front/back faces (Text Cards Grid)
import './reveal-card/index';
import './reveal-card-front/index';
import './reveal-card-back/index';

// Block 4: Numbered List Items
import './numbered-list/index';
import './numbered-list-items/index';

// Numbered List Item (child: badge + title + description)
import './numbered-list-item/index';

// Block 5: Case Studies Slider
import './case-studies-slider/index';
import './case-studies-slider-body/index';

// Block 6: Testimonials
import './testimonials/index';

// Block 7: Insights
import './insights/index';

// Block 8: Contact Section
import './contact-section/index';

// Contact Content (child: info, icons, CTAs)
import './contact-content/index';

// Contact Form (child: Gravity Form container)
import './contact-form/index';

// ---- Inner Page Blocks ----

// Hero (inner pages)
import './hero/index';

// Image & Text Columns (child of Columns Group)
import './image-text/index';

// Values Section (navy bg, marquee, value cards)
import './values-section/index';

// Shortcode Section (header-intro + shortcode embed)
import './shortcode-section/index';

// Community Section (eggshell bg, header-intro + image slider)
import './community-section/index';

// Image Slider (child of community-section, Swiper-powered)
import './image-slider/index';

// Awards Section (eggshell bg, header-intro + award badges slider)
import './awards-section/index';

// Vibe CTA (scrolling marquee + CTA buttons)
import './vibe-cta/index';

// Media Content (standalone two-column section)
import './media-content/index';

// Media Content – Media (child: image/video + blob)
import './media-content-media/index';

// Media Content – Text (child: header-intro + content)
import './media-content-text/index';

// Service List (parent: heading + service rows)
import './service-list/index';

// Service List Item (child: dark bar with title, arrow, description)
import './service-list-item/index';

// Filter Case Studies (dynamic grid with taxonomy filters)
import './filter-case-studies/index';

// Hero – Services (full-width hero with overlay + accent bar)
import './hero-services/index';

// Hero – Case Study (full-width hero with overlay + accent bar)
import './hero-case-study/index';

// Case Study Stats (key metrics grid)
import './case-study-stats/index';
// Stat Card (child of case-study-stats)
import './stat-card/index';

// Case Study Body (label + free content sections + blob)
import './case-study-body/index';

// Feature Cards (dark section: label + heading + icon card grid)
import './feature-cards/index';
// Feature Card (child of feature-cards)
import './feature-card/index';

// Case Study Gallery (label + heading + core/gallery)
import './case-study-gallery/index';

// Color Palette (label + heading + color swatch grid)
import './color-palette/index';

// Color Swatch (child of color-palette)
import './color-swatch/index';

// Device Showcase (dark bg section with device mockups)
import './device-showcase/index';

// Device Frame (child: desktop or mobile device with screenshot)
import './device-frame/index';

// Process Steps (parent: header-intro + numbered steps)
import './process-steps/index';

// Process Step (child: badge + content + tag cloud)
import './process-step/index';

// Icon Cards (section) + Items wrapper + Icon Card (child)
import './icon-cards/index';
import './icon-cards-items/index';
import './icon-card/index';

// ---- Format Types ----
// Rotate Words (Word Swap) – core/heading only
import '../format-types/rotate-words/index';

// ---- Block Style Variations ----
// Register custom button styles with arrow

wp.domReady( () => {
    wp.blocks.registerBlockStyle( 'core/button', {
        name: 'outline-gray',
        label: 'Outline Gray (Arrow)',
    } );

    wp.blocks.registerBlockStyle( 'core/button', {
        name: 'outline-white',
        label: 'Outline White (Arrow)',
    } );

    wp.blocks.registerBlockStyle( 'core/paragraph', {
        name: 'section-label',
        label: 'Section Label',
    } );
} );
