/**
 * Community Section Block
 *
 * Eggshell background section with header-intro
 * and image slider. Used for community, gallery,
 * or photo showcase sections.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/community-section', {
    apiVersion: 2,
    title: __( 'Community Section', 'red-egg' ),
    description: __( 'Section with header intro and image slider on an eggshell background.', 'red-egg' ),
    icon: 'groups',
    category: 'layout',
    keywords: [ __( 'community', 'red-egg' ), __( 'gallery', 'red-egg' ), __( 'photos', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: 'eggshell',
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
