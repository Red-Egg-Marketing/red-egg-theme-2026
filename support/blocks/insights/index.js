/**
 * Insights Block
 * 
 * "The Coop Scoop" – displays blog/resource posts
 * from the red_egg_return_resources endpoint.
 * Peach cards with date, title, excerpt, CTA.
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
    description: __( 'Blog/resource posts displayed as peach cards with date, title, excerpt, and read more link.', 'red-egg' ),
    icon: 'admin-post',
    category: 'layout',
    keywords: [ __( 'insights', 'red-egg' ), __( 'blog', 'red-egg' ), __( 'resources', 'red-egg' ) ],
    attributes: {
        sectionLabel: {
            type: 'string',
            default: 'INSIGHTS',
        },
        heading: {
            type: 'string',
            default: 'The Coop Scoop',
        },
        postsToShow: {
            type: 'number',
            default: 2,
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
    },
    edit,
    save,
} );
