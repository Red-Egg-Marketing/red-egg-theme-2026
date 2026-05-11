/**
 * Media Content – Text Block (Child)
 *
 * Text/content column for the media-content parent.
 * InnerBlocks with header-intro, paragraphs, buttons.
 * Locked to media-content parent.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/media-content-text', {
    apiVersion: 2,
    title: __( 'Media Content – Text', 'red-egg' ),
    description: __( 'Text content column for Media Content block.', 'red-egg' ),
    icon: 'editor-alignleft',
    category: 'layout',
    parent: [ 'red-egg-block/media-content' ],
    supports: { anchor: false, inserter: false },
    attributes: {},
    edit,
    save,
} );
