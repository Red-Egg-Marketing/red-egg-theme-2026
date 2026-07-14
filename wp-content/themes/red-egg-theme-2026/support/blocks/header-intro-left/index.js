/**
 * Header Intro Left Block
 *
 * Left column of the header-intro.
 * Holds the section label and heading.
 * Locked to header-intro parent.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/header-intro-left', {
    apiVersion: 2,
    title: __( 'Header Intro – Left', 'red-egg' ),
    description: __( 'Left column for section label and heading.', 'red-egg' ),
    icon: 'align-left',
    category: 'layout',
    parent: [ 'red-egg-block/header-intro', 'red-egg-block/numbered-list', 'red-egg-block/color-palette', 'red-egg-block/icon-cards', 'red-egg-block/awards-section' ],
    supports: { anchor: false, inserter: false },
    attributes: {},
    edit,
    save,
} );
