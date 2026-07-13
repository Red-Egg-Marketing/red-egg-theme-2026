/**
 * FAQ Accordion Block (parent)
 *
 * Container for a list of red-egg-block/accordion-item children.
 * Each item has a clickable question header and a collapsible
 * answer panel (see accordion-item + frontend.js).
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/faq-accordion', {
    apiVersion: 2,
    title: __( 'FAQ Accordion', 'red-egg' ),
    description: __( 'A collapsible list of question/answer items.', 'red-egg' ),
    icon: 'editor-ul',
    category: 'layout',
    keywords: [ __( 'faq', 'red-egg' ), __( 'accordion', 'red-egg' ), __( 'toggle', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {},
    edit,
    save,
} );
