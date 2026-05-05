/**
 * Image & Text Columns Block (Standalone)
 *
 * Two-column section: image/video on one side,
 * InnerBlocks content on the other.
 * Supports image/video toggle, alignment flip,
 * background image/color, drop shadow, padding/margin.
 *
 * Based on the 2022 image-text-columns block,
 * rebuilt for the 2026 theme conventions.
 *
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/image-text-columns', {
    apiVersion: 2,
    title: __( 'Image & Text Columns', 'red-egg' ),
    description: __( 'Two-column layout with image/video and text content. Standalone section block.', 'red-egg' ),
    icon: 'columns',
    category: 'layout',
    keywords: [ __( 'image', 'red-egg' ), __( 'text', 'red-egg' ), __( 'columns', 'red-egg' ), __( 'two column', 'red-egg' ), __( 'video', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        contentAlign: {
            type: 'string',
            default: 'img-right',
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
                url: '',
                width: '',
                height: '',
            },
        },
        withDrop: {
            type: 'boolean',
            default: true,
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
            default: 'top-right',
        },
    },
    edit,
    save,
} );
