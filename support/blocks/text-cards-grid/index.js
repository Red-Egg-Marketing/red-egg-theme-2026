/**
 * Text Cards Grid Block
 * 
 * Section with heading + description, then a row of 
 * service cards with icon, title, body, and arrow link.
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

registerBlockType( 'red-egg-block/text-cards-grid', {
    apiVersion: 2,
    title: __( 'Text Cards Grid', 'red-egg' ),
    description: __( 'Section with heading and a grid of service cards with icons.', 'red-egg' ),
    icon: 'grid-view',
    category: 'layout',
    keywords: [ __( 'cards', 'red-egg' ), __( 'services', 'red-egg' ), __( 'grid', 'red-egg' ) ],
    attributes: {
        sectionLabel: {
            type: 'string',
            default: 'HOW WE HELP',
        },
        heading: {
            type: 'string',
            default: 'Your Boutique One-Stop Shop',
        },
        description: {
            type: 'string',
            default: 'Rather than coordinating with multiple contractors or trying to find one employee to do it all, leverage the power of Red Egg Marketing to create more cohesive, creative, and effective digital marketing campaigns.',
        },
        cards: {
            type: 'array',
            default: [
                {
                    icon: '',
                    iconId: 0,
                    title: 'Branding',
                    body: 'Thoughtful brand design that leaves a lasting impression.',
                    url: '/services/branding/',
                },
                {
                    icon: '',
                    iconId: 0,
                    title: 'Websites',
                    body: 'Web design and development that drives growth and real results.',
                    url: '/services/websites/',
                },
                {
                    icon: '',
                    iconId: 0,
                    title: 'Marketing',
                    body: 'Honest, solutions-driven marketing that helps organizations grow.',
                    url: '/services/marketing/',
                },
            ],
        },
        padding: {
            type: 'object',
            default: {
                paddingtop: true,
                paddingbottom: true,
            },
        },
        margin: {
            type: 'object',
            default: {
                margintop: true,
                marginbottom: true,
            },
        },
    },
    edit,
    save,
} );
