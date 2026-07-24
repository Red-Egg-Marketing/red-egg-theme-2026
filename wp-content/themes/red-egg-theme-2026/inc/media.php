<?php
// add custom image sizes

add_image_size('whitepaper-poster', 280, 390, array('center', 'center'), true);
add_image_size('post-landscape', 886, 536, array('center', 'center'), true);
add_image_size('post-landscape-medium', 443, 268, array('center', 'center'), true);
add_image_size('image-text-block-small', 480, 324, array('center', 'center'), true);
add_image_size('image-text-block', 960, 740, array('center', 'center'), true);
add_image_size('hero-landscape-super-large', 2592, 900, array('center', 'center'), true);
add_image_size('hero-landscape-large', 1728, 600, array('center', 'center'), true);
add_image_size('hero-landscape-medium', 1152, 400, array('center', 'center'), true);
add_image_size('hero-landscape', 864, 300, array('center', 'center'), true);
add_image_size('medium-large', 700, 700, array('center', 'center'), true);
add_image_size('medium-landscape', 920, 460, array('center', 'center'), true);
add_image_size('medium-small', 350, 350, array('center', 'center'), true);

add_filter( 'image_size_names_choose', 'emulate_custom_sizes' );
 
function emulate_custom_sizes( $sizes ) {
    return array_merge( $sizes, array(
        'whitepaper-poster' => ('Whitepaper Poster'),
        'post-landscape' => ('Landscape'),
        'post-landscape-medium' => ('Landscape Medium'),
        'hero-landscape-large' => ('Hero Large'),
        'hero-landscape-medium' => ('Hero Medium'),
        'hero-landscape' => ('Hero'),
        'image-text-block' => ('Image & Text Block'),
        'image-text-block-small' => ('Image & Text Block Small'),
        'medium-large' => ('Medium/Large Image'),
    ) );
}