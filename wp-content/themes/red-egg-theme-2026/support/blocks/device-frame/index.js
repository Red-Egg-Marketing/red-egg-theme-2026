/**
 * Device Frame Block
 *
 * Child of device-showcase. Renders a device mockup
 * (desktop monitor or mobile phone) with a website
 * screenshot positioned over the screen area.
 *
 * Device frame = background image (uploaded via MediaUpload)
 * Screenshot = foreground image positioned over the screen
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

registerBlockType( 'red-egg-block/device-frame', {
    apiVersion: 2,
    title: __( 'Device Frame', 'red-egg' ),
    description: __( 'Device mockup with screenshot overlay. Desktop or mobile.', 'red-egg' ),
    icon: 'laptop',
    category: 'layout',
    parent: [ 'red-egg-block/device-showcase' ],
    supports: { anchor: false },
    attributes: {
        deviceType: {
            type: 'string',
            default: 'desktop',
        },
        frameImage: {
            type: 'object',
            default: {
                id: '',
                url: '',
                alt: '',
            },
        },
        screenshot: {
            type: 'object',
            default: {
                id: '',
                url: '',
                alt: '',
                source: '',
                srcset: [],
                sizeUrls: {},
                sizeOverride: '',
            },
        },
        // Screen area positioning (percentage-based)
        screenTop: {
            type: 'number',
            default: 4.5,
        },
        screenLeft: {
            type: 'number',
            default: 4.5,
        },
        screenWidth: {
            type: 'number',
            default: 91,
        },
        screenHeight: {
            type: 'number',
            default: 72,
        },
    },
    edit,
    save,
} );
