/**
 * Reveal Card Back (child of Reveal Card)
 *
 * The face revealed when the card is flipped. Pure InnerBlocks
 * (heading + list/paragraphs). When the content is taller than
 * the card, frontend.js auto-scrolls it vertically, pausing on
 * hover or touch.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/reveal-card-back', {
    apiVersion: 2,
    title: __( 'Reveal Card Back', 'red-egg' ),
    description: __( 'Back face: heading + list/paragraphs. Auto-scrolls if too long.', 'red-egg' ),
    icon: 'list-view',
    category: 'layout',
    parent: [ 'red-egg-block/reveal-card' ],
    keywords: [ __( 'card', 'red-egg' ), __( 'back', 'red-egg' ) ],
    attributes: {},
    edit,
    save,
} );
