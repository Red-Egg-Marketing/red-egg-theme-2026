/**
 * Device Frame Block
 *
 * Child of device-showcase. Renders a single content image (a website
 * screenshot) styled to look like a desktop or mobile device via CSS on
 * the .device-frame--{type} class -- there's no separate bezel image or
 * screen-position overlay.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/device-frame', {
    apiVersion: 2,
    title: __( 'Device Frame', 'red-egg' ),
    description: __( 'Website image styled as a desktop or mobile device.', 'red-egg' ),
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
                source: '',
                srcset: [],
                sizeUrls: {},
                sizeOverride: '',
            },
        },
    },
    edit,
    save,
} );
