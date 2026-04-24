/**
 * Values Section Block
 *
 * Navy background section with:
 *   - Scrolling marquee text (two lines, configurable)
 *   - Header-intro + description
 *   - Flip cards in a grid
 *   - Optional buttons
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/values-section', {
    apiVersion: 2,
    title: __( 'Values Section', 'red-egg' ),
    description: __( 'Navy section with scrolling marquee text, header, and value cards.', 'red-egg' ),
    icon: 'star-filled',
    category: 'layout',
    keywords: [ __( 'values', 'red-egg' ), __( 'marquee', 'red-egg' ), __( 'scrolling', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        marqueeLineOne: {
            type: 'string',
            default: 'VERSATILE, CREATIVE, DETAILED, HONEST',
        },
        marqueeLineTwo: {
            type: 'string',
            default: 'RESOURCEFUL, RELIABLE, PROACTIVE, RESILIENT',
        },
        marqueeSpeed: {
            type: 'number',
            default: 30,
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
