/**
 * Image Slider Block
 *
 * A repeatable set of images displayed as a Swiper
 * slider on the frontend. Images managed via
 * MediaUpload in the editor.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/image-slider', {
    apiVersion: 2,
    title: __( 'Image Slider', 'red-egg' ),
    description: __( 'Swiper image slider with add/remove controls.', 'red-egg' ),
    icon: 'images-alt2',
    category: 'layout',
    keywords: [ __( 'slider', 'red-egg' ), __( 'images', 'red-egg' ), __( 'gallery', 'red-egg' ), __( 'swiper', 'red-egg' ) ],
    parent: [ 'red-egg-block/community-section' ],
    supports: { anchor: true },
    attributes: {
        images: {
            type: 'array',
            default: [],
        },
        slidesPerView: {
            type: 'number',
            default: 3,
        },
        spaceBetween: {
            type: 'number',
            default: 20,
        },
        blockId: {
            type: 'string',
        },
    },
    edit,
    save,
} );
