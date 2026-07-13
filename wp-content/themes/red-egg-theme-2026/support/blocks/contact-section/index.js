/**
 * Contact Section Block
 *
 * Two-column contact section: left (content, icons, CTAs)
 * and right (Gravity Form). Background color support.
 * Uses child blocks for client-proof structure.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/contact-section', {
    apiVersion: 2,
    title: __( 'Contact Section', 'red-egg' ),
    description: __( 'Two-column contact section with info, icons, and form.', 'red-egg' ),
    icon: 'email',
    category: 'layout',
    keywords: [ __( 'contact', 'red-egg' ), __( 'form', 'red-egg' ), __( 'hatch', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: 'red',
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
