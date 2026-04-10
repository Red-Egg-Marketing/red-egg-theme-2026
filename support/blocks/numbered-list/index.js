/**
 * Numbered List Items Block
 * 
 * Navy background section with large faded numbers,
 * item titles, and descriptions. Left column has
 * heading + intro text + logo mark.
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

registerBlockType( 'red-egg-block/numbered-list', {
    apiVersion: 2,
    title: __( 'Numbered List Items', 'red-egg' ),
    description: __( 'Navy section with numbered items — large faded numbers, titles, and descriptions.', 'red-egg' ),
    icon: 'editor-ol',
    category: 'layout',
    keywords: [ __( 'numbered', 'red-egg' ), __( 'list', 'red-egg' ), __( 'why', 'red-egg' ) ],
    attributes: {
        heading: {
            type: 'string',
            default: 'Why Choose Red Egg?',
        },
        introText: {
            type: 'string',
            default: 'Red Egg Marketing is your one stop shop for marketing and branding services custom tailored to the needs of your organization.',
        },
        items: {
            type: 'array',
            default: [
                {
                    title: 'Your Trusted Partner & Resource',
                    body: 'We believe in building lasting relationships and providing consistent value to our clients. Our work makes a positive impact on the lives of our clients and their customers, which is why we love what we do.',
                },
                {
                    title: 'Customized Solutions That Work',
                    body: 'Instead of offering ineffective cookie cutter packages, we develop custom-tailored strategies based on your individual goals and budget. Discover how our marketing programs produce real results and protect you from expensive mistakes.',
                },
                {
                    title: "You've Found Your Marketing Department",
                    body: "We assist in any stage of a brand's development by providing dependable and high-quality assistance where and when you need it. Don't juggle multiple contractors or hire unnecessarily, Red Egg is your resource for professional branding, marketing, and web expertise.",
                },
            ],
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
