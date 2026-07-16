/**
 * Header Single Block
 *
 * Single-column section header: label + heading + description,
 * all via InnerBlocks. A one-column sibling of header-intro,
 * reusable inside other section blocks (e.g. feature-cards).
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/header-single', {
    apiVersion: 2,
    title: __( 'Header (Single Column)', 'red-egg' ),
    description: __( 'One-column section header: label, heading, and description.', 'red-egg' ),
    icon: 'heading',
    category: 'layout',
    keywords: [ __( 'header', 'red-egg' ), __( 'intro', 'red-egg' ), __( 'section', 'red-egg' ), __( 'heading', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
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
