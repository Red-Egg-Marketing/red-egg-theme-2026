const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/columns-group', {
    apiVersion: 2,
    title: __( 'Columns Group', 'red-egg' ),
    description: __( 'Group of columns with optional header intro and background color.', 'red-egg' ),
    icon: 'grid-view',
    category: 'layout',
    supports: {
        anchor: true,
    },
    keywords: [ __( 'columns', 'red-egg' ), __( 'group', 'red-egg' ), __( 'section', 'red-egg' ) ],
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
                paddingtop: '',
                paddingright: '',
                paddingbottom: '',
                paddingleft: '',
                unit: 'rem',
            },
        },
        margin: {
            type: 'object',
            default: {
                margintop: '',
                marginright: '',
                marginbottom: '',
                marginleft: '',
                unit: 'rem',
            },
        },
    },
    edit,
    save,
} );
