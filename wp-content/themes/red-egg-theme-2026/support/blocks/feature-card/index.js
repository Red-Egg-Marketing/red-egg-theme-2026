/**
 * Feature Card Block (child of Feature Cards)
 *
 * Icon (image or inline SVG) + title + body.
 * Icon editing mirrors flip-card (image + SVG markup).
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/feature-card', {
    apiVersion: 2,
    title: __( 'Feature Card', 'red-egg' ),
    description: __( 'Icon + title + body card. Child of Feature Cards.', 'red-egg' ),
    icon: 'id-alt',
    category: 'layout',
    parent: [ 'red-egg-block/feature-cards' ],
    supports: { anchor: false, inserter: true },
    attributes: {
        faClass: {
            type: 'string',
            default: '',
        },
        icon: {
            type: 'string',
            default: '',
        },
        iconId: {
            type: 'number',
            default: 0,
        },
        iconAlt: {
            type: 'string',
            default: '',
        },
        svgMarkup: {
            type: 'string',
            default: '',
        },
    },
    edit,
    save,
} );
