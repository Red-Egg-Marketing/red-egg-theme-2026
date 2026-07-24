/**
 * Hero Block (Inner Pages)
 *
 * Full-bleed background image or video with overlay.
 * All content via InnerBlocks (heading, paragraph, buttons).
 * Left-aligned text by default.
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

registerBlockType( 'red-egg-block/hero-case-study', {
    apiVersion: 2,
    title: __( 'Hero - Case Study', 'red-egg' ),
    description: __( 'Case Studies hero with background image or video and flexible content via InnerBlocks.', 'red-egg' ),
    icon: 'id',
    category: 'layout',
    keywords: [ __( 'hero', 'red-egg' ), __( 'banner', 'red-egg' ), __( 'case study', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        image: {
            type: 'object',
            default: {
                url: '', url2x: '', width: '', height: '',
                repeat: 'no-repeat', attachment: 'scroll',
                position: 'center center', size: '', sizekey: 'cover',
                unit: '%', bgkeyword: 'keyword',
                positionX: '', positionY: '', bgunit: 'px',
            },
        },
        videoID: {
            type: 'number',
        },
        videoURL: {
            type: 'string',
            default: '',
        },
        vidOrImg: {
            type: 'string',
            default: 'image',
        },
        overlay: {
            type: 'boolean',
            default: false,
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
