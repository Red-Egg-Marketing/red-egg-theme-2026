/**
 * Flip Card Block (child of Text Cards Grid)
 *
 * Card with front side (icon + heading via InnerBlocks)
 * and optional back side (description + button link).
 * Flips on hover via CSS.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/flip-card', {
    apiVersion: 2,
    title: __( 'Flip Card', 'red-egg' ),
    description: __( 'Card with front/back flip. Front: icon + title. Back: description + link.', 'red-egg' ),
    icon: 'button',
    category: 'layout',
    parent: [ 'red-egg-block/text-cards-grid', 'red-egg-block/values-section' ],
    keywords: [ __( 'card', 'red-egg' ), __( 'flip', 'red-egg' ), __( 'service', 'red-egg' ) ],
    attributes: {
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
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: '',
        },
        link: {
            type: 'string',
            default: '',
        },
        content: {
            type: 'string',
            default: '',
        },
        buttonText: {
            type: 'string',
            default: 'Learn More',
        },
    },
    edit,
    save,
} );
