/**
 * Media Content – Media Block (Child)
 *
 * Image/video column for the media-content parent.
 * Supports image/video toggle, drop shadow, blob animation.
 * Locked to media-content parent.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/media-content-media', {
    apiVersion: 2,
    title: __( 'Media Content – Media', 'red-egg' ),
    description: __( 'Image or video column for Media Content block.', 'red-egg' ),
    icon: 'format-image',
    category: 'layout',
    parent: [ 'red-egg-block/media-content' ],
    supports: { anchor: false, inserter: false },
    attributes: {
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
                url: '', width: '', height: '',
            },
        },
        withDrop: {
            type: 'boolean',
            default: true,
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
