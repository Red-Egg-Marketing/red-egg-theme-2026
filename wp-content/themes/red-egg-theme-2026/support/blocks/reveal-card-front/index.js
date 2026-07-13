/**
 * Reveal Card Front (child of Reveal Card)
 *
 * The face shown by default. Icon is configured in the sidebar
 * (FontAwesome class, inline SVG, or uploaded image) with an
 * optional blob background color. Heading + description live in
 * InnerBlocks.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/reveal-card-front', {
    apiVersion: 2,
    title: __( 'Reveal Card Front', 'red-egg' ),
    description: __( 'Front face: icon + heading + description.', 'red-egg' ),
    icon: 'cover-image',
    category: 'layout',
    parent: [ 'red-egg-block/reveal-card' ],
    keywords: [ __( 'card', 'red-egg' ), __( 'front', 'red-egg' ) ],
    attributes: {
        faClass: {
            type: 'string',
            default: '',
        },
        svgMarkup: {
            type: 'string',
            default: '',
        },
        icon: {
            type: 'string',
            default: '',
        },
        iconId: {
            type: 'number',
            default: 0,
        },
        iconAlt: {
            type: 'string',
            default: '',
        },
        iconBgColor: {
            type: 'string',
            default: '',
        },
        iconBgSlug: {
            type: 'string',
            default: '',
        },
    },
    edit,
    save,
} );
