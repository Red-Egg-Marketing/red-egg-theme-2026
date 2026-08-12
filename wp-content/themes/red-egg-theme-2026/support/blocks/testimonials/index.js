/**
 * Testimonials Block
 *
 * Header intro via InnerBlocks + endpoint-driven reviews
 * (WP Reviews Pro table via /red-egg/v2/reviews).
 * Source options: single review, all reviews, or a hand-
 * picked selection. Multiple reviews render as a Swiper
 * slider (2-up desktop / 1 mobile) with read-more expand.
 *
 *    ____          _   _____
 *   |  _ \ ___  __| | | ____|__ _  __ _
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |
 *   |  _ <  __/ (_| | | |__| (_| | (_| |
 *   |_| \_\___|\\__,_| |_____\__, |\__, |
 *                            |___/ |___/
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/testimonials', {
    apiVersion: 2,
    title: __( 'Testimonials', 'red-egg' ),
    description: __( 'Section header + reviews pulled from the reviews endpoint, as a slider.', 'red-egg' ),
    icon: 'format-quote',
    category: 'layout',
    keywords: [ __( 'testimonials', 'red-egg' ), __( 'reviews', 'red-egg' ), __( 'quotes', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        // 'all' | 'single' | 'selected'
        reviewMode: {
            type: 'string',
            default: 'all',
        },
        // single review id (when reviewMode === 'single')
        reviewId: {
            type: 'string',
            default: '',
        },
        // hand-picked review ids (when reviewMode === 'selected')
        reviewIds: {
            type: 'array',
            default: [],
        },
        // sort order when reviewMode === 'all': 'date' | 'title' | 'random'
        reviewSort: {
            type: 'string',
            default: 'date',
        },
        padding: {
            type: 'object',
            default: {
                paddingtop: '', paddingright: '',
                paddingbottom: '', paddingleft: '', unit: 'rem',
            },
        },
        margin: {
            type: 'object',
            default: {
                margintop: '', marginright: '',
                marginbottom: '', marginleft: '', unit: 'rem',
            },
        },
        blockId: {
            type: 'string',
        },
    },
    edit,
    save,
} );
