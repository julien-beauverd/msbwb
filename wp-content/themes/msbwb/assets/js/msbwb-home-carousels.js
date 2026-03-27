(function () {
  function initOne(selector, reverse) {
    const el = document.querySelector(selector);
    if (!el) return;

    // IMPORTANT: si tu refresh souvent, évite double init
    if (el.classList.contains("msbwb-inited")) return;
    el.classList.add("msbwb-inited");

    new Swiper(el, {
      loop: true,
      centeredSlides: false,
      watchSlidesProgress: true,

      slidesPerView: 3,
      spaceBetween: 32,
      breakpoints: {
        0: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 3, spaceBetween: 32 },
      },

      speed: 14000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: reverse,
        pauseOnMouseEnter: true,
      },

      allowTouchMove: true,
      grabCursor: true,
    });
  }

  window.addEventListener("load", () => {
    if (!window.Swiper) return;
    initOne(".msbwb-swiper-books", false);
    initOne(".msbwb-swiper-records", true);
  });
})();