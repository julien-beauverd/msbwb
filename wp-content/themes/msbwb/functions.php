<?php
if (!defined('ABSPATH')) {
  exit;
}

add_action('wp_enqueue_scripts', function () {

  // Global custom CSS
  wp_enqueue_style(
    'msbwb-custom',
    get_stylesheet_directory_uri() . '/assets/css/custom.css',
    [],
    '1.0.0'
  );

  wp_enqueue_style(
    'msbwb-custom-utilities',
    get_stylesheet_directory_uri() . '/assets/css/custom-utilities.css',
    ['msbwb-custom'],
    '1.0.0'
  );

  // Archive filters JS only on /podcasts/
  if (is_page('podcasts')) {
    wp_enqueue_script(
      'msbwb-podcasts-filters',
      get_stylesheet_directory_uri() . '/assets/js/podcasts-filters.js',
      [],
      '1.0.0',
      true
    );

    wp_enqueue_style(
      'msbwb-custom-podcasts',
      get_stylesheet_directory_uri() . '/assets/css/custom-podcasts.css',
      ['msbwb-custom'],
      '1.0.0'
    );
  }

  // Archive filters JS only on /about/
  if (is_page('about')) {
    wp_enqueue_style(
      'msbwb-custom-about',
      get_stylesheet_directory_uri() . '/assets/css/custom-about.css',
      ['msbwb-custom'],
      '1.0.0'
    );
  }

  // Homepage only
  if (is_front_page()) {
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

    wp_enqueue_script(
      'msbwb-home-carousels',
      get_stylesheet_directory_uri() . '/assets/js/msbwb-home-carousels.js',
      ['swiper'],
      '1.0.0',
      true
    );
  }
});
