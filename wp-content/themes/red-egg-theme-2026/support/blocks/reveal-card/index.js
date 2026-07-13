/**
 * Reveal Card Block (parent)
 *
 * Click-to-flip card used inside Text Cards Grid.
 * Front + back are separate child blocks (InnerBlocks),
 * each with its own content. A toggle button flips the
 * card on click; long back content auto-scrolls.
 *
 *    ____          _   _____
 *   |  _ \ ___  __| | | ____|__ _  __ _
 *   | |_) / _ \/ _` | |  _| / _` |/ _` |
 *   |  _ <  __/ (_| | | |__| (_| | (_| |
 *   |_| \_\___|\__,_| |_____\__, |\__, |
 *                            |___/ |___/
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/reveal-card', {
    apiVersion: 2,
    title: __( 'Reveal Card', 'red-egg' ),
    description: __( 'Card with a front and back. Click the button to flip; long back content auto-scrolls.', 'red-egg' ),
    icon: 'flip-horizontal',
    category: 'layout',
    parent: [ 'red-egg-block/text-cards-grid' ],
    keywords: [ __( 'card', 'red-egg' ), __( 'flip', 'red-egg' ), __( 'reveal', 'red-egg' ), __( 'service', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {},
    edit,
    save,
} );
