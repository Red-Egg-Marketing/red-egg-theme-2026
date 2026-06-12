/**
 * Hero – Case Study Block
 *
 * Full-width hero with background image/video,
 * dark overlay, and bottom-left aligned content
 * (title + subtitle text).
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

registerBlockType( 'red-egg-block/hero-case-study', {
    apiVersion: 2,
    title: __( 'Hero – Case Study', 'red-egg' ),
    description: __( 'Full-width hero with background image, overlay, title, and subtitle.', 'red-egg' ),
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
        vidOrImg: {
            type: 'string',
            default: 'image',
        },
        videoID: {
            type: 'number',
        },
        videoURL: {
            type: 'string',
            default: '',
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
