<?php

function get_social_links_icons() {
	$icons = [
        'icons' => get_field('icons', 'options'),
    ];

    if (sizeof($icons) == 0 ) return; 

    $html = '<ul class="site__social">';

    foreach($icons['icons'] as $icon) {
        $src = $icon['social']['link'];
        $class = $icon['social']['icon_class'];
            $html .= '<li><a href="' . $src . '" class="fa-brands fa-' . $class . '" target="_blank"></a></li>';
     }

     $html .= '</ul>';
     return $html;

}
add_shortcode( 'get_social_shortcode', 'get_social_links_icons'); 