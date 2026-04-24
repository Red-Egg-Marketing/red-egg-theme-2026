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

// Block 2: Columns Group
import './columns-group/index';

// Block 3: Text Cards Grid
import './text-cards-grid/index';

// Block 3b: Header Intro (reusable section header)
import './header-intro/index';

// Block 3c: Flip Card (child of Text Cards Grid)
import './flip-card/index';

// Block 4: Numbered List Items
import './numbered-list/index';

// Block 5: Case Studies Slider
import './case-studies-slider/index';

// Block 6: Testimonials
import './testimonials/index';

// Block 7: Insights
import './insights/index';

// Block 8: Contact Section
import './contact-section/index';

// ---- Inner Page Blocks ----

// Hero (inner pages)
import './hero/index';

// Image & Text Columns (child of Columns Group)
import './image-text/index';

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
} );
