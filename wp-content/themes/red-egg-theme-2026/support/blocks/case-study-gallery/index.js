/**
 * Case Study Gallery Block
 *
 * Section with label + heading and a core/gallery
 * for showcasing project images. Used on case study
 * single pages for branding, web, etc. deliverables.
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

registerBlockType( 'red-egg-block/case-study-gallery', {
    apiVersion: 2,
    title: __( 'Case Study Gallery', 'red-egg' ),
    description: __( 'Section with label, heading, and image gallery for case study deliverables.', 'red-egg' ),
    icon: 'format-gallery',
    category: 'layout',
    keywords: [ __( 'gallery', 'red-egg' ), __( 'case study', 'red-egg' ), __( 'images', 'red-egg' ), __( 'portfolio', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: 'eggshell',
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
        blockId: {
            type: 'string',
        },
    },
    edit,
    save,
} );
