/**
 * Team Members Block
 *
 * Curated GS Team grid. Pick which team members appear and in what
 * order. Layout, columns and popup behaviour still come from a saved
 * GS Team shortcode -- the block is server-rendered in support/blocks.php
 * by wrapping [gsteam id=N] and swapping in the chosen members through
 * the plugin's gs_team_wp_query_args filter.
 *
 * Intended to sit inside Shortcode Section (or any section wrapper),
 * so it carries no background / padding / margin of its own.
 */

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';

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
        blockId: {
            type: 'string',
        },
    },
    edit,
    save: () => null,
} );
