/**
 * Case Study Stats Block
 *
 * Key metrics section with label heading and
 * repeatable stat-card children in a 3-column grid.
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

registerBlockType( 'red-egg-block/case-study-stats', {
    apiVersion: 2,
    title: __( 'Case Study Stats', 'red-egg' ),
    description: __( 'Key metrics grid with stat number and description cards.', 'red-egg' ),
    icon: 'chart-bar',
    category: 'layout',
    keywords: [ __( 'stats', 'red-egg' ), __( 'metrics', 'red-egg' ), __( 'case study', 'red-egg' ), __( 'numbers', 'red-egg' ) ],
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
