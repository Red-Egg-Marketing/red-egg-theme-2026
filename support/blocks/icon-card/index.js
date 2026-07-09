/**
 * Icon Card Block (child of Icon Cards Items)
 *
 * Icon (image or inline SVG) + title + body.
 * Icon editing mirrors feature-card / flip-card.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/icon-card', {
    apiVersion: 2,
    title: __( 'Icon Card', 'red-egg' ),
    description: __( 'Icon + title + body card. Child of Icon Cards.', 'red-egg' ),
    icon: 'id-alt',
    category: 'layout',
    parent: [ 'red-egg-block/icon-cards-items' ],
    supports: { anchor: false, inserter: true },
    attributes: {
        icon: { type: 'string', default: '' },
        iconId: { type: 'number', default: 0 },
        iconAlt: { type: 'string', default: '' },
        svgMarkup: { type: 'string', default: '' },
    },
    edit,
    save,
} );
