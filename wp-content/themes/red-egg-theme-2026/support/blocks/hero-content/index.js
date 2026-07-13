/**
 * Hero Content Block
 *
 * Left column of hero-background.
 * Holds headings, paragraphs, and CTA buttons.
 * Locked to hero-background parent.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/hero-content', {
    apiVersion: 2,
    title: __( 'Hero Content', 'red-egg' ),
    description: __( 'Text and CTA column for the hero section.', 'red-egg' ),
    icon: 'editor-alignleft',
    category: 'layout',
    parent: [ 'red-egg-block/hero-background', 'red-egg-block/hero-services' ],
    supports: { anchor: false, inserter: false },
    attributes: {},
    edit,
    save,
} );
