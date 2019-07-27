<?php

use Roots\Sage\Setup;
use Roots\Sage\Wrapper;

?>

<!doctype html>
<html <?php language_attributes(); ?>>
<?php get_template_part('templates/head'); ?>

<body <?php body_class(); ?> id="<?= get_post_type() . '-' . get_queried_object()->post_name; ?>">
  <!--[if IE]>
      <div class="alert alert-warning">
        <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'sage'); ?>
      </div>
    <![endif]-->
  <div class="wrap animated fadeIn">
    <?php
    do_action('get_header');
    get_template_part('templates/header');
    ?>
    <main class="main" role="document">
      <?php include Wrapper\template_path(); ?>
    </main>
    <!-- /.main -->
    <?php if (Setup\display_sidebar()) : ?>
      <aside class="sidebar">
        <?php include Wrapper\sidebar_path(); ?>
      </aside>
      <!-- /.sidebar -->
    <?php endif; ?>
    <!-- /.content -->
    <!-- /.wrap -->
    <?php
    do_action('get_footer');
    get_template_part('templates/footer');
    wp_footer();
    ?>
  </div>
</body>

</html>