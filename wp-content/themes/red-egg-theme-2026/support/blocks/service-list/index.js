/**
 * Service List Block
 *
 * Parent container with heading and repeatable
 * service-list-item children. Used on service pages
 * (Branding, Web, etc.) to list sub-services.
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

registerBlockType( 'red-egg-block/service-list', {
    apiVersion: 2,
    title: __( 'Service List', 'red-egg' ),
    description: __( 'List of service items with dark bar styling. Heading + repeatable service rows.', 'red-egg' ),
    icon: 'list-view',
    category: 'layout',
    keywords: [ __( 'services', 'red-egg' ), __( 'list', 'red-egg' ), __( 'branding', 'red-egg' ), __( 'offerings', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        bgColor: {
            type: 'string',
            default: '',
        },
        bgSlug: {
            type: 'string',
            default: '',
        },
        image: {
            type: 'object',
            default: {
                url: '', width: '', height: '',
                repeat: 'no-repeat', attachment: 'scroll',
                position: 'center center', size: '', sizekey: 'cover',
                unit: '%', bgkeyword: 'keyword',
                positionX: '', positionY: '', bgunit: 'px',
            },
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
