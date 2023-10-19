document.addEventListener("DOMContentLoaded", function () {
  const carousels = document.querySelectorAll(".carousel");
  if (carousels.length === 0) return;
  const setHorizontalClass = (carousel, thresholdWidth = 600) => {
    if (carousel.offsetWidth < thresholdWidth) {
      carousel.classList.add("horizontal");
    } else {
      carousel.classList.remove("horizontal");
    }
  };

  carousels.forEach((carousel) => {
    setHorizontalClass(carousel);
    const mainImage = carousel.querySelector(".carousel-main-img");
    const thumbnails = carousel.querySelectorAll(".carousel-thumbnail");

    let mainImagePath = mainImage.src.replace(/^https?:\/\/[^/]+/, "");

    if (!mainImage || thumbnails.length === 0) return;

    let currentIndex = 0;

    thumbnails.forEach((thumbnail) => {
      if (thumbnail.dataset.main === mainImagePath) {
        console.log(thumbnail.dataset.main, mainImagePath);
        thumbnail.classList.add("active");
      }
    });

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        mainImage.src = thumbnail.dataset.main;
        mainImagePath = thumbnail.dataset.main;
        currentIndex = index;
        console.log(currentIndex);
        thumbnails.forEach((innerThumbnail) => {
          innerThumbnail.classList.remove("active");
        });

        thumbnail.classList.add("active");

        // Додаємо код для центрування вибраної картинки тут
        const thumbnailContainer = carousel.querySelector(
          ".carousel-thumbnails"
        );

        const isHorizontalScroll =
          thumbnailContainer.scrollWidth > thumbnailContainer.offsetWidth;
        if (isHorizontalScroll) {
          // Горизонтальне центрування
          const thumbnailsTotalWidth = Array.from(thumbnails).reduce(
            (total, thumb) => total + thumb.offsetWidth,
            0
          );
          if (thumbnailContainer.offsetWidth < thumbnailsTotalWidth) {
            let scrollLeftPosition =
              thumbnail.offsetLeft -
              thumbnailContainer.offsetWidth / 2 +
              thumbnail.offsetWidth / 10;
            thumbnailContainer.scroll({
              left: scrollLeftPosition,
              behavior: "smooth",
            });
          }
        } else {
          // Вертикальне центрування
          const thumbnailsTotalHeight = Array.from(thumbnails).reduce(
            (total, thumb) => total + thumb.offsetHeight,
            0
          );
          if (thumbnailContainer.offsetHeight < thumbnailsTotalHeight) {
            let scrollTopPosition =
              thumbnail.offsetTop -
              thumbnailContainer.offsetHeight / 1 +
              thumbnail.offsetHeight / 20;
            thumbnailContainer.scroll({
              top: scrollTopPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });

    let isDown = false;
    let startX;
    let scrollLeft;

    const slider = carousel.querySelector(".carousel-thumbnails");
    if (!slider) return; // Перевірка, чи існує слайдер у цьому карусельному компоненті

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      slider.scrollLeft = scrollLeft - walk;
    });

    // FULL SCREEN IMAGE CAROUSEL start

    let wrapper = carousel.querySelector(".full-screen-carousel-wrapper");
    if (wrapper) {
      // Додатковий код для свайпу починається тут
      let touchStartX = 0;
      let touchEndX = 0;

      function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
      }

      function handleTouchMove(e) {
        touchEndX = e.changedTouches[0].screenX;
      }

      function handleTouchEnd() {
        if (touchEndX === touchStartX) return;
        if (touchEndX < touchStartX) {
          nextSlide(); // свайп вліво, наступний слайд
        }
        if (touchEndX > touchStartX) {
          prevSlide(); // свайп вправо, попередній слайд
        }
      }

      function showSlide(index) {
        // Знаходимо активний елемент міні-картинки за допомогою класу "active"

        const fullscreenCarousel = carousel.querySelector(
          ".full-screen-carousel"
        );
        // Клонуємо зображення з .carousel-thumbnails
        const thumbnails = carousel.querySelectorAll(".carousel-thumbnail");
        thumbnails.forEach((thumbnail) => {
          const img = document.createElement("img");
          img.src = thumbnail.dataset.full;
          img.alt = thumbnail.alt;
          img.classList.add("full-screen-carousel-item");
          if (thumbnail.classList.contains("active")) {
            img.classList.add("active");
          }
          fullscreenCarousel.appendChild(img);
        });

        // Додаємо кнопки та іконки

        const leftButton = carousel.querySelector(
          ".full-screen-carousel-button.left"
        );
        leftButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"/></svg>`;

        const rightButton = carousel.querySelector(
          ".full-screen-carousel-button.right"
        );

        rightButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/></svg>`;

        // const dotsContainer = document.createElement("div");
        // dotsContainer.classList.add("dots-container");

        const closeButton = carousel.querySelector(
          ".full-screen-carousel-close"
        );
        closeButton.innerHTML = `<use xlink:href="#close"></use>`;
        // Додавання кнопок та іконок до .full-screen-carousel-wrapper
        // fullscreenCarousel.appendChild(leftButton);
        // fullscreenCarousel.appendChild(rightButton);
        // fullscreenCarousel.appendChild(dotsContainer);
        fullscreenCarousel.appendChild(closeButton);
        wrapper.appendChild(fullscreenCarousel);
        carousel.appendChild(wrapper);

        const slides = carousel.querySelectorAll(".full-screen-carousel-item");
        if (index >= slides.length) {
          currentIndex = 0;
        } else if (index < 0) {
          currentIndex = slides.length - 1;
        }

        slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === currentIndex);
        });

        // Код для свайпа
        const activefullscreenCarousel = carousel.querySelector(
          ".full-screen-carousel-item.active"
        );
        activefullscreenCarousel.addEventListener(
          "touchstart",
          handleTouchStart,
          false
        );
        activefullscreenCarousel.addEventListener(
          "touchmove",
          handleTouchMove,
          false
        );
        activefullscreenCarousel.addEventListener(
          "touchend",
          handleTouchEnd,
          false
        );

        // Активуємо відповідну кнопку dot
        const dots = carousel.querySelectorAll(".dot-button");
        dots.forEach((dot, i) => {
          console.log("Current", currentIndex, "index", i, "Dot", dot);
          dot.classList.toggle("active", i === currentIndex);
        });
      }
      carousel.addEventListener("click", function (event) {
        const target = event.target;
        if (
          target.matches(".full-screen-carousel, .full-screen-carousel-close")
        ) {
          closeFullscreenCarousel(event);
        } else if (
          target.matches(
            ".full-screen-carousel-item, .full-screen-carousel-button, .dots-container"
          )
        ) {
          event.stopPropagation();
        }
      });

      // Додаємо кнопки dots
      // const slides = carousel.querySelectorAll(".carousel-thumbnail");
      const dotsContainer = carousel.querySelector(".dots-container");
      thumbnails.forEach((slide, index) => {
        const dotButton = document.createElement("button");
        dotButton.classList.add("dot-button");
        if (index === currentIndex) {
          dotButton.classList.add("active"); // Зробіть перший dot активним
        }
        dotButton.addEventListener("click", () => {
          currentIndex = index;
          showSlide(currentIndex);
        });
        dotsContainer.appendChild(dotButton);
      });

      let totalSlides = thumbnails.length;
      function nextSlide() {
        currentIndex++;
        if (currentIndex >= totalSlides) {
          currentIndex = 0; // якщо досягнуто останнього слайду, переходимо до першого
        }
        showSlide(currentIndex);
      }

      function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = totalSlides - 1; // якщо досягнуто першого слайду, переходимо до останнього
        }
        showSlide(currentIndex);
      }
      // Визначаємо велике зображення та додаємо обробник подій для кліку
      const carouselImage = carousel.querySelector(".carousel-main-img");

      carouselImage.addEventListener("click", () => {
        const index = Array.from(thumbnails).findIndex((thumbnail, idx) => {
          console.log(
            `Checking index ${idx}:`,
            thumbnail.dataset.main,
            mainImagePath
          );
          return thumbnail.dataset.main === mainImagePath;
        });
        // При кліку на мініатюрне зображення, встановлюємо індекс поточного слайду
        currentIndex = index;
        // Відображаємо слайд відповідно до обраного зображення
        showSlide(currentIndex);
        // Відкриваємо модальне вікно з каруселлю
        carousel
          .querySelector(".full-screen-carousel-wrapper")
          .classList.add("open");

        // Зміна властивості display на block для батьківського елементу з класом .content_item
        if (carousel.closest(".content_item")) {
          carousel.closest(".content_item").classList.add("d-block");
        }
      });

      // Додаємо обробники подій для кнопок у великому зображенні
      carousel
        .querySelector(".full-screen-carousel-button.left")
        .addEventListener("click", prevSlide);
      carousel
        .querySelector(".full-screen-carousel-button.right")
        .addEventListener("click", nextSlide);

      // Додавання обробника подій для кнопки закриття

      function closeFullscreenCarousel(event) {
        let wrapper = event.target.closest(".full-screen-carousel-wrapper");

        if (wrapper) {
          wrapper.classList.remove("open");
        }
        // Зміна властивості display на block для батьківського елементу з класом .content_item
        if (carousel.closest(".content_item")) {
          carousel.closest(".content_item").classList.remove("d-block");
        }
      }

      carousel.addEventListener("click", function (event) {
        const target = event.target;
        if (
          target.matches(".full-screen-carousel, .full-screen-carousel-close")
        ) {
          closeFullscreenCarousel(event);
        } else if (
          target.matches(
            ".full-screen-carousel-item, .full-screen-carousel-button, .dots-container"
          )
        ) {
          event.stopPropagation();
        }
      });
    }

    // FULL SCREEN IMAGE CAROUSEL end
  });

  // Додавання класу horizontal з дебаунсингом
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      carousels.forEach((carousel) => {
        setHorizontalClass(carousel);
      });
      // applyCarouselLogic();
    }, 250); // Затримка в мілісекундах
  });
});
