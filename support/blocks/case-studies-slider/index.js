/**
 * Case Studies Slider Block
 *
 * Pulls case studies from the custom REST endpoint
 * and displays them in a Swiper slider with ResourceCard.
 * Supports industry taxonomy filtering.
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

registerBlockType( 'red-egg-block/case-studies-slider', {
    apiVersion: 2,
    title: __( 'Case Studies Slider', 'red-egg' ),
    description: __( 'Dynamic Swiper slider of case studies with industry filter.', 'red-egg' ),
    icon: 'slides',
    category: 'layout',
    keywords: [ __( 'case study', 'red-egg' ), __( 'slider', 'red-egg' ), __( 'work', 'red-egg' ), __( 'swiper', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        industry: {
            type: 'string',
            default: '',
        },
        postsToShow: {
            type: 'number',
            default: 15,
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
