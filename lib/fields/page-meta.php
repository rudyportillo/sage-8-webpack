<?php

use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action('carbon_fields_register_fields', 'crb_register_page_meta');
function crb_register_page_meta()
{
  Container::make('post_meta', 'Custom Data')
    ->where('post_type', '=', 'page')
    ->show_on_page('about')
    ->set_context('side')
    ->add_fields(array(
      Field::make('text', 'crb_caption'),
      Field::make('text', 'crb_caption_location'),
    ));
}
