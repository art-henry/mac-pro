document.addEventListener("DOMContentLoaded", function () {
  // Variables for Chat Function
  const chatLinks = document.querySelectorAll(".double-chat");
  const whatsappChatLinks = document.querySelectorAll(".whats-app-chat");
  const telegramChatLinks = document.querySelectorAll(".telegram-chat");
  const whatsappLink = "https://wa.me/420792435436?text=";
  const telegramLink = "https://t.me/henrik_dev?text=";
  const mailChatButton = document.querySelector(".mail-chat");
  const basePriceFromElement = document.querySelector(".baseprice.from");
  const basePriceToElement = document.querySelector(".baseprice.to");
  const productNameElement = document.getElementById("product_name");
  const codeItemElement = document.querySelector(".code_item");
  console.log(basePriceFromElement, basePriceToElement);
  const extraText = `${productNameElement.textContent}, code: ${codeItemElement.textContent}, price: ${basePriceFromElement.textContent} - ${basePriceToElement.textContent}\nTu mensaje: `;

  let cleanedExtraText = extraText.trim().replace(/\s+/g, " ");
  window.open(whatsappLink + encodeURIComponent(cleanedExtraText), "_blank");

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
          mailChatButton.classList.add("visible");

          svgUseElement.setAttribute("xlink:href", "#close");
        } else {
          // Відновлення попереднього стану при повторному кліку
          whatsappChatLinks.forEach((whatsappLink) => {
            whatsappLink.classList.remove("visible");
          });
          telegramChatLinks.forEach((telegramLink) => {
            telegramLink.classList.remove("visible");
          });
          mailChatButton.classList.remove("visible");

          svgUseElement.setAttribute("xlink:href", "#chat-double");
        }
      }
    });
  });
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

  mailChatButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (
      productNameElement &&
      codeItemElement &&
      basePriceFromElement &&
      basePriceToElement
    ) {
      const subject = `code: ${codeItemElement.textContent} - ${productNameElement.textContent}`;
      const mailtoLink = `mailto:${mailToEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(cleanedExtraText)}`;
      window.open(mailtoLink, "_blank");
    }
  });

  // Func for soc_media

  const toggleButton = document.querySelector(".toggle_icons");
  const iconsContainer = document.querySelector(".icons_container");

  toggleButton.addEventListener("click", function () {
    iconsContainer.classList.toggle("open");

    const currentHref = toggleButton
      .querySelector("use")
      .getAttribute("xlink:href");
    if (currentHref === "#thumbArrow") {
      toggleButton.querySelector("use").setAttribute("xlink:href", "#close");
    } else {
      toggleButton
        .querySelector("use")
        .setAttribute("xlink:href", "#thumbArrow");
    }
  });
});
