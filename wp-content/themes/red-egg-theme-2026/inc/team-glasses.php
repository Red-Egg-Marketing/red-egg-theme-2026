<?php
/**
 * Team "Glassify" Easter Egg
 *
 *   ( •_•)
 *   ( •_•)>⌐■-■
 *   (⌐■_■)   ...deal with it.
 *
 * Type any team member's first name anywhere on the site to teleport to their
 * bio page with sunglasses dropped over their face. The first-name -> bio-URL
 * map is built from the `gs_team` posts and handed to JS via wp_localize_script.
 *
 * Drop-in: place this file in the theme's /inc/ directory and require it from
 * functions.php:
 *
 *     // Team "Glassify" Easter Egg
 *     require get_template_directory() . '/inc/team-glasses-easter-egg.php';
 *
 * Also drop the sunglasses graphic at: {theme}/img/sunglasses.gif
 *
 * @package Red_Egg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Build (and cache) the first-name -> [ bio URLs ] map from gs_team posts.
 *
 * Keyed on the lowercased, letters-only first word of each member's title.
 * The value is an array so that shared first names cycle rather than collide.
 *
 * @return array<string, string[]>
 */
function red_egg_team_glasses_map() {
	$cached = get_transient( 'red_egg_team_glasses_map' );
	if ( false !== $cached ) {
		return $cached;
	}

	$team = get_posts(
		[
			'post_type'      => 'gs_team',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => 'menu_order title',
			'order'          => 'ASC',
			'no_found_rows'  => true,
		]
	);

	$map = [];
	foreach ( $team as $member ) {
		$first = strtok( trim( $member->post_title ), ' ' );
		$first = strtolower( preg_replace( '/[^A-Za-z]/', '', (string) $first ) );
		if ( '' === $first ) {
			continue;
		}
		if ( ! isset( $map[ $first ] ) ) {
			$map[ $first ] = [];
		}
		$map[ $first ][] = get_permalink( $member->ID );
	}

	set_transient( 'red_egg_team_glasses_map', $map, DAY_IN_SECONDS );
	return $map;
}

/**
 * Bust the cached map whenever a team member is saved.
 */
function red_egg_team_glasses_flush() {
	delete_transient( 'red_egg_team_glasses_map' );
}
add_action( 'save_post_gs_team', 'red_egg_team_glasses_flush' );

/**
 * Enqueue the easter-egg script (with the localized name map) and the inline
 * sunglasses overlay CSS. The CSS is injected inline so the gif URL resolves
 * from the theme's /img/ directory regardless of where styles are served from.
 */
function red_egg_team_glasses_assets() {
	$map = red_egg_team_glasses_map();
	if ( empty( $map ) ) {
		return; // No team members — nothing to glassify.
	}

	wp_register_script(
		'red-egg-team-glasses',
		get_template_directory_uri() . '/support/js/wear-sunglasses-at-night.js',
		[],
		'v1.0.0',
		true
	);
	wp_localize_script( 'red-egg-team-glasses', 'REDEGG_GLASSES', [ 'members' => $map ] );
	wp_enqueue_script( 'red-egg-team-glasses' );

	wp_register_style( 'red-egg-team-glasses', false, [], 'v1.0.0' );
	wp_enqueue_style( 'red-egg-team-glasses' );
}
add_action( 'wp_enqueue_scripts', 'red_egg_team_glasses_assets' );