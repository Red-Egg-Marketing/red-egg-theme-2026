/**
 * Text Columns Block (Parent)
 *
 * Two-column text section: title column (eyebrow + heading) and a
 * content column (paragraphs). Locked child structure with blob
 * animation, background color/image, padding/margin, and layout
 * controls (flip + column split).
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/text-columns', {
    apiVersion: 2,
    title: __( 'Text Columns', 'red-egg' ),
    description: __( 'Two-column text section with title and content columns. Uses locked child blocks.', 'red-egg' ),
    icon: 'columns',
    category: 'layout',
    keywords: [ __( 'text', 'red-egg' ), __( 'columns', 'red-egg' ), __( 'two column', 'red-egg' ), __( 'philosophy', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        contentAlign: {
            type: 'string',
            default: 'title-left',
        },
        colSplit: {
            type: 'string',
            default: '40-60',
        },
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: '',
        },
        image: {
            type: 'object',
            default: {
                url: '', width: '', height: '',
                repeat: 'no-repeat', attachment: 'scroll',
                position: 'center center', size: '', sizekey: 'cover',
                unit: '%', bgkeyword: 'keyword',
                positionX: '', positionY: '', bgunit: 'px',
            },
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
        blobEnabled: {
            type: 'boolean',
            default: false,
        },
        blobShape: {
            type: 'string',
            default: 'shape1',
        },
        blobSpeed: {
            type: 'number',
            default: 8,
        },
        blobPosition: {
            type: 'string',
            default: 'center-left',
        },
    },
    edit,
    save,
} );
