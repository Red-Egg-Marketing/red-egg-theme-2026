/**
 * Device Showcase Block
 *
 * Dark background section with desktop + mobile
 * device frames and a CTA button below.
 * Used on case study pages to show website work.
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

registerBlockType( 'red-egg-block/device-showcase', {
    apiVersion: 2,
    title: __( 'Device Showcase', 'red-egg' ),
    description: __( 'Desktop + mobile device mockups with screenshots and CTA button.', 'red-egg' ),
    icon: 'desktop',
    category: 'layout',
    keywords: [ __( 'device', 'red-egg' ), __( 'mockup', 'red-egg' ), __( 'desktop', 'red-egg' ), __( 'mobile', 'red-egg' ), __( 'website', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: 'gray',
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
