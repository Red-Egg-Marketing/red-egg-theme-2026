/**
 * Hero Block
 * 
 * Full-width hero with peach background, heading,
 * subtext, CTA button, and decorative egg images.
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

registerBlockType( 'red-egg-block/hero', {
    apiVersion: 2,
    title: __( 'Hero', 'red-egg' ),
    description: __( 'Full-width hero section with background color, heading, description, and CTA button.', 'red-egg' ),
    icon: 'format-image',
    category: 'layout',
    keywords: [ __( 'hero', 'red-egg' ), __( 'banner', 'red-egg' ), __( 'header', 'red-egg' ) ],
    attributes: {
        heading: {
            type: 'string',
            default: "Let's rock n' roll together.",
        },
        description: {
            type: 'string',
            default: "We're a full-service digital marketing agency providing branding, website design, and marketing services tailored to the needs of your business.",
        },
        buttonText: {
            type: 'string',
            default: 'OUR WORK',
        },
        buttonUrl: {
            type: 'string',
            default: '/work/',
        },
        backgroundImage: {
            type: 'string',
            default: '',
        },
        backgroundImageId: {
            type: 'number',
            default: 0,
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
                margintop: false,
                marginbottom: false,
            },
        },
    },
    edit,
    save,
} );
