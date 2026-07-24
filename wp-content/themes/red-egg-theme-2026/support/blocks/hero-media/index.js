/**
 * Hero Media Block
 *
 * Right column of hero-background.
 * Holds an image or video for the hero section.
 * Locked to hero-background parent.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/hero-media', {
    apiVersion: 2,
    title: __( 'Hero Media', 'red-egg' ),
    description: __( 'Image or video column for the hero section.', 'red-egg' ),
    icon: 'format-image',
    category: 'layout',
    parent: [ 'red-egg-block/hero-background', 'red-egg-block/hero-services' ],
    supports: { anchor: false, inserter: false },
    attributes: {
        mediaType: {
            type: 'string',
            default: 'image',
        },
        media: {
            type: 'object',
            default: {
                id: '',
                url: '',
                alt: '',
                source: '',
                srcset: [],
                sizeUrls: {},
                sizeOverride: '',
            },
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
        eggCount: {
            type: 'number',
            default: 4,
        },
        eggTouchBehavior: {
            type: 'string',
            default: 'stay-white',
        },
    },
    edit,
    save,
} );
