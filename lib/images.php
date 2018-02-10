<?php
/*
Custom Image Sizes
Uncomment as needed.
*/

// Square
// add_image_size('1-to-1_640w', 640, 640, true);
// add_image_size('1-to-1_480w', 480, 480, true);
// add_image_size('1-to-1_240w', 240, 240, true );

// 2:1
// add_image_size('2-to-1_1140w', 1140, 570, true);
// add_image_size('2-to-1_1110w', 1110, 555, true );
// add_image_size('2-to-1_640w', 640, 320, true);
// add_image_size('2-to-1_480w', 480, 240, true);
// add_image_size('2-to-1_240w', 240, 120, true );

// 16:9
// add_image_size('16-to-9_1140w', 1140, 641, true );
// add_image_size('16-to-9_1110w', 1110, 625, true );
// add_image_size('16-to-9_640w', 640, 360, true );
// add_image_size('16-to-9_480w', 480, 270, true );
// add_image_size('16-to-9_240w', 240, 135, true );

// 3:2
// add_image_size('3-to-2_1140w', 1140, 760, true );
// add_image_size('3-to-2_1110w', 1110, 740, true );
// add_image_size('3-to-2_640w', 640, 427, true );
// add_image_size('3-to-2_480w', 480, 320, true );
// add_image_size('3-to-2_240w', 240, 160, true );

// 4:3
// add_image_size('4-to-3_1140w', 1140, 855, true );
// add_image_size('4-to-3_1110w', 1110, 833, true );
// add_image_size('4-to-3_640w', 640, 480, true );
// add_image_size('4-to-3_480w', 480, 360, true );
// add_image_size('4-to-3_240w', 240, 180, true );

// Add Custom Image Sizes to Image Selector
// add_filter('image_size_names_choose', __NAMESPACE__ . '\\my_image_sizes');

function my_image_sizes($sizes)
{
    $addsizes = array(
    // "16-to-9_640w" => __( "16:9 cropped"),
    // "4-to-3_640w" => __( "4:3 cropped")
  );
    $newsizes = array_merge($sizes, $addsizes);
    return $newsizes;
}
