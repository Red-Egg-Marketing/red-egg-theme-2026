/**
 * Shortcode Section Block
 *
 * Header intro + core/shortcode area.
 * Used for team grid, review widgets, or
 * any plugin shortcode output.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/shortcode-section', {
    apiVersion: 2,
    title: __( 'Shortcode Section', 'red-egg' ),
    description: __( 'Section header with shortcode embedding area.', 'red-egg' ),
    icon: 'shortcode',
    category: 'layout',
    keywords: [ __( 'shortcode', 'red-egg' ), __( 'embed', 'red-egg' ), __( 'team', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: '',
        },
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
