/**
 * Numbered List Items Block
 *
 * Navy background section with header-intro (left)
 * and repeatable numbered-list-item children (right).
 * Uses NumberBadge component for manual number/letter badges.
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

registerBlockType( 'red-egg-block/numbered-list', {
    apiVersion: 2,
    title: __( 'Numbered List Items', 'red-egg' ),
    description: __( 'Navy section with header-intro and numbered items using NumberBadge component.', 'red-egg' ),
    icon: 'editor-ol',
    category: 'layout',
    keywords: [ __( 'numbered', 'red-egg' ), __( 'list', 'red-egg' ), __( 'why', 'red-egg' ) ],
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
