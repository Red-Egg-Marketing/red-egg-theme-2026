/**
 * Testimonials Block
 * 
 * Purple/mauve background with egg pattern overlay.
 * Pulls reviews from red_egg_return_reviews endpoint.
 * Displays star ratings, quote, reviewer name/title.
 * Slider with navigation arrows.
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
    description: __( 'Testimonial slider with star ratings, pulled from the reviews API endpoint.', 'red-egg' ),
    icon: 'format-quote',
    category: 'layout',
    keywords: [ __( 'testimonials', 'red-egg' ), __( 'reviews', 'red-egg' ), __( 'quotes', 'red-egg' ) ],
    attributes: {
        sectionLabel: {
            type: 'string',
            default: 'TESTIMONIALS',
        },
        heading: {
            type: 'string',
            default: 'Our Clients',
        },
        postsToShow: {
            type: 'number',
            default: 6,
        },
        truncateLength: {
            type: 'number',
            default: 300,
        },
        padding: {
            type: 'object',
            default: {
                paddingtop: true,
                paddingbottom: true,
            },
        },
        margin: {
            type: 'object',
            default: {
                margintop: false,
                marginbottom: false,
            },
        },
    },
    edit,
    save,
} );
