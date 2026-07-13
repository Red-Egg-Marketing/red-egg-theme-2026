<?php
/**
 * Custom REST API Endpoints
 *
 * Endpoints:
 *   /red-egg/v2/resources     → red_egg_return_resources
 *   /red-egg/v2/case-studies  → red_egg_return_case_studies
 *   /red-egg/v2/posts         → red_egg_return_posts
 *   /red-egg/v2/industries    → red_egg_return_industries
 *   /red-egg/v2/reviews       → red_egg_return_reviews
 *   /red-egg/v2/games         → red_egg_return_games
 *
 * @package Red_Egg
 */


// ============================================
//  Helper: Return taxonomies for post types
// ============================================

function red_egg_return_taxonomies( $post_types, $return_post_types = false ) {

	$request  = new WP_REST_Request( 'GET', '/wp/v2/types' );
	$response = rest_do_request( $request );
	$server   = rest_get_server();
	$taxes    = $server->response_to_data( $response, false );
	$tax_array  = [];
	$post_names = [];

	foreach ( $post_types as $post_type ) {
		$type = $taxes[ $post_type ];

		if ( $type ) {
			if ( $return_post_types == true ) {
				$post_name = $type['name'];
				$post_slug = $type['slug'];
				$post_names[ $post_type ]['name'] = $post_name;
				$post_names[ $post_type ]['slug'] = $post_slug;
			}
			$type_tax = $type['taxonomies'];
			for ( $x = 0; $x < sizeof( $type_tax ); $x++ ) {
				$tax = $type_tax[ $x ];
				if ( ! in_array( $tax, $tax_array ) && $tax != 'custom_order' ) {
					$tax_array[] = $tax;
				}
			}
		}
	}

	sort( $tax_array );

	return $return_post_types == false ? $tax_array : [ $tax_array, $post_names ];
}


// ============================================
//  Helper: Return post objects with taxonomies
// ============================================

function red_egg_return_post_objects( $post_types ) {

	$request  = new WP_REST_Request( 'GET', '/wp/v2/types' );
	$response = rest_do_request( $request );
	$server   = rest_get_server();
	$taxes    = $server->response_to_data( $response, false );
	$tax_array = [];

	foreach ( $post_types as $post_type ) {
		$type     = $taxes[ $post_type ];
		$type_tax = $type['taxonomies'];
		for ( $x = 0; $x < sizeof( $type_tax ); $x++ ) {
			$tax = $type_tax[ $x ];
			if ( ! in_array( $tax, $tax_array ) ) {
				$tax_array[] = $tax;
			}
		}
	}

	sort( $tax_array );

	return $tax_array;
}


// ============================================
//  Helper: Build post + taxonomy data array
// ============================================

function red_egg_build_post_tax_array( $posts, $tax, $post_types = [] ) {

	if ( sizeof( $tax ) > 0 ) {
		$len        = sizeof( $tax );
		$post_array = [];
		$tax_array  = [];

		foreach ( $posts as $post ) {
			$id = $post->ID;

			$post->link         = get_permalink( $id );
			$post->post_excerpt = wp_trim_words( $post->post_excerpt, 25, '...' );
			$post->taxonomies   = [];
			$post_type  = get_post_type( $id );
			$post_label = get_post_type_object( $post_type );
			$post_label = ( $post_type == 'case-study' || $post_type == 'branding-project' || $post_type == 'website' )
				? $post_label->labels->singular_name
				: get_the_date( 'n.j.y', $id );
			$post->label = $post_label;
			$thumbnail   = get_the_post_thumbnail_url( $id, 'post-landscape' ) != false
				? get_the_post_thumbnail_url( $id, 'post-landscape' )
				: get_the_post_thumbnail_url( $id, 'thumbnail' );
			$post->media_url = $thumbnail;

			for ( $x = 0; $x < $len; $x++ ) {
				$c_tax = $tax[ $x ];
				if ( $c_tax == 'post_tag' ) continue;
				$post_taxes = get_the_terms( $id, $c_tax );

				if ( ! empty( $post_taxes ) ) {
					$singular   = get_object_taxonomies( $post_type, 'object' );
					$sing_label = $singular[ $c_tax ]->labels->singular_name;

					foreach ( $post_taxes as $post_tax ) {
						$term_slug = $post_tax->slug;
						$term_id   = $post_tax->term_id;
						$term_tax  = $post_tax->taxonomy;
						$term_name = $post_tax->name;
						$tax_array[ $sing_label ][ $term_name ]['tax_name']  = $term_name;
						$tax_array[ $sing_label ][ $term_name ]['tax_id']    = $term_id;
						$tax_array[ $sing_label ][ $term_name ]['tax_slug']  = $term_slug;
						$tax_array[ $sing_label ][ $term_name ]['taxonomy']  = $term_tax;
						$post->taxonomies[ $sing_label ][] = [
							'term_name' => $term_name,
							'term_id'   => $term_id,
							'taxonomy'  => $term_tax,
						];
					}
				}
			}

			$post_array['resources'][] = $post;
		}

		return [ $post_array, $tax_array, $post_types ];

	} else {
		return false;
	}
}


// ============================================
//  Resources Callback
//  Returns: [ post_array, tax_array, post_types ]
// ============================================

function red_egg_return_resources() {
	$post_types = [ 'post' ];

	$get    = $_GET;
	$offset = isset( $get['offset'] ) ? $get['offset'] : 0;

	$args = [
		'post_type'      => $post_types,
		'post_status'    => 'publish',
		'posts_per_page' => -1,
	];

	$query = new WP_Query( $args );

	if ( $query->have_posts() ) {
		$result = $query->posts;

		$taxes     = red_egg_return_taxonomies( $post_types );
		$resources = red_egg_build_post_tax_array( $result, $taxes );

		wp_reset_postdata();

		return $resources;
	}
}


// ============================================
//  Case Studies Callback
//  Returns: [ post_array, tax_array, post_types ]
//  Supports: ?industry=slug filter
// ============================================

function red_egg_return_case_studies( $data ) {

	$post_types = [ 'case-study', 'branding-project', 'website' ];
	$get = $_GET;

	$offset = isset( $get['offset'] ) ? $get['offset'] : 0;

	$args = [
		'post_type'      => $post_types,
		'post_status'    => 'publish',
		'posts_per_page' => -1,
	];

	// Filter by industry taxonomy if provided
	$industry = isset( $get['industry'] ) ? sanitize_text_field( $get['industry'] ) : '';
	if ( ! empty( $industry ) ) {
		$args['tax_query'] = [
			[
				'taxonomy' => 'industry',
				'field'    => 'slug',
				'terms'    => $industry,
			],
		];
	}

	$query = new WP_Query( $args );

	if ( $query->have_posts() ) {
		$result = $query->posts;

		$taxes       = red_egg_return_taxonomies( $post_types, true );
		$tax_array   = $taxes[0];
		$types_array = $taxes[1];

		$resources = red_egg_build_post_tax_array( $result, $tax_array, $types_array );

		wp_reset_postdata();

		return $resources;
	}
}


// ============================================
//  Case Study Stat Block Helper
// ============================================

function red_egg_case_study_stat_block( $id ) {
	if ( $id != null ) {
		$content = get_the_content( $id );
		$blocks  = parse_blocks( $content );
		$html    = '';
		foreach ( $blocks as $key => $block ) {
			$name = $block['blockName'];

			if ( $name == 'red-egg-blocks/case-study' ) {
				$inner_html = render_block( $block );
				$html       = $inner_html;
				break;
			}
		}

		return $html;
	}
}


// ============================================
//  Posts Callback (flexible, multi-param)
//  Supports: category, tag, author, offset,
//  custom_tax, tax_name, color, ppp, post_type,
//  date, with_thumb, html mode
// ============================================

function red_egg_return_posts( $data ) {

	$get        = $_GET;
	$post_types = [];
	$cats       = isset( $get['category'] ) ? explode( ',', $get['category'] ) : false;
	$tags       = isset( $get['tag'] ) ? $get['tag'] : false;
	$html       = isset( $get['html'] ) ? $get['html'] : false;
	$author     = isset( $get['author'] ) ? $get['author'] : false;
	$offset     = isset( $get['offset'] ) ? $get['offset'] : 0;
	$custom_tax = isset( $get['custom_tax'] ) ? explode( ',', $get['custom_tax'] ) : false;
	$tax_type   = isset( $get['tax_name'] ) ? $get['tax_name'] : false;
	$meta_color = isset( $get['color'] ) ? $get['color'] : false;
	$posts_per_page = isset( $get['ppp'] ) ? $get['ppp'] : 21;
	$pt         = isset( $get['post_type'] ) ? explode( ',', $get['post_type'] ) : false;
	$date       = isset( $get['date'] ) ? boolval( $get['date'] ) : true;
	$with_thumb = isset( $get['with_thumb'] ) ? boolval( $get['with_thumb'] ) : false;

	if ( $cats != false || $tags != false || $author != false ) {
		$post_types[] = 'post';
	}

	if ( $pt != false ) {
		$post_types = $pt;
	}

	$args = [
		'post_type'      => $post_types,
		'post_status'    => 'publish',
		'posts_per_page' => $posts_per_page,
		'offset'         => $offset,
	];

	if ( $cats != false ) {
		$args['cat'] = $cats;
	}

	if ( $tags != false ) {
		$args['tag_id'] = $tags;
	}

	if ( $author != false ) {
		$args['author'] = $author;
	}

	if ( $custom_tax != false && $tax_type != false ) {
		$args['tax_query'] = [
			'relation' => 'AND',
			[
				'taxonomy' => $tax_type,
				'field'    => 'term_id',
				'terms'    => $custom_tax,
			],
		];
	}

	$posts = $html == false ? [] : '';
	$query = new WP_Query( $args );

	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			$id         = get_the_ID();
			$post_type  = get_post_type( $id );
			$post_label = get_post_type_object( $post_type );
			$post_label = ( $post_type == 'case-study' || $post_type == 'branding-project' || $post_type == 'website' )
				? $post_label->labels->singular_name
				: get_the_date( 'n.j.y', $id );
			$label = ( $post_type == 'case-study' || $post_type == 'branding-project' || $post_type == 'website' )
				? 'case-study'
				: '';

			if ( $html == false ) {
				$post    = $query->post;
				$postObj = new stdClass;
				$postObj->ID       = $id;
				$postObj->title    = $post->post_title;
				$postObj->label    = $post_label;
				$postObj->excerpt  = wp_trim_words( $post->post_content, 25, '...' );
				$postObj->link     = get_the_permalink( $id );
				$thumbnail         = get_the_post_thumbnail_url( $id, 'post-landscape' ) != false
					? get_the_post_thumbnail_url( $id, 'post-landscape' )
					: get_the_post_thumbnail_url( $id, 'thumbnail' );
				$postObj->featured_image = $thumbnail;
				$date          = $date == true ? get_the_date( 'n.j.y', $id ) : '';
				$postObj->date = $date;
				$posts[]       = $postObj;
			} elseif ( $html == true ) {
				$posts .= red_egg_resource_card( $id, false, $date, $with_thumb, $meta_color, $label, $post_label );
			}
		}

		wp_reset_postdata();
	}

	return $posts;
}


// ============================================
//  Resource Card (PHP rendered HTML)
// ============================================

function red_egg_resource_card( $id, $cats = false, $date = true, $with_thumb = true, $meta_color = 'red', $post_label = '', $post_type = false ) {
	if ( $id != null ) {
		$permalink = get_the_permalink( $id );
		$title     = get_the_title( $id );
		$excerpt   = wp_trim_words( get_the_excerpt( $id ), 40 );
		$date      = $date == true ? get_the_date( 'n.j.y', $id ) : '';
		$date      = $date != '' ? '<date class="' . $meta_color . '">' . $date . '</date>' : '';
		$terms     = $cats == true ? red_egg_posts_topics_list( $id, 'category' ) : false;
		$thumbnail = get_the_post_thumbnail_url( $id, 'post-landscape' ) != false
			? get_the_post_thumbnail_url( $id, 'post-landscape' )
			: get_the_post_thumbnail_url( $id, 'thumbnail' );

		$html  = '<div class="resource-card ' . $post_label . '">';
		$html .= '<div class="resource-extra">';
		$html .= '<a href="' . $permalink . '">';
		$html .= '<div class="cont-wrap">';
		if ( $thumbnail != '' && $with_thumb == true ) {
			$html .= '<div class="image-cont">';
			$html .= '<picture>';
			$html .= '<source type="image/webp" srcset="' . $thumbnail . '.webp">';
			$html .= '<img class="resource-img" src="' . $thumbnail . '" />';
			$html .= '</picture>';
			$html .= '</div>';
		}
		$html .= '<div class="content">';
		$html .= $terms;
		$html .= $date;
		$html .= $post_type == true ? '<h4 class="tax-item">' . $post_type . '</h4>' : '';
		$html .= '<h3 class="resource-title">' . $title . '</h3>';
		$html .= '<p class="resource-excerpt">' . $excerpt . '</p>';
		$html .= '</div>';
		$html .= '<button class="wp-button is-style-' . $meta_color . '-arrow">Read More</button>';
		$html .= '</div>';
		$html .= '</a>';
		$html .= '</div>';
		$html .= '</div>';

		return $html;
	}
}


// ============================================
//  Industries Taxonomy Terms
// ============================================

function red_egg_return_industries( $request ) {
	$terms = get_terms( [
		'taxonomy'   => 'industry',
		'hide_empty' => true,
		'orderby'    => 'name',
		'order'      => 'ASC',
	] );

	$industries = [];

	if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
		foreach ( $terms as $term ) {
			$industries[] = [
				'id'    => $term->term_id,
				'name'  => $term->name,
				'slug'  => $term->slug,
				'count' => $term->count,
			];
		}
	}

	return rest_ensure_response( $industries );
}


// ============================================
//  Reviews (from WP FB Reviews plugin table)
// ============================================

function red_egg_return_reviews() {
	global $wpdb;

	$results = $wpdb->get_results(
		"
			SELECT id, reviewer_name, review_text, rating, type, userpic, from_url_review, company_name, company_title
			FROM {$wpdb->prefix}wpfb_reviews
		", OBJECT
	);

	return $results;
}


// ============================================
//  Games Leaderboard
// ============================================

function red_egg_return_games() {
	global $wpdb;

	$results = $wpdb->get_results(
		"
			SELECT name, score
			FROM {$wpdb->prefix}game
			WHERE score > 0
			ORDER BY score desc
			LIMIT 10
		", OBJECT
	);

	return $results;
}


// ============================================
//  Register All Routes
// ============================================

add_action( 'rest_api_init', function () {

	// Resources (returns taxonomy-enriched post array)
	register_rest_route( 'red-egg/v2', '/resources/', [
		'methods'             => 'GET',
		'callback'            => 'red_egg_return_resources',
		'permission_callback' => '__return_true',
	] );

	// Case Studies (supports ?industry=slug)
	register_rest_route( 'red-egg/v2', '/case-studies/', [
		'methods'             => 'GET',
		'callback'            => 'red_egg_return_case_studies',
		'permission_callback' => '__return_true',
	] );

	// Posts (flexible multi-param endpoint)
	register_rest_route( 'red-egg/v2', '/posts/', [
		'methods'             => 'GET',
		'callback'            => 'red_egg_return_posts',
		'permission_callback' => '__return_true',
	] );

	// Industries taxonomy terms
	register_rest_route( 'red-egg/v2', '/industries/', [
		'methods'             => 'GET',
		'callback'            => 'red_egg_return_industries',
		'permission_callback' => '__return_true',
	] );

	// Reviews (WP FB Reviews plugin)
	register_rest_route( 'red-egg/v2', '/reviews/', [
		'methods'             => 'GET',
		'callback'            => 'red_egg_return_reviews',
		'permission_callback' => '__return_true',
	] );

	// Games leaderboard
	register_rest_route( 'red-egg/v2', '/games/', [
		'methods'             => 'GET',
		'callback'            => 'red_egg_return_games',
		'permission_callback' => '__return_true',
	] );

} );
