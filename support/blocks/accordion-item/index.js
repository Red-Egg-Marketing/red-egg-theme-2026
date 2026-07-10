/**
 * Accordion Item Block (child of faq-accordion)
 *
 * A single question/answer row.
 *   - question: RichText attribute (drives the toggle button label)
 *   - answer:   InnerBlocks (paragraphs, lists, etc.)
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/accordion-item', {
    apiVersion: 2,
    title: __( 'Accordion Item', 'red-egg' ),
    description: __( 'A single FAQ question and answer.', 'red-egg' ),
    icon: 'plus-alt2',
    category: 'layout',
    parent: [ 'red-egg-block/faq-accordion' ],
    supports: { anchor: true, reusable: false, html: false },
    attributes: {
        question: {
            type: 'string',
            default: '',
        },
    },
    edit,
    save,
} );
