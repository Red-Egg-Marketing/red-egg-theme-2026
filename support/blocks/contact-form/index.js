const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/contact-form', {
    apiVersion: 2,
    title: __( 'Contact Form', 'red-egg' ),
    description: __( 'Form column for Gravity Forms or any form block.', 'red-egg' ),
    icon: 'feedback',
    category: 'layout',
    parent: [ 'red-egg-block/contact-section' ],
    supports: { anchor: false, inserter: false },
    attributes: {},
    edit,
    save,
} );
