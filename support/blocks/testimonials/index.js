/**
 * Testimonials Block
 *
 * Header intro via InnerBlocks + a shortcode field
 * for the reviews plugin output. PHP render callback
 * runs do_shortcode() on the frontend.
 *
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/testimonials', {
    apiVersion: 2,
    title: __( 'Testimonials', 'red-egg' ),
    description: __( 'Section header with reviews plugin shortcode output.', 'red-egg' ),
    icon: 'format-quote',
    category: 'layout',
    keywords: [ __( 'testimonials', 'red-egg' ), __( 'reviews', 'red-egg' ), __( 'quotes', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        reviewsShortcode: {
            type: 'string',
            default: '',
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
    },
    edit,
    save,
} );
