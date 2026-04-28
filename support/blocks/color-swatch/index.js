/**
 * Color Swatch Block
 *
 * Child of color-palette. Single color swatch
 * with ColorPicker and label text.
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

registerBlockType( 'red-egg-block/color-swatch', {
    apiVersion: 2,
    title: __( 'Color Swatch', 'red-egg' ),
    description: __( 'Single color swatch with label.', 'red-egg' ),
    icon: 'art',
    category: 'layout',
    parent: [ 'red-egg-block/color-palette' ],
    supports: { anchor: false },
    attributes: {
        color: {
            type: 'string',
            default: '#024D69',
        },
        label: {
            type: 'string',
            default: '',
        },
    },
    edit,
    save,
} );
