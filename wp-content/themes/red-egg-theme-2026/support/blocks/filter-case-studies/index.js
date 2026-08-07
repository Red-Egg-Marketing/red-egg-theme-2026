/**
 * Filter Case Studies Block
 *
 * Dynamic filterable grid of case studies.
 * Taxonomy filter dropdowns + ResourceCard grid.
 * Frontend hydrated via frontend.js with REST API data.
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

registerBlockType( 'red-egg-block/filter-case-studies', {
    apiVersion: 2,
    title: __( 'Filterable Case Studies', 'red-egg' ),
    description: __( 'Dynamic grid of case studies with taxonomy filters.', 'red-egg' ),
    icon: 'portfolio',
    category: 'layout',
    keywords: [ __( 'case studies', 'red-egg' ), __( 'filter', 'red-egg' ), __( 'portfolio', 'red-egg' ), __( 'work', 'red-egg' ) ],
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
        initialCount: {
            type: 'number',
            default: 9,
        },
        orderby: {
            type: 'string',
            default: 'date',
        },
        order: {
            type: 'string',
            default: 'DESC',
        },
    },
    edit,
    save,
} );
