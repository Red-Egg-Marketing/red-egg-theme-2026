/**
 * Text Card Block (child of Text Cards Grid)
 *
 * Individual service card with icon + URL as config attributes,
 * and InnerBlocks for the title & body content.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/text-card', {
    apiVersion: 2,
    title: __( 'Text Card', 'red-egg' ),
    description: __( 'A single service card with icon, title, body, and arrow link.', 'red-egg' ),
    icon: 'index-card',
    category: 'layout',
    keywords: [ __( 'card', 'red-egg' ), __( 'service', 'red-egg' ) ],
    parent: [ 'red-egg-block/text-cards-grid' ],
    supports: { anchor: true },
    attributes: {
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
        url: {
            type: 'string',
            default: '',
        },
    },
    edit,
    save,
} );
