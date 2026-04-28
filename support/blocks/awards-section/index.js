/**
 * Awards Section Block
 *
 * Eggshell background section with header-intro
 * (two-column: label + heading | description) and
 * a Swiper slider of award badges/logos with captions.
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

registerBlockType( 'red-egg-block/awards-section', {
    apiVersion: 2,
    title: __( 'Awards Section', 'red-egg' ),
    description: __( 'Section with header intro and Swiper slider of award badges with captions.', 'red-egg' ),
    icon: 'awards',
    category: 'layout',
    keywords: [ __( 'awards', 'red-egg' ), __( 'recognition', 'red-egg' ), __( 'badges', 'red-egg' ), __( 'slider', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: 'eggshell',
        },
        awards: {
            type: 'array',
            default: [],
        },
        slidesPerView: {
            type: 'number',
            default: 6,
        },
        spaceBetween: {
            type: 'number',
            default: 30,
        },
        withCards: {
            type: 'boolean',
            default: false,
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
