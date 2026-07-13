/**
 * Color Palette Block
 *
 * Section with label + heading + grid of
 * color-swatch children. Used on case study
 * pages to showcase brand color palettes.
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

registerBlockType( 'red-egg-block/color-palette', {
    apiVersion: 2,
    title: __( 'Color Palette', 'red-egg' ),
    description: __( 'Section with label, heading, and grid of color swatches.', 'red-egg' ),
    icon: 'admin-appearance',
    category: 'layout',
    keywords: [ __( 'color', 'red-egg' ), __( 'palette', 'red-egg' ), __( 'swatch', 'red-egg' ), __( 'brand', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
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
