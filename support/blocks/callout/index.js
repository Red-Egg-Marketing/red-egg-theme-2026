/**
 * Callout Block
 *
 * Highlighted callout box for post/page content.
 * Two block styles:
 *   - Orange Border (default) — orange top border on a tinted card
 *   - Drop Shadow — white card with a soft shadow
 *
 * Content lives in InnerBlocks (heading + paragraph by default).
 * An optional Font Awesome icon can be shown before the content.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/callout', {
    apiVersion: 2,
    title: __( 'Callout', 'red-egg' ),
    description: __( 'Highlighted callout box. Choose an orange border or drop shadow style.', 'red-egg' ),
    icon: 'megaphone',
    category: 'layout',
    keywords: [ __( 'callout', 'red-egg' ), __( 'notice', 'red-egg' ), __( 'highlight', 'red-egg' ) ],
    supports: { anchor: true },
    styles: [
        { name: 'border-top', label: __( 'Orange Border', 'red-egg' ), isDefault: true },
        { name: 'shadow', label: __( 'Drop Shadow', 'red-egg' ) },
    ],
    attributes: {
        icon: {
            type: 'string',
            default: '',
        },
    },
    edit,
    save,
} );
