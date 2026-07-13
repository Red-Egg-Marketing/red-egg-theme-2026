/**
 * Header Intro Right Block
 *
 * Right column of the header-intro.
 * Holds description paragraphs, lists, and buttons.
 * Locked to header-intro parent.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/header-intro-right', {
    apiVersion: 2,
    title: __( 'Header Intro – Right', 'red-egg' ),
    description: __( 'Right column for description text, lists, and buttons.', 'red-egg' ),
    icon: 'align-right',
    category: 'layout',
    parent: [ 'red-egg-block/header-intro' ],
    supports: { anchor: false, inserter: false },
    attributes: {},
    edit,
    save,
} );
