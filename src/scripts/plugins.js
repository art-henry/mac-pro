if (document.querySelector(".carousel")) {
  const mainImage = document.querySelector(".carousel-main-img");
  const thumbnails = document.querySelectorAll(".carousel-thumbnail");
  let currentIndex = 0;

  thumbnails.forEach((thumbnail) => {
    if (thumbnail.src === mainImage.src) {
      thumbnail.classList.add("active");
    }
  });

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      mainImage.src = thumbnail.src;
      currentIndex = index;

      thumbnails.forEach((innerThumbnail) => {
        innerThumbnail.classList.remove("active");
      });

      thumbnail.classList.add("active");
    });
  });

  let isDown = false;
  let startX;
  let scrollLeft;

  const slider = document.querySelector(".carousel-thumbnails");

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

  // prevBtn.addEventListener("click", () => {
  //   currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
  //   mainImage.src = thumbnails[currentIndex].src;
  // });

  // nextBtn.addEventListener("click", () => {
  //   currentIndex = (currentIndex + 1) % thumbnails.length;
  //   mainImage.src = thumbnails[currentIndex].src;
  // });
}
