/**
 * Hero Background Block
 * 
 * Full-width hero section with background image controls,
 * mobile background controls, and InnerBlocks for content.
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

registerBlockType( 'red-egg-block/hero-background', {
    apiVersion: 2,
    title: __( 'Hero with Background Image', 'red-egg' ),
    description: __( 'Hero section with background image, mobile background, and inner block content.', 'red-egg' ),
    icon: 'format-image',
    category: 'layout',
    keywords: [ __( 'hero', 'red-egg' ), __( 'background', 'red-egg' ), __( 'banner', 'red-egg' ) ],
    attributes: {
        image: {
            type: 'object',
            default: {
                url: '',
                width: '',
                height: '',
                repeat: 'no-repeat',
                attachment: 'scroll',
                position: 'center center',
                size: '',
                sizekey: 'cover',
                unit: '%',
                bgkeyword: 'keyword',
                positionX: '',
                positionY: '',
                bgunit: 'px',
            },
        },
        mobileimage: {
            type: 'object',
            default: {
                url: '',
                width: '',
                height: '',
                repeat: 'no-repeat',
                attachment: 'scroll',
                position: 'center center',
                size: '',
                sizekey: 'cover',
            },
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
