/**
 * Process Step Block
 *
 * Child of process-steps. Each step has:
 * - numbered-list-item (badge + title + description)
 * - TagCloud for keyword pills
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/process-step', {
    apiVersion: 2,
    title: __( 'Process Step', 'red-egg' ),
    description: __( 'Single process step with numbered item and tag cloud.', 'red-egg' ),
    icon: 'editor-ol',
    category: 'layout',
    parent: [ 'red-egg-block/process-steps' ],
    supports: { anchor: false },
    attributes: {
        tags: {
            type: 'array',
            default: [],
        },
    },
    edit,
    save,
} );
