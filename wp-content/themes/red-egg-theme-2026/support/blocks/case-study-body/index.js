/**
 * Case Study Body Block
 *
 * Editable label (CASE STUDY) + free InnerBlocks
 * (headings + paragraphs, e.g. The Challenge /
 * Solution / Results) with optional corner blob.
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

registerBlockType( 'red-egg-block/case-study-body', {
    apiVersion: 2,
    title: __( 'Case Study Body', 'red-egg' ),
    description: __( 'Label + free content sections (Challenge / Solution / Results) with optional blob.', 'red-egg' ),
    icon: 'text-page',
    category: 'layout',
    keywords: [ __( 'case study', 'red-egg' ), __( 'challenge', 'red-egg' ), __( 'solution', 'red-egg' ), __( 'results', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        label: {
            type: 'string',
            default: 'CASE STUDY',
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
        blobEnabled: {
            type: 'boolean',
            default: false,
        },
        blobShape: {
            type: 'string',
            default: 'shape1',
        },
        blobSpeed: {
            type: 'number',
            default: 8,
        },
        blobPosition: {
            type: 'string',
            default: 'top-right',
        },
    },
    edit,
    save,
} );
