<header class="banner">
  <div class="container">
    <div class="col d-lg-none slideout-toggle-button">
      <button class="hamburger hamburger--spin" type="button">
        <span class="hamburger-box">
          <span class="hamburger-inner"></span>
        </span>
      </button>
    </div>
    <div class="col">
      <a class="brand" href="<?= esc_url(home_url('/')); ?>"><img src="<?= Roots\Sage\Assets\asset_path("images/logo.svg"); ?>" /></a>
    </div>
    <div class="d-none d-lg-block col">
      <nav class="nav-primary">
        <?php
        if (has_nav_menu('primary_navigation')) :
          wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']);
        endif;
        ?>
      </nav>
    </div>
  </div>
</header>
