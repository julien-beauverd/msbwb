<?php
if (!defined('ABSPATH')) { exit; }

add_action('wp_enqueue_scripts', function () {

  // Custom CSS
  wp_enqueue_style(
    'msbwb-custom',
    get_stylesheet_directory_uri() . '/assets/css/custom.css',
    [],
    '1.0.0'
  );

  // Only load carousel assets on homepage
  if (!is_front_page()) {
    return;
  }

  // Swiper
wp_enqueue_style(
  'swiper',
  'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css',
  [],
  '10.0.0'
);

wp_enqueue_script(
  'swiper',
  'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js',
  [],
  '10.0.0',
  true
);


  // Your carousel JS
  wp_enqueue_script(
    'msbwb-home-carousels',
    get_stylesheet_directory_uri() . '/assets/js/msbwb-home-carousels.js',
    ['swiper'],
    '1.0.0',
    true
  );
});
