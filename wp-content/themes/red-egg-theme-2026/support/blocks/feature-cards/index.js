/**
 * Feature Cards Block
 *
 * Dark section: editable label + heading +
 * grid of feature-card children (icon + title + body).
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

registerBlockType( 'red-egg-block/feature-cards', {
    apiVersion: 2,
    title: __( 'Feature Cards', 'red-egg' ),
    description: __( 'Dark section: single-column header + a grid of icon feature cards.', 'red-egg' ),
    icon: 'screenoptions',
    category: 'layout',
    keywords: [ __( 'features', 'red-egg' ), __( 'cards', 'red-egg' ), __( 'icons', 'red-egg' ), __( 'services', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: 'gray',
        },
        blockId: {
            type: 'string',
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
