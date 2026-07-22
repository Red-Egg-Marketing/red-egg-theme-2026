/**
 * Squiggle Divider Block
 *
 * A standalone decorative divider — the red squiggle used elsewhere
 * (currently only case-study-stats), but as its own <hr>-style block:
 * no content, just the squiggle with padding and margin controls.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/squiggle-divider', {
    apiVersion: 2,
    title: __( 'Squiggle Divider', 'red-egg' ),
    description: __( 'Decorative squiggle divider, like an <hr> with the Red Egg squiggle.', 'red-egg' ),
    icon: 'minus',
    category: 'design',
    keywords: [ __( 'squiggle', 'red-egg' ), __( 'divider', 'red-egg' ), __( 'separator', 'red-egg' ), __( 'hr', 'red-egg' ) ],
    supports: { anchor: true, html: false },
    attributes: {
        padding: {
            type: 'object',
            default: {
                paddingtop: '', paddingright: '',
                paddingbottom: '', paddingleft: '', unit: 'rem',
            },
        },
        margin: {
            type: 'object',
            default: {
                margintop: '', marginright: '',
                marginbottom: '', marginleft: '', unit: 'rem',
            },
        },
        blockId: {
            type: 'string',
        },
    },
    edit,
    save,
} );
