<?php

use Roots\Sage\Assets;
?>

<header class="banner">
  <div class="container-fluid">
    <div class="row">
      <div class="col-6"><a class="brand" href="<?= esc_url(home_url('/')); ?>"><img src="<?= Assets\asset_path('assets/images/logo.png'); ?>" alt="<?php bloginfo('name'); ?>" class="animated fadeInLeft duration2" /></a>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <?php get_search_form(); ?>
        <nav class="nav-primary">
          <?php
          if (has_nav_menu('primary_navigation')) :
            wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']);
          endif;
          ?>
        </nav>
      </div>
    </div>
  </div>
</header>