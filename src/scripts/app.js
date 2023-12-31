// Importing styles and plugins
import "../styles/main.scss";
// import "./product-scripts";
import "./videoLoader";
// import "./chat";
import "./toggle_btns";
// import "./plugins";
document.addEventListener("DOMContentLoaded", function () {
  // Variables for NAV PRODUCT DESCRIPTION
  const productDescriptionElements = [].slice.call(
    document.querySelectorAll(".product_descr_link")
  );

  // Variables for Buy FUNCTION
  var orderItems = document.querySelectorAll(".order_item");

  // Variables for Share Button
  let share_btns = document.querySelectorAll(".share_btn");

  // Variables for Scroll Element
  var backTopElement = document.querySelector(".ant-back.top");

  // Variables for Burger Menu
  let toggle_btns = document.querySelectorAll(
    ".button_mobimenu_container, #overlay"
  );

  // Variables for Filter Items
  // const menuItems = document.querySelectorAll("*.filter-link");
  const contentItems = document.querySelectorAll(".content_item");
  // const groupNameElement = document.querySelector(".catalog_group_name");

  // Variables for Crumb and Logo
  const breadCrumbList = document.querySelector(".breadCrumbList");
  let homeCrumb = document.querySelector("#homeCrumb");
  const logo = document.querySelector(".logo");
  const itemInfoLinks = document.querySelectorAll(".item_info_link");

  // NAV PRODUCT DESCRIPTION

  productDescriptionElements.forEach((element) => {
    element.addEventListener("click", () => {
      productDescriptionElements.forEach((tab) => {
        tab.classList.remove("active");
      });
      element.classList.add("active");
    });
  });

  // Функція, яку викликаємо при переході на нову сторінку
  function transitionToNewPage() {
    // Зберігаємо запис в sessionStorage

    localStorage.setItem("transitionExists", true);
    localStorage.setItem("prevPage", window.location.href);
  }
  // Buy FUNCTION

  // Функція, яка відкриває WhatsApp з переданим текстом
  function openWhatsAppWithCode(e) {
    var clickedElement = e.target;
    var orderItem = clickedElement.closest(".order_item");
    if (!orderItem) {
      console.error("Couldn't find order_item for the clicked element.");
      return;
    }

    // Знаходимо елемент з класом code_item та product_title
    var codeElement = orderItem.querySelector(".code_item");
    var productTitleElement = orderItem.querySelector(".item_title");
    var productPriceElement = orderItem.querySelector(".baseprice");

    if (!codeElement || !productTitleElement) {
      console.error(
        "Couldn't find the code element or product title element in the order_item"
      );
      return;
    }

    // Отримуємо текст з елементів та формуємо повідомлення
    var codeText = codeElement.textContent.trim().replace(/\s+/g, " ");
    var productTitle = productTitleElement.textContent
      .trim()
      .replace(/\s+/g, " ");
    var productPrice = productPriceElement.textContent
      .trim()
      .replace(/\s+/g, " ");

    var textToSend = `${productTitle}; code: ${codeText}; price: ${productPrice}`;

    // Закодований текст для використання в URL
    var encodedText = encodeURIComponent(textToSend);

    // Вказаний номер телефону
    var phoneNumber = "+34634994042";

    // Генеруємо посилання для WhatsApp з переданим текстом та номером телефону
    var whatsappLink =
      "https://api.whatsapp.com/send?phone=" +
      phoneNumber +
      "&text=" +
      encodedText;

    // Відкриваємо посилання у новому вікні або вкладці
    window.open(whatsappLink, "_blank");
  }

  // Додаємо обробник події натискання на кожен елемент .order_item
  orderItems.forEach(function (item) {
    var buyItemElements = item.querySelectorAll(".buy_btn");
    if (buyItemElements.length > 0) {
      buyItemElements.forEach(function (buyItemElement) {
        buyItemElement.addEventListener("click", openWhatsAppWithCode);
      });
    }
  });

  // Share Button

  if (share_btns.length > 0) {
    // Define the shareContent function
    function shareContent() {
      const pageURL = window.location.href;
      const pageTitle = document.title;

      if (navigator.share) {
        navigator
          .share({
            title: pageTitle,
            url: pageURL,
          })
          .catch((error) => {
            console.error("Error trying to share:", error);
          });
      } else {
        // If the Share API is not available, copy the link to the clipboard
        navigator.clipboard
          .writeText(pageURL)
          .then(() => {
            alert("Link copied");
          })
          .catch((err) => {
            console.error("Could not copy text: ", err);
          });
      }
    }

    // Loop through each button and attach the event listener
    share_btns.forEach((btn) => {
      btn.addEventListener("click", shareContent);
    });
  }

  // Функція для оновлення кількості видимих елементів
  function updateQuantityElement(itemCount) {
    // Знаходимо елемент з класом "item_quantity"
    var quantityElement = document.querySelector(".items_quantity");
    if (quantityElement) {
      // Встановлюємо потрібний текст
      quantityElement.textContent = `- ${itemCount}`;
    } else {
      return;
      // console.error("Element with class 'item_quantity' was not found!");
    }
  }
  function updateVisibleItemCount() {
    // Перевіряємо чи на сторінці є елемент з класом content_items
    var gridList = document.querySelector(".content_items");
    if (gridList) {
      // Знаходимо всі елементи з класом "visible" у класі "virtuoso-grid-item"
      var visibleItems = gridList.querySelectorAll(".content_item.visible");
      // Визначаємо кількість видимих елементів
      var visibleItemCount = visibleItems.length;
      // Викликаємо функцію для оновлення елемента з кількістю
      updateQuantityElement(visibleItemCount);
    } else {
      // console.error("Element with class 'content_items' was not found!");
      return;
    }
  }
  // Викликати функцію при необхідності, наприклад, при зміні кількості видимих елементів
  updateVisibleItemCount();
  // Scroll Element
  window.addEventListener("scroll", function () {
    var scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (backTopElement) {
      if (scrollTop >= 500) {
        backTopElement.style.display = "grid";
      } else {
        backTopElement.style.display = "none";
      }
      backTopElement.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  });

  // Burger Menu

  toggle_btns.forEach(function (toggle_btn) {
    toggle_btn.addEventListener("click", function () {
      // Toggle the class
      document.body.classList.toggle("mobile-menu-open");

      // Find all elements that should have their 'aria-expanded' attribute toggled
      const elementsToUpdate = document.querySelectorAll(
        '[aria-haspopup="true"]'
      );

      elementsToUpdate.forEach((element) => {
        const currentState = element.getAttribute("aria-expanded") === "true";
        element.setAttribute("aria-expanded", !currentState);
      });
    });
  });

  // toggle_btns.forEach(function (toggle_btn) {
  //   toggle_btn.addEventListener("click", function () {
  //     document.body.classList.toggle("mobile-menu-open");
  //   });
  // });

  // BREADCRUMB
  breadCrumbList.addEventListener("click", function (e) {
    // e.preventDefault();
    if (e.target && e.target.id === "homeCrumb") {
      clearLocalStorage();
    }
  });
  // Функція для додавання нового елемента хлібної крошки

  function addBreadCrumb(itemName, targetGroup) {
    if (!breadCrumbList.querySelector("#homeCrumb")) {
      const homeLi = document.createElement("li");
      homeCrumb = document.createElement("a");
      homeCrumb.textContent = "Inicio";
      homeCrumb.href = "/";
      homeCrumb.id = "homeCrumb";
      homeLi.appendChild(homeCrumb);
      breadCrumbList.appendChild(homeLi);
    }
    if (!breadCrumbList.querySelector(`[data-target="${targetGroup}"]`)) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "/";
      a.textContent = itemName;
      a.setAttribute("data-target", targetGroup);
      a.classList.add("filter-link");
      li.appendChild(a);
      breadCrumbList.appendChild(li);
    }
  }

  // Функція для видалення всіх хлібних крошок після першого елемента
  function clearBreadCrumbs() {
    while (breadCrumbList.childNodes.length > 1) {
      breadCrumbList.removeChild(breadCrumbList.lastChild);
    }
  }

  // function handleItemClick(targetGroup, itemName) {
  //   // if (itemName) {
  //   //   console.log("itemName exists:", itemName);
  //   // } else {
  //   //   console.log("itemName is null or undefined");
  //   // }
  //   if (groupNameElement) {
  //     groupNameElement.textContent = itemName;
  //   }
  //   if (contentItems.length > 0) {
  //     contentItems.forEach((contentItem) => {
  //       contentItem.classList.remove("visible");
  //     });

  //     document.querySelectorAll(`.${targetGroup}`).forEach((groupItem) => {
  //       groupItem.classList.add("visible");
  //     });

  //     // Тут можна розмістити updateVisibleItemCount(), якщо він існує.
  //     updateVisibleItemCount();
  //   } else {
  //     console.log(
  //       "We're probably on the product page, skipping content items update."
  //     );
  //   }

  //   localStorage.setItem(
  //     "selectedCategory",
  //     JSON.stringify({ targetGroup, itemName })
  //   );
  //   clearBreadCrumbs();
  //   addBreadCrumb(itemName, targetGroup);
  // }

  // document.addEventListener("click", function (e) {
  //   if (e.target && e.target.classList.contains("filter-link")) {
  //     e.preventDefault();
  //     if (contentItems.length > 0) {
  //       console.log("click2");
  //     }

  //     const targetGroup = e.target.getAttribute("data-target");
  //     const itemName = e.target.textContent;
  //     handleItemClick(targetGroup, itemName);
  //   }
  // });

  // const contentItemsExist = document.querySelector(".content_items");

  // menuItems.forEach((item) => {
  //   const menuItemNameElement = item.querySelector(".item_name");
  //   const itemName = menuItemNameElement ? menuItemNameElement.textContent : "";

  //   // if (itemName) {
  //   //   item.setAttribute("aria-label", itemName);
  //   // }
  //   if (!contentItemsExist) {
  //     const hrefValue = item.getAttribute("href");
  //     if (hrefValue && hrefValue.startsWith("#")) {
  //       item.setAttribute("href", `/#${hrefValue.substring(1)}`);
  //     }
  //   }
  //   // Подія кліку
  //   item.addEventListener("click", function (e) {
  //     // e.preventDefault();
  //     const targetGroup = item.getAttribute("data-target");
  //     // Зберегти дані для дій після завантаження
  //     localStorage.setItem(
  //       "postLoadAction",
  //       JSON.stringify({ targetGroup, itemName })
  //     );
  //     // window.location.href = "/";
  //     handleItemClick(targetGroup, itemName);
  //   });
  // });

  // set ATTRIBUTES

  // Знаходимо всі елементи з класом 'baseprice'
  const basePriceElements = document.querySelectorAll(".baseprice");
  // Знаходимо всі елементи з класом 'code_item'
  const codeItemElements = document.querySelectorAll(".code_item");
  // Знаходимо всі елементи з класом 'product_title'
  const productTitleElements = document.querySelectorAll(".product_title");

  basePriceElements.forEach((element) => {
    // Отримуємо текстовий контент елементу
    const priceText = element.textContent;

    // Створюємо текст для атрибуту 'aria-label'
    const ariaLabel = `Precio:${priceText}`;

    // Додаємо атрибут 'aria-label' до елементу
    element.setAttribute("aria-label", ariaLabel);
  });

  codeItemElements.forEach((element) => {
    // Отримуємо текстовий контент елементу
    const codeText = element.textContent;

    // Створюємо текст для атрибуту 'aria-label'
    const ariaLabel = `Código del producto: ${codeText}`;

    // Додаємо атрибут 'aria-label' до елементу
    element.setAttribute("aria-label", ariaLabel);
  });

  productTitleElements.forEach((element) => {
    // Отримуємо текстовий контент елементу
    const productTitleText = element.textContent;

    // Перевірка на наявність батьківського посилання
    const parentLink = element.closest("a");

    if (parentLink) {
      // Додаємо атрибути до батьківського посилання, якщо воно є
      parentLink.setAttribute("title", `Ir al producto «${productTitleText}»`);
    } else {
      // Додаємо атрибути до самого елементу, якщо немає батьківського посилання
      element.setAttribute("role", "heading");
      // Встановлюємо атрибут aria-level в залежності від тегу
      element.setAttribute("aria-level", element.tagName === "H1" ? "1" : "2");
    }
  });

  contentItems.forEach((contentItem) => {
    // Знаходимо елемент з класом 'product_title' в межах поточного 'content_item'
    const productTitle = contentItem.querySelector(".product_title");

    // Знаходимо елемент(и) з класом 'item_info_link' в межах поточного 'content_item'
    // const itemInfoLinks = contentItem.querySelectorAll(".item_info_link");

    // Виходимо з ітерації, якщо 'product_title' не знайдено
    if (!productTitle) return;

    // Отримуємо текстовий контент елементу 'product_title'
    const productTitleText = productTitle.textContent;
    // Знаходимо елемент(и) img в межах поточного 'content_item'
    const imgTags = contentItem.querySelectorAll("img");

    // Додаємо атрибути 'aria-label' до всіх знайдених 'item_info_link' в межах поточного 'content_item'
    // itemInfoLinks.forEach((link) => {
    //   link.setAttribute(
    //     "aria-label",
    //     `Enlace al producto «${productTitleText}»`
    //   );
    // });
    // Додаємо атрибути 'alt' до всіх знайдених 'img' в межах поточного 'content_item'
    imgTags.forEach((img) => {
      img.setAttribute("alt", `Imagen de un ${productTitleText}`);
    });
  });

  // ADD ATTR FOR ORDER ITEMS

  orderItems.forEach((orderItem) => {
    // Знаходимо елемент з класом 'product_title' в межах поточного 'order_item'
    const productTitle = orderItem.querySelector(".product_title");

    // Знаходимо елемент(и) з класом 'buy_btn' в межах поточного 'order_item'
    const buyButtons = orderItem.querySelectorAll(".buy_btn");

    // Виходимо з ітерації, якщо 'product_title' не знайдено
    if (!productTitle) return;

    // Отримуємо текстовий контент елементу 'product_title'
    const productTitleText = productTitle.textContent;

    // Додаємо атрибути 'aria-label' до всіх знайдених 'buy_btn' в межах поточного 'order_item'
    // buyButtons.forEach((btn) => {
    //   btn.setAttribute(
    //     "aria-label",
    //     `Botón para ordenar este ${productTitleText}`
    //   );
    // });
  });

  // Завантаження збереженої категорії з Local Storage
  const postLoadAction = localStorage.getItem("postLoadAction");
  const parsedPostLoadAction = postLoadAction
    ? JSON.parse(postLoadAction)
    : null;
  if (parsedPostLoadAction) {
    // const { targetGroup, itemName } = parsedPostLoadAction;
    // handleItemClick(targetGroup, itemName);
    localStorage.removeItem("postLoadAction"); // Очищення команди
  } else {
    const savedData = localStorage.getItem("selectedCategory");
    if (savedData) {
      // const { targetGroup, itemName } = JSON.parse(savedData);
      // handleItemClick(targetGroup, itemName);
    }
  }

  // Функція для очищення Local Storage
  function clearLocalStorage() {
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("breadCrumbHistory");
    localStorage.removeItem("postLoadAction");
    clearBreadCrumbs();
    contentItems.forEach((contentItem) => {
      contentItem.classList.add("visible");
    });
    updateVisibleItemCount();
  }

  // Додавання обробників подій
  // if (homeCrumb) {
  //   homeCrumb.addEventListener("click", function (e) {
  //     console.log("click");
  //     clearLocalStorage();
  //     // localStorage.removeItem("postLoadAction");
  //   });
  // }
  if (logo) {
    logo.addEventListener("click", function (e) {
      // e.preventDefault();
      clearLocalStorage();
    });
  }

  // Логіка для основної сторінки

  if (itemInfoLinks.length > 0) {
    itemInfoLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const selectedCategory = localStorage.getItem("selectedCategory");
        if (selectedCategory) {
          const currentBreadCrumb = JSON.parse(selectedCategory);
          localStorage.setItem(
            "breadCrumbHistory",
            JSON.stringify(currentBreadCrumb)
          );
        } else {
          console.warn("selectedCategory is not set in localStorage");
        }
        transitionToNewPage();
      });
    });
  }

  // Логіка для сторінки з товаром
  const itemTitleElement = document.querySelector(".item_title");
  if (itemTitleElement) {
    const savedData = localStorage.getItem("breadCrumbHistory");
    if (savedData) {
      const {targetGroup, itemName} = JSON.parse(savedData);
      addBreadCrumb(itemName, targetGroup);
      const itemTitle = itemTitleElement.textContent;
      const li = document.createElement("li");
      li.textContent = itemTitle;
      li.classList.add("last_crumb");
      breadCrumbList.appendChild(li);
    } else {
      const itemTitle = itemTitleElement.textContent;
      const li = document.createElement("li");
      li.textContent = itemTitle;
      li.classList.add("last_crumb");
      breadCrumbList.appendChild(li);
    }
  }

  // Modal

  // const modal = document.querySelector(".modal-content");
  // const pvprInfos = document.querySelectorAll(".pvpr_info");
  // const closeModalButton = modal.querySelector(".close_modal");
  // const overlay = document.getElementById("modal-overlay");

  // function showModal() {
  //   modal.style.display = "block";
  //   overlay.style.display = "block";
  // }

  // function hideModal() {
  //   modal.style.display = "none";
  //   overlay.style.display = "none";
  // }

  // pvprInfos.forEach((pvprInfo) => {
  //   pvprInfo.addEventListener("click", showModal);
  // });

  // closeModalButton.addEventListener("click", hideModal);
  // overlay.addEventListener("click", hideModal);

  // Calculation Price

  function calculateDiscount(
    basePriceElem,
    recommendPriceElem,
    discountValueElem
  ) {
    let basePrice = parseFloat(basePriceElem.textContent.replace(/[^\d]/g, ""));
    let recommendPrice = parseFloat(
      recommendPriceElem.textContent.replace(/[^\d]/g, "")
    );

    if (isNaN(basePrice) || isNaN(recommendPrice)) {
      console.error("Cannot parse prices");
      return;
    }

    let discount = ((recommendPrice - basePrice) / recommendPrice) * 100;
    discount = Math.round(discount);

    discountValueElem.textContent = `-${discount}%`;
  }

  const priceSections = document.querySelectorAll(".price_section");

  priceSections.forEach((priceSection) => {
    const basePriceElem = priceSection.querySelector(".baseprice");
    const recommendPriceElem = priceSection.querySelector(".recommend_value ");
    const discountValueElem = priceSection.querySelector(".discount_value");

    if (basePriceElem && recommendPriceElem && discountValueElem) {
      calculateDiscount(basePriceElem, recommendPriceElem, discountValueElem);
    }
  });

  // Разворачивает ответ
  document.querySelectorAll(".faq .faq-quest").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.target.parentElement.classList.toggle("open");
      let content_el = event.target.nextElementSibling;
      if (content_el.style.maxHeight) {
        content_el.style.maxHeight = null;
      } else {
        content_el.style.maxHeight = content_el.scrollHeight + "px";
      }
    });
  });

  // Функція для підменю

  const menuItems = document.querySelectorAll(".menu-item > a");

  // Додаємо обробник подій для кожного посилання
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", (event) => {
      // Відмінити стандартну поведінку посилання
      event.preventDefault();

      // Знаходимо батьківський контейнер .menu-item
      const parentMenuItem = menuItem.closest(".menu-item");

      // Перевіряємо, чи .menu-item знаходиться у батьківському контейнері <header>
      const isMenuItemInHeader = parentMenuItem.closest("header");

      if (isMenuItemInHeader) {
        // Отримуємо список всіх .menu-item елементів
        const allMenuItems = document.querySelectorAll(".menu-item");

        // Закриваємо всі .menu-item, крім поточного
        allMenuItems.forEach((item) => {
          if (item !== parentMenuItem) {
            item.classList.remove("open");
          }
        });
        // updateShadow();
      }

      // Переключаємо клас .open для поточного .menu-item
      parentMenuItem.classList.toggle("open");
      if (isMenuItemInHeader && window.innerWidth > 991.5) {
        // Отримуємо батьківський контейнер .header_content
        const headerContent = parentMenuItem.closest(".header_content");

        // Перезадаємо властивість тіні (box-shadow) відповідно до наявності класу .open
        if (parentMenuItem.classList.contains("open")) {
          headerContent.style.boxShadow = "none";
        } else {
          console.log(parentMenuItem);
          headerContent.style.boxShadow = "0px 6px 6px -7px rgba(0, 0, 0, 0.2)";
        }

        document.addEventListener("click", (event) => {
          if (
            !event.target.closest(".sub-menu") &&
            !event.target.closest(".menu-item")
          ) {
            document.querySelectorAll(".menu-item.open").forEach((menuItem) => {
              if (menuItem.closest("header")) {
                menuItem.classList.remove("open");
                // Update boxShadow or any other logic you need to execute on menu item close
              }
            });
          }
        });
      }
    });
  });

  // Оновлення тіні
  const updateShadow = () => {
    const headerContent = document.querySelector(".header_content");
    if (headerContent && window.innerWidth > 991.5) {
      console.log("Set shadow");
      headerContent.style.boxShadow = "0px 6px 6px -7px rgba(0, 0, 0, 0.2)";
    } else if (headerContent) {
      console.log("Remove shadow");
      headerContent.style.boxShadow = "none";
    } else {
      console.log("headerContent is not defined");
    }
  };
  window.addEventListener("resize", updateShadow);
});
