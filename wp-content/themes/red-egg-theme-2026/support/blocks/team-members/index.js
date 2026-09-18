/**
 * Team Members Block
 *
 * Curated GS Team grid. Pick which team members appear and in what
 * order. Layout, columns and popup behaviour still come from a saved
 * GS Team shortcode -- the block is server-rendered in support/blocks.php
 * by wrapping [gsteam id=N] and swapping in the chosen members through
 * the plugin's gs_team_wp_query_args filter.
 *
 * Carries a Header Intro (InnerBlocks) above the grid. Padding and
 * margin come from the shared PaddingSelector / MarginSelector
 * components; the PHP render callback turns them into a scoped
 * <style> block on the frontend.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'red-egg-block/team-members', {
    apiVersion: 2,
    title: __( 'Team Members', 'red-egg' ),
    description: __( 'Choose and order GS Team members. Layout comes from a saved GS Team shortcode.', 'red-egg' ),
    icon: 'groups',
    category: 'layout',
    keywords: [ __( 'team', 'red-egg' ), __( 'staff', 'red-egg' ), __( 'gs team', 'red-egg' ) ],
    supports: { anchor: true, html: false },
    attributes: {
        memberIds: {
            type: 'array',
            default: [],
        },
        shortcodeId: {
            type: 'number',
            default: 1,
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
