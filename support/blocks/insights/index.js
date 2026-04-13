/**
 * Insights Block
 *
 * "The Coop Scoop" – displays blog/resource posts
 * from the red-egg/v2/resources endpoint.
 * Uses ResourceCard component, category filter,
 * InnerBlocks for header-intro.
 *
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/insights', {
    apiVersion: 2,
    title: __( 'Insights', 'red-egg' ),
    description: __( 'Blog/resource posts displayed as cards with category filter and header intro.', 'red-egg' ),
    icon: 'admin-post',
    category: 'layout',
    keywords: [ __( 'insights', 'red-egg' ), __( 'blog', 'red-egg' ), __( 'resources', 'red-egg' ), __( 'posts', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        category: {
            type: 'string',
            default: '',
        },
        postsToShow: {
            type: 'number',
            default: 2,
        },
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
