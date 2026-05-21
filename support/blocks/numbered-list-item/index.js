/**
 * Numbered List Item Block
 *
 * Child of numbered-list. Each item has a
 * NumberBadge + InnerBlocks for title and description.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/numbered-list-item', {
    apiVersion: 2,
    title: __( 'Numbered List Item', 'red-egg' ),
    description: __( 'Single numbered item with badge, title, and description.', 'red-egg' ),
    icon: 'editor-ol',
    category: 'layout',
    parent: [ 'red-egg-block/numbered-list-items', 'red-egg-block/process-step' ],
    supports: { anchor: false },
    attributes: {
        badge: {
            type: 'string',
            default: '01',
        },
    },
    edit,
    save,
} );
