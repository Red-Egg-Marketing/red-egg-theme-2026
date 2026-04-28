/**
 * Stat Card Block
 *
 * Child of case-study-stats. InnerBlocks for
 * stat number heading + description paragraph.
 * Displayed in a 3-column grid.
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

registerBlockType( 'red-egg-block/stat-card', {
    apiVersion: 2,
    title: __( 'Stat Card', 'red-egg' ),
    description: __( 'Single stat with number heading and description.', 'red-egg' ),
    icon: 'chart-bar',
    category: 'layout',
    parent: [ 'red-egg-block/case-study-stats' ],
    supports: { anchor: false, inserter: false },
    attributes: {},
    edit,
    save,
} );
