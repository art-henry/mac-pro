document.addEventListener("DOMContentLoaded", function () {
  // Variables for back to prev page
  const transitionExists = localStorage.getItem("transitionExists");
  const backButton = document.querySelector(".ant-back.left");
  const prevPageURL = localStorage.getItem("prevPage");

  // Back to prev PAGE

  if (transitionExists) {
    // Якщо є запис про перехід, робимо кнопку видимою
    backButton.style.display = "grid";

    // Додаємо подію кліку, яка повертає на попередню сторінку
    backButton.addEventListener("click", () => {
      window.location.href = prevPageURL;
      if ((window.location.href = "/")) {
        localStorage.removeItem("transitionExists");
      }
    });
  } else {
    // Якщо немає запису, робимо кнопку невидимою
    backButton.style.display = "none";
  }
});
