/**
 * Process Steps Block
 *
 * Section with header-intro and repeatable
 * process-step children. Each step has a number
 * badge, content, and tag cloud.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/process-steps', {
    apiVersion: 2,
    title: __( 'Process Steps', 'red-egg' ),
    description: __( 'Numbered process steps with content and keyword tags.', 'red-egg' ),
    icon: 'editor-ol',
    category: 'layout',
    keywords: [ __( 'process', 'red-egg' ), __( 'steps', 'red-egg' ), __( 'numbered', 'red-egg' ), __( 'secret sauce', 'red-egg' ) ],
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
