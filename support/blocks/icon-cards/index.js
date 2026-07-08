/**
 *  ___ ___ ___  _  _    ___ _   ___ ___  ___
 * |_ _/ __/ _ \| \| |  / __/_\ | _ \   \/ __|
 *  | | (_| (_) | .` | | (__/ _ \|   / |) \__ \
 * |___\___\___/|_|\_|  \___/_/ \_\_|_\___/|___/
 *
 * Parent section: eyebrow + heading + static 3-up icon card grid.
 * Cards are InnerBlocks (red-egg-block/icon-card). No hover/flip reveal —
 * all card content is visible at rest.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/icon-cards', {
    apiVersion: 2,
    title: __( 'Icon Cards', 'red-egg' ),
    description: __( 'Eyebrow, heading, and a static grid of icon cards.', 'red-egg' ),
    category: 'layout',
    icon: 'screenoptions',
    supports: {
        anchor: true,
    },
    attributes: {
        eyebrow: {
            type: 'string',
            default: '',
        },
        heading: {
            type: 'string',
            default: '',
        },
        columns: {
            type: 'number',
            default: 3,
        },
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: '',
        },
        padding: {
            type: 'object',
            default: {
                paddingtop: '',
                paddingright: '',
                paddingbottom: '',
                paddingleft: '',
                unit: 'rem',
            },
        },
        margin: {
            type: 'object',
            default: {
                margintop: '',
                marginright: '',
                marginbottom: '',
                marginleft: '',
                unit: 'rem',
            },
        },
    },
    edit,
    save,
} );
