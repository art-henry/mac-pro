// import Swiper JS
import Swiper from "swiper/bundle";

if (document.querySelector(".swiper")) {
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,

    slidesPerView: 4,
    direction: "horizontal",
    // freeMode: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next",
      // prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: {
        direction: "vertical",
        spaceBetween: 20,
      },
      // 1200: {
      //   spaceBetween: 20,
      // },
    },
  });

  var swiper2 = new Swiper(".mySwiper2", {
    navigation: {
      nextEl: ".swiper-button-next",
      // prevEl: ".swiper-button-prev",
    },
    loop: true,
    spaceBetween: 10,
    direction: "horizontal",
    thumbs: {
      swiper: swiper,
    },
  });

  swiper.slideNext();
  swiper2.slideNext();
}
// Видаляємо блок else з return
