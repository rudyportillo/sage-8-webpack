<?php

use Carbon_Fields\Container;
use Carbon_Fields\Field;

/*
  Theme Options
*/

add_action( 'carbon_fields_register_fields', 'crb_register_theme_options' );

function crb_register_theme_options() {
  Container::make( 'theme_options', __( 'Theme Options', 'crb' ) )
    ->add_tab( 'Contact', array(
      Field::make( 'text', 'crb_copyright', 'Company/Organization/Etc Name' )
        ->set_help_text( "name for use in the copyright statement, etc" ),
      Field::make( 'text', 'crb_address', 'Address' )
        ->set_attribute( 'placeholder', '1212 Apple Tree Ln, Walla Walla, WA 12345' )
        ->set_help_text( "Address for use in footer, copyright statement, etc" ),
      Field::make( 'text', 'crb_phone', 'Phone Number' )
        ->set_attribute( 'placeholder', '(***) ***-****' )
        ->set_help_text( "Primary contact phone number" ),
      Field::make( 'text', 'crb_email', 'E-mail' )
        ->set_attribute( 'placeholder', 'email@example.com' )
        ->set_help_text( "primary contact email address" )
    ))
    ->add_tab( 'Social', array(
      Field::make( 'text', 'crb_facebook', 'Facebook Link' ),
      Field::make( 'text', 'crb_instagram', 'Instagram Link' ),
      Field::make( 'text', 'crb_twitter', 'Twitter Link' ),
      Field::make( 'text', 'crb_youtube', 'Youtube Link' ),
      Field::make( 'text', 'crb_linkedin', 'Linked In Link' ),
    ))
    ->add_tab( 'Scripts', array(
      Field::make( 'header_scripts', 'crb_header_script' ),
      Field::make( 'footer_scripts', 'crb_footer_script' )
    ));
}
?>
