/**
 * Egg Cluster Block
 *
 * Decorative cluster of eggs (the Red Egg photo asset) that each turn
 * red independently on hover. Each egg is a stacked pair of the same-
 * framed white + red 200x200 PNGs; the red one crossfades in on hover
 * (pure CSS opacity, no JS, no filter -- a photo can't be recolored
 * by filter, so we swap between two real recolored photos instead).
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/egg-cluster', {
    apiVersion: 2,
    title: __( 'Egg Cluster', 'red-egg' ),
    description: __( 'Decorative eggs that turn red on hover. Each egg is independently interactive.', 'red-egg' ),
    icon: 'egg',
    category: 'design',
    keywords: [ __( 'egg', 'red-egg' ), __( 'hover', 'red-egg' ), __( 'decoration', 'red-egg' ) ],
    supports: { anchor: true, html: false },
    attributes: {
        count: {
            type: 'number',
            default: 4,
        },
        touchBehavior: {
            type: 'string',
            default: 'stay-white', // 'stay-white' | 'auto-cycle'
        },
        blockId: {
            type: 'string',
        },
    },
    edit,
    save,
} );
