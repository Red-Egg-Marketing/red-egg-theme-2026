/**
 * Section Nav Block
 *
 * Sticky, full-width bar of core/buttons used for on-page
 * (internal anchor) navigation. Sticks below the site header;
 * the button for the section currently in view gets an active
 * class (scrollspy) via frontend.js.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/section-nav', {
    apiVersion: 2,
    title: __( 'Section Nav (Sticky)', 'red-egg' ),
    description: __( 'Sticky bar of buttons that link to on-page sections.', 'red-egg' ),
    icon: 'menu',
    category: 'layout',
    keywords: [ __( 'nav', 'red-egg' ), __( 'sticky', 'red-egg' ), __( 'anchor', 'red-egg' ), __( 'jump', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: { type: 'string', default: '' },
        bgSlug:  { type: 'string', default: 'white' },
        padding: {
            type: 'object',
            default: { paddingtop: '', paddingright: '', paddingbottom: '', paddingleft: '', unit: 'rem' },
        },
        margin: {
            type: 'object',
            default: { margintop: '', marginright: '', marginbottom: '', marginleft: '', unit: 'rem' },
        },
        blockId: { type: 'string' },
    },
    edit,
    save,
} );
