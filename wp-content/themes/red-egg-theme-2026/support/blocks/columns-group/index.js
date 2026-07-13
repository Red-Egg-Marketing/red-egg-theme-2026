/**
 * Columns Group Block
 *
 * Container for header-intro + image-text children.
 * Supports background color and padding/margin.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/columns-group', {
    apiVersion: 2,
    title: __( 'Columns Group', 'red-egg' ),
    description: __( 'Group of image/text columns with optional header intro.', 'red-egg' ),
    icon: 'grid-view',
    category: 'layout',
    keywords: [ __( 'columns', 'red-egg' ), __( 'group', 'red-egg' ), __( 'layout', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
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
