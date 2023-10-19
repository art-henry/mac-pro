document.addEventListener("DOMContentLoaded", function () {
  // Variables for Chat Function
  const chatLinks = document.querySelectorAll(".double-chat");
  const whatsappChatLinks = document.querySelectorAll(".whats-app-chat");
  const telegramChatLinks = document.querySelectorAll(".telegram-chat");
  const whatsappLink = "https://wa.me/420792435436?text=";
  const telegramLink = "https://t.me/henrik_dev?text=";
  const onlineChat = document.querySelector(".online_chat");
  // const mailChatButton = document.querySelector(".mail-chat");
  const basePriceFromElement = document.querySelector(".baseprice.from");
  const basePriceToElement = document.querySelector(".baseprice.to");
  const productNameElement = document.getElementById("product_name");
  const codeItemElement = document.querySelector(".code_item");
  const extraText =
    (productNameElement?.textContent || "") +
    ", code: " +
    (codeItemElement?.textContent || "") +
    ", price: " +
    (basePriceFromElement?.textContent || "") +
    " - " +
    (basePriceToElement?.textContent || "") +
    "\nTu mensaje: ";

  let cleanedExtraText = extraText.trim().replace(/\s+/g, " ");
  // window.open(whatsappLink + encodeURIComponent(cleanedExtraText), "_blank");

  const mailToEmail = "henrikdevmail@gmail.com";

  // Chat Function

  // Функция для сброса aria-pressed для всех ссылок
  // const resetAriaPressed = () => {
  //   chatLinks.forEach((link) => link.setAttribute("aria-pressed", "false"));
  //   whatsappChatLinks.forEach((link) =>
  //     link.setAttribute("aria-pressed", "false")
  //   );
  //   telegramChatLinks.forEach((link) =>
  //     link.setAttribute("aria-pressed", "false")
  //   );
  // };
  if (chatLinks.length) {
    chatLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const currentAriaPressed = this.getAttribute("aria-pressed") === "true";
        this.setAttribute("aria-pressed", String(!currentAriaPressed));

        // Зміна атрибута xlink:href у svg елементі
        const svgUseElement = link.querySelector("use");
        if (svgUseElement) {
          const currentHref = svgUseElement.getAttribute("xlink:href");
          if (currentHref === "#chat-double") {
            // Додавання класу visible елементам whatsappChatLinks та telegramChatLinks
            whatsappChatLinks.forEach((whatsappLink) => {
              whatsappLink.classList.add("visible");
            });
            telegramChatLinks.forEach((telegramLink) => {
              telegramLink.classList.add("visible");
            });
            // mailChatButton.classList.add("visible");

            svgUseElement.setAttribute("xlink:href", "#close");
          } else {
            // Відновлення попереднього стану при повторному кліку
            whatsappChatLinks.forEach((whatsappLink) => {
              whatsappLink.classList.remove("visible");
            });
            telegramChatLinks.forEach((telegramLink) => {
              telegramLink.classList.remove("visible");
            });
            // mailChatButton.classList.remove("visible");

            svgUseElement.setAttribute("xlink:href", "#chat-double");
          }
        }
        if (!document.getElementById("amocrm_script")) {
          const script = document.createElement("script");
          script.id = "amocrm_script";
          script.text = `(function (a, m, o, c, r, m) {
              a[m] = {
                  id: "770085",
                  hash: "7bea0e7a902a3dfc41a11da8558c172cf147dbc836a75dcfa29c4e0eeb54f9cb",
                  locale: "en",
                  inline: false,
                  setMeta: function (p) {
                      this.params = (this.params || []).concat([p]);
                  },
              };
              a[o] = a[o] || function () {
                  (a[o].q = a[o].q || []).push(arguments);
              };
              var d = a.document, s = d.createElement("script");
              s.async = true;
              s.id = m + "_script";
              s.src = "https://gso.kommo.com/js/button.js?1696841687";
              d.head && d.head.appendChild(s);
          })(window, 0, "crmPlugin", 0, 0, "crm_plugin");`;
          onlineChat.appendChild(script);
        } else {
          // Видалення скрипта та оновлення сторінки, якщо скрипт вже додано
          const scriptToRemove = document.getElementById("amocrm_script");
          onlineChat.removeChild(scriptToRemove);
          location.reload(); // оновити сторінку
        }
      });
    });
  }

  if (whatsappChatLinks.length) {
    // Обробка кліку на whatsappChatLinks
    whatsappChatLinks.forEach((whatsappChat) => {
      whatsappChat.addEventListener("click", function (event) {
        event.preventDefault();
        window.open(
          whatsappLink + encodeURIComponent(cleanedExtraText),
          "_blank"
        );
      });
    });
  }

  if (telegramChatLinks.length) {
    // Обробка кліку на telegramChatLinks
    telegramChatLinks.forEach((telegramChat) => {
      telegramChat.addEventListener("click", function (event) {
        event.preventDefault();
        window.open(
          telegramLink + encodeURIComponent(cleanedExtraText),
          "_blank"
        );
      });
    });
  }

  // if (mailChatButton) {
  //   mailChatButton.addEventListener("click", function (event) {
  //     event.preventDefault();

  //     if (
  //       productNameElement &&
  //       codeItemElement &&
  //       basePriceFromElement &&
  //       basePriceToElement
  //     ) {
  //       const subject = `code: ${codeItemElement.textContent} - ${productNameElement.textContent}`;
  //       const mailtoLink = `mailto:${mailToEmail}?subject=${encodeURIComponent(
  //         subject
  //       )}&body=${encodeURIComponent(cleanedExtraText)}`;
  //       window.open(mailtoLink, "_blank");
  //     }
  //   });
  // }
});
