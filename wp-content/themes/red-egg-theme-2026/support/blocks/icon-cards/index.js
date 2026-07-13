/**
 *  ___ ___ ___  _  _    ___ _   ___ ___  ___
 * |_ _/ __/ _ \| \| |  / __/_\ | _ \   \/ __|
 *  | | (_| (_) | .` | | (__/ _ \|   / |) \__ \
 * |___\___\___/|_|\_|  \___/_/ \_\_|_\___/|___/
 *
 * Section: header-intro-left + icon-cards-items wrapper (single InnerBlocks).
 * Static 3-up icon card grid — no hover/flip reveal.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/icon-cards', {
    apiVersion: 2,
    title: __( 'Icon Cards', 'red-egg' ),
    description: __( 'Header intro + static grid of icon cards.', 'red-egg' ),
    icon: 'screenoptions',
    category: 'layout',
    keywords: [ __( 'icon', 'red-egg' ), __( 'cards', 'red-egg' ), __( 'features', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: { type: 'string', default: '' },
        bgSlug: { type: 'string', default: '' },
        padding: {
            type: 'object',
            default: { paddingtop: '', paddingright: '', paddingbottom: '', paddingleft: '', unit: 'rem' },
        },
        margin: {
            type: 'object',
            default: { margintop: '', marginright: '', marginbottom: '', marginleft: '', unit: 'rem' },
        },
        blockId: { type: 'string' },
    },
    edit,
    save,
} );
