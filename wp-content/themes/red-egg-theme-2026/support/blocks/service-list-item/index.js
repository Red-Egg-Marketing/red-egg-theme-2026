/**
 * Service List Item Block
 *
 * Dark gray bar with service title (left),
 * arrow icon (center), and description (right).
 * Link URL configured via InspectorControls.
 * Child of service-list.
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

registerBlockType( 'red-egg-block/service-list-item', {
    apiVersion: 2,
    title: __( 'Service List Item', 'red-egg' ),
    description: __( 'Dark bar with service title, description, and optional link.', 'red-egg' ),
    icon: 'arrow-right-alt',
    category: 'layout',
    parent: [ 'red-egg-block/service-list' ],
    keywords: [ __( 'service', 'red-egg' ), __( 'item', 'red-egg' ), __( 'row', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        title: {
            type: 'string',
            default: '',
        },
        description: {
            type: 'string',
            default: '',
        },
        linkUrl: {
            type: 'string',
            default: '',
        },
        linkTarget: {
            type: 'boolean',
            default: false,
        },
    },
    edit,
    save,
} );
