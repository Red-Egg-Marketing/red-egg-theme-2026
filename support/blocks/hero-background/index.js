/**
 * Hero Background Block
 *
 * Flexible hero section supporting:
 * - Background image/color with text overlay
 * - Two-column split: content left + media right
 * - Adjustable min-height
 * - Mobile background override
 *
 * Uses hero-content and hero-media child blocks
 * for client-proof column structure.
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

registerBlockType( 'red-egg-block/hero-background', {
    apiVersion: 2,
    title: __( 'Hero with Background Image', 'red-egg' ),
    description: __( 'Flexible hero section with background image/color, content + media columns, adjustable height.', 'red-egg' ),
    icon: 'format-image',
    category: 'layout',
    keywords: [ __( 'hero', 'red-egg' ), __( 'background', 'red-egg' ), __( 'banner', 'red-egg' ), __( 'split', 'red-egg' ) ],
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
                paddingbottom: '', paddingleft: '',
                unit: 'rem',
            },
        },
        margin: {
            type: 'object',
            default: {
                margintop: '', marginright: '',
                marginbottom: '', marginleft: '',
                unit: 'rem',
            },
        },
    },
    edit,
    save,
} );
