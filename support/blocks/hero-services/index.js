/**
 * Hero – Case Study Block
 *
 * Modeled on Hero with Background Image:
 * two-column hero using hero-content (left)
 * and hero-media (right) child blocks.
 * Background image/color, mobile bg override,
 * adjustable min-height.
 *
 *    ____          _   _____              
 *   |  _ \ ___  __| | | ____|__ _  __ _   
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |  
 *   |  _ <  __/ (_| | | |__| (_| | (_| |  
 *   |_| \_\___|\\__,_| |_____\__, |\__, |  
 *                            |___/ |___/   
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/hero-services', {
    apiVersion: 2,
    title: __( 'Hero – Services', 'red-egg' ),
    description: __( 'Two-column case study hero with content + media child blocks.', 'red-egg' ),
    icon: 'id',
    category: 'layout',
    keywords: [ __( 'hero', 'red-egg' ), __( 'case study', 'red-egg' ), __( 'banner', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        image: {
            type: 'object',
            default: {
                url: '', width: '', height: '',
                repeat: 'no-repeat', attachment: 'scroll',
                position: 'center center', size: '', sizekey: 'cover',
                unit: '%', bgkeyword: 'keyword',
                positionX: '', positionY: '', bgunit: 'px',
            },
        },
        mobileimage: {
            type: 'object',
            default: {
                url: '', width: '', height: '',
                repeat: 'no-repeat', attachment: 'scroll',
                position: 'center center', size: '', sizekey: 'cover',
            },
        },
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: '',
        },
        minHeight: {
            type: 'number',
            default: 0,
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
