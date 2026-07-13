/**
 * Text Cards Grid Block
 *
 * Container: header-intro + flip-card children.
 * Supports column count, background color, and
 * decorative background style options.
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
    description: __( 'Section with header intro and a grid of flip cards with icons.', 'red-egg' ),
    icon: 'grid-view',
    category: 'layout',
    keywords: [ __( 'cards', 'red-egg' ), __( 'services', 'red-egg' ), __( 'grid', 'red-egg' ), __( 'flip', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
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
