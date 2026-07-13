/**
 * Numbered List Items Wrapper Block
 *
 * Child of numbered-list. Wraps the numbered-list-item
 * grandchildren for independent column styling/stacking.
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

registerBlockType( 'red-egg-block/numbered-list-items', {
    apiVersion: 2,
    title: __( 'Numbered List Items Wrapper', 'red-egg' ),
    description: __( 'Container for numbered list items within the numbered list block.', 'red-egg' ),
    icon: 'editor-ol',
    category: 'layout',
    parent: [ 'red-egg-block/numbered-list' ],
    supports: { anchor: false },
    attributes: {},
    edit,
    save,
} );
