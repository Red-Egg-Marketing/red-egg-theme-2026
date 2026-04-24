/**
 * Image & Text Columns Block
 *
 * Two-column layout: image/video on one side,
 * InnerBlocks content on the other. Supports
 * left/right alignment, column widths, video,
 * drop shadow, and background options.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/image-text', {
    apiVersion: 2,
    title: __( 'Image & Text Columns', 'red-egg' ),
    description: __( 'Two-column layout with image/video and text content. Supports alignment and column widths.', 'red-egg' ),
    icon: 'columns',
    category: 'layout',
    keywords: [ __( 'image', 'red-egg' ), __( 'text', 'red-egg' ), __( 'columns', 'red-egg' ), __( 'two column', 'red-egg' ) ],
    parent: [ 'red-egg-block/columns-group' ],
    supports: { anchor: true },
    attributes: {
        contentAlign: {
            type: 'string',
            default: 'img-left',
        },
        columnwidth: {
            type: 'string',
            default: 'col-50',
        },
        media: {
            type: 'object',
            default: {
                id: '',
                alt: '',
                srcSet: {
                    large: '',
                    medium: '',
                },
            },
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
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: '',
        },
        vidOrImg: {
            type: 'string',
            default: 'image',
        },
        videoID: {
            type: 'number',
        },
        videoURL: {
            type: 'string',
            default: '',
        },
        videothumb: {
            type: 'object',
            default: {
                url: '', width: '', height: '',
            },
        },
        withDrop: {
            type: 'boolean',
            default: true,
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
