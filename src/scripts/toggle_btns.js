document.addEventListener("DOMContentLoaded", function () {
  // Func for soc_media

  // const toggleButton = document.querySelector(".toggle_icons");
  // const iconsContainer = document.querySelector(".icons_container");

  // if (toggleButton && iconsContainer) {
  //   toggleButton.addEventListener("click", function () {
  //     iconsContainer.classList.toggle("open");
  //   });
  // }

  // Func for soc_media

  const toggleButton = document.querySelector(".toggle_icons");
  const iconsContainer = document.querySelector(".icons_container");

  if (toggleButton && iconsContainer) {
    toggleButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Зупиняємо "спливання" події
      iconsContainer.classList.toggle("open"); // Перемикаємо клас open
    });

    // Подія кліку на документі
    document.addEventListener("click", function (event) {
      if (
        !iconsContainer.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        iconsContainer.classList.remove("open"); // Закриваємо меню, якщо клік поза областю iconsContainer та toggleButton
      }
    });

    // Для торкань на мобільних пристроях
    document.addEventListener("touchstart", function (event) {
      if (
        !iconsContainer.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        iconsContainer.classList.remove("open"); // Закриваємо меню, якщо торкання поза областю iconsContainer та toggleButton
      }
    });
  }

  // Show more and less Buttons

  const more_buttons = document.querySelectorAll(".show_more");
  const less_buttons = document.querySelectorAll(".show_less");

  more_buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Знаходження батьківського елемента .resize_vers
      const parent = button.closest(".resize_vers");

      if (parent) {
        parent.classList.toggle("more");

        button.textContent = parent.classList.contains("more")
          ? " —"
          : " Leer Mas...+";
      }
    });
  });

  less_buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Знаходження батьківського елемента .resize_vers
      const parent = button.closest(".resize_vers");

      if (parent) {
        parent.classList.remove("more");
        parent.querySelector(".show_more").textContent = "Leer Mas...+";
      }
    });
  });

  // Fun for toggle menu

  //   const menuItems = document.querySelectorAll(".nav_menu li.menu-item");
  //   const toggle_btn = document.querySelector(".toggle_menu");
  //   const useElement = toggle_btn.querySelector("use");

  //   let isOpen = false; // стан меню

  //   if (menuItems.length > 5) {
  //     toggle_btn.style.display = "flex";

  //     // Приховуємо всі елементи після п'ятого
  //     for (let i = menuItems.length - 2; i < menuItems.length; i++) {
  //       menuItems[i].style.display = "none";
  //     }

  //     toggle_btn.addEventListener("click", () => {
  //       const menu = document.querySelector(".nav_menu");

  //       if (!isOpen) {
  //         menu.style.position = "absolute";
  //         menu.style.left = "0";
  //         menu.style.right = "0";
  //         menu.style.top = "0";
  //         menu.style.backgroundColor = "white";
  //         menu.style.zIndex = "1000";

  //         // Показуємо приховані елементи
  //         for (let i = menuItems.length - 2; i < menuItems.length; i++) {
  //           menuItems[i].style.display = "flex";
  //         }

  //         useElement.setAttribute("xlink:href", "#close"); // Змінюємо іконку на 'close'

  //         isOpen = true; // змінюємо стан меню на відкрите
  //       } else {
  //         // Встановлюємо стилі назад на значення з CSS
  //         menu.style.position = null;
  //         menu.style.left = null;
  //         menu.style.right = null;
  //         menu.style.top = null;
  //         menu.style.backgroundColor = null;
  //         menu.style.zIndex = null;
  //         // тут ви можете встановити стилі для приховування меню
  //         for (let i = menuItems.length - 2; i < menuItems.length; i++) {
  //           menuItems[i].style.display = "none";
  //         }

  //         useElement.setAttribute("xlink:href", "#thumbArrow"); // Змінюємо іконку назад на 'thumbArrow'

  //         isOpen = false; // змінюємо стан меню на закрите
  //       }
  //     });
  //   }
});
