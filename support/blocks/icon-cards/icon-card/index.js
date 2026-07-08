/**
 *  ___ ___ ___  _  _    ___ _   ___ ___
 * |_ _/ __/ _ \| \| |  / __/_\ | _ \   \
 *  | | (_| (_) | .` | | (__/ _ \|   / |) |
 * |___\___\___/|_|\_|  \___/_/ \_\_|_\___/
 *
 * Child card for red-egg-block/icon-cards.
 * Icon: MediaUpload image OR raw SVG paste (iconType toggle).
 * Title + description live in InnerBlocks.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/icon-card', {
    apiVersion: 2,
    title: __( 'Icon Card', 'red-egg' ),
    description: __( 'A single icon card: icon, title, description.', 'red-egg' ),
    category: 'layout',
    icon: 'id-alt',
    parent: [ 'red-egg-block/icon-cards' ],
    supports: {
        reusable: false,
        html: false,
    },
    attributes: {
        iconType: {
            type: 'string',
            default: 'image',
        },
        iconUrl: {
            type: 'string',
            default: '',
        },
        iconId: {
            type: 'number',
            default: 0,
        },
        iconAlt: {
            type: 'string',
            default: '',
        },
        iconSvg: {
            type: 'string',
            default: '',
        },
    },
    edit,
    save,
} );
