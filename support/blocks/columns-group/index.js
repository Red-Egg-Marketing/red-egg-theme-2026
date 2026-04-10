/**
 * Columns Group Block
 * 
 * Two-column layout with image left, content right.
 * Section label, heading, intro text, body text, CTA, divider.
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

registerBlockType( 'red-egg-block/columns-group', {
    apiVersion: 2,
    title: __( 'Columns Group', 'red-egg' ),
    description: __( 'Two-column section with image and content — label, heading, intro, body, and CTA.', 'red-egg' ),
    icon: 'columns',
    category: 'layout',
    keywords: [ __( 'columns', 'red-egg' ), __( 'about', 'red-egg' ), __( 'partner', 'red-egg' ) ],
    attributes: {
        sectionLabel: {
            type: 'string',
            default: 'YOUR PARTNER & RESOURCE',
        },
        heading: {
            type: 'string',
            default: 'Denver Marketing Agency',
        },
        headingColor: {
            type: 'string',
            default: 'red', // 'red' | 'gray'
        },
        introText: {
            type: 'string',
            default: "We're a Denver marketing agency committed to being your trusted partner and digital marketing resource.",
        },
        bodyText: {
            type: 'string',
            default: "Our multifaceted team of talented creatives will integrate seamlessly into your organization, adding the full suite of marketing services you need with the flexibility you want. We shun one-size-fits-all packages in favor of custom-tailored marketing strategies with expert implementation to help your business reach its goals. Keep reading to see what we're all about!",
        },
        buttonText: {
            type: 'string',
            default: 'MEET RED EGG',
        },
        buttonUrl: {
            type: 'string',
            default: '/about/',
        },
        image: {
            type: 'string',
            default: '',
        },
        imageId: {
            type: 'number',
            default: 0,
        },
        imageAlt: {
            type: 'string',
            default: '',
        },
        showDivider: {
            type: 'boolean',
            default: true,
        },
        imagePosition: {
            type: 'string',
            default: 'left', // 'left' | 'right'
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
