/**
 * Case Studies Slider Block
 * 
 * Pulls case studies from the custom REST endpoint
 * (red_egg_return_case_studies) and displays them
 * in a slider with featured images, titles, descriptions.
 * Left/right navigation arrows, flanked by preview images.
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

registerBlockType( 'red-egg-block/case-studies-slider', {
    apiVersion: 2,
    title: __( 'Case Studies Slider', 'red-egg' ),
    description: __( 'Dynamic slider of case studies pulled from the REST API.', 'red-egg' ),
    icon: 'slides',
    category: 'layout',
    keywords: [ __( 'case study', 'red-egg' ), __( 'slider', 'red-egg' ), __( 'work', 'red-egg' ) ],
    attributes: {
        sectionLabel: {
            type: 'string',
            default: 'CASE STUDIES',
        },
        heading: {
            type: 'string',
            default: 'Our Work',
        },
        description: {
            type: 'string',
            default: 'We work with clients of all different shapes and sizes in a wide variety of industries. Check out some of our recent work to see how we help businesses just like yours.',
        },
        buttonText: {
            type: 'string',
            default: 'VIEW OUR WORK',
        },
        buttonUrl: {
            type: 'string',
            default: '/work/?post-type=case-study',
        },
        postsToShow: {
            type: 'number',
            default: 6,
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
