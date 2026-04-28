/**
 * Vibe CTA Block
 *
 * "Dig Our Vibe?" scrolling marquee with centered
 * CTA buttons below. Reuses the marquee animation
 * pattern from values-section.
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

registerBlockType( 'red-egg-block/vibe-cta', {
    apiVersion: 2,
    title: __( 'Vibe CTA', 'red-egg' ),
    description: __( 'Scrolling marquee text with centered CTA buttons.', 'red-egg' ),
    icon: 'megaphone',
    category: 'layout',
    keywords: [ __( 'vibe', 'red-egg' ), __( 'cta', 'red-egg' ), __( 'marquee', 'red-egg' ), __( 'scrolling', 'red-egg' ), __( 'dig', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        marqueeText: {
            type: 'string',
            default: 'DIG OUR VIBE?',
        },
        marqueeSpeed: {
            type: 'number',
            default: 25,
        },
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
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
        blockId: {
            type: 'string',
        },
    },
    edit,
    save,
} );
