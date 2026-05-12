/**
 * Media Content Block (Parent)
 *
 * Two-column section: media-content-media on one side,
 * media-content-text on the other. Locked child structure.
 * Supports alignment flip, background image/color,
 * padding/margin.
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

registerBlockType( 'red-egg-block/media-content', {
    apiVersion: 2,
    title: __( 'Media Content', 'red-egg' ),
    description: __( 'Two-column section with media and text content. Uses locked child blocks.', 'red-egg' ),
    icon: 'columns',
    category: 'layout',
    keywords: [ __( 'image', 'red-egg' ), __( 'text', 'red-egg' ), __( 'columns', 'red-egg' ), __( 'media', 'red-egg' ), __( 'video', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        contentAlign: {
            type: 'string',
            default: 'img-right',
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
