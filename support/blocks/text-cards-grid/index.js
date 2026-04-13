/**
 * Text Cards Grid Block
 * 
 * Container section: header content (label, heading, description)
 * via InnerBlocks, plus a row of text-card child blocks.
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

registerBlockType( 'red-egg-block/text-cards-grid', {
    apiVersion: 2,
    title: __( 'Text Cards Grid', 'red-egg' ),
    description: __( 'Section with heading and a grid of service cards with icons.', 'red-egg' ),
    icon: 'grid-view',
    category: 'layout',
    keywords: [ __( 'cards', 'red-egg' ), __( 'services', 'red-egg' ), __( 'grid', 'red-egg' ) ],
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
    },
    edit,
    save,
} );
