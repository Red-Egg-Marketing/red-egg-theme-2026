/**
 * Icon Cards Items Wrapper Block
 *
 * Child of icon-cards. Wraps the icon-card grandchildren
 * so the card grid stays independent of the header row.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/icon-cards-items', {
    apiVersion: 2,
    title: __( 'Icon Cards Items Wrapper', 'red-egg' ),
    description: __( 'Container for icon cards within the icon cards block.', 'red-egg' ),
    icon: 'screenoptions',
    category: 'layout',
    parent: [ 'red-egg-block/icon-cards' ],
    supports: { anchor: false },
    attributes: {},
    edit,
    save,
} );
