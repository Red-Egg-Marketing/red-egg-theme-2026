/**
 * Filter Posts Block
 *
 * Dynamic filterable grid of blog posts.
 * Editable hero (nested hero block) above the grid,
 * taxonomy filter dropdowns built from ALL registered
 * post taxonomies, with per-taxonomy visibility toggles
 * and shareable query-string state.
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

registerBlockType( 'red-egg-block/filter-posts', {
    apiVersion: 2,
    title: __( 'Filterable Posts', 'red-egg' ),
    description: __( 'Editable hero + dynamic grid of posts with taxonomy filters.', 'red-egg' ),
    icon: 'grid-view',
    category: 'layout',
    keywords: [ __( 'posts', 'red-egg' ), __( 'filter', 'red-egg' ), __( 'blog', 'red-egg' ), __( 'insights', 'red-egg' ) ],
    supports: { anchor: true },
    attributes: {
        // Slugs of taxonomies to HIDE from the filter bar (all shown by default).
        hiddenTaxonomies: {
            type: 'array',
            default: [],
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
