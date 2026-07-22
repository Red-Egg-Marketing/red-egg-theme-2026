/**
 * Text Columns – Column Block (Child)
 *
 * Generic text column for the text-columns parent. Content comes
 * from the parent's nested template (eyebrow + heading on one side,
 * lead + paragraphs on the other). Locked to text-columns parent.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/text-columns-col', {
    apiVersion: 2,
    title: __( 'Text Columns – Column', 'red-egg' ),
    description: __( 'Text column for the Text Columns block.', 'red-egg' ),
    icon: 'editor-alignleft',
    category: 'layout',
    parent: [ 'red-egg-block/text-columns' ],
    supports: { anchor: false, inserter: false },
    attributes: {},
    edit,
    save,
} );
