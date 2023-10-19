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

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal-content");

  const pvprInfos = document.querySelectorAll(".pvpr_info");
  const buyFormBtns = document.querySelectorAll(".buy_btn_form");
  const closeModalButton = modal.querySelector(".close_modal");
  const overlay = document.getElementById("modal-overlay");
  const body = document.querySelector("body");

  function showModal() {
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  function hideModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  function updateIframeStyle() {
    const iframe = document.querySelector(".order-form iframe");
    if (iframe) {
      if (window.innerWidth < 768) {
        iframe.style.width = "100%";
      } else {
        iframe.style.width = "500px";
      }
    }
  }

  function showOverlayAndInsertForm() {
    overlay.style.display = "block";

    // Створюємо контейнер для форми
    const formContainer = document.createElement("div");
    formContainer.className = "order-form";

    // Створюємо і першого вбудованого скрипта
    const script1 = document.createElement("script");
    script1.text = `
!function(a,m,o,c,r,m){
a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},
a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},
a[o+r]({id:"1191415",hash:"b3c58fcea1e182397e74a371b458b0f5",locale:"en"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}
}(window,0,"amo_forms_","params","load","loaded");
`;
    formContainer.appendChild(script1);

    // Створюємо і другого вбудованого скрипта
    const script2 = document.createElement("script");
    script2.async = true;
    script2.charset = "utf-8";
    script2.src =
      "https://forms.kommo.com/forms/assets/js/amoforms.js?1696517583";
    script2.id = "amoforms_script_1191415";
    formContainer.appendChild(script2);

    // Додаємо контейнер форми до body
    body.appendChild(formContainer);

    // Створюємо observer
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          console.log("here");
          if (node.nodeName.toLowerCase() === "iframe") {
            node.setAttribute(
              "style",
              `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
    `
            );
            updateIframeStyle();
            observer.disconnect(); // зупиняємо observer, коли знайдемо iframe
          }
        });
      });
    });

    // Налаштування observer
    observer.observe(formContainer, {childList: true, subtree: true});
  }

  function removeForm() {
    const formContainer = document.querySelector(".order-form");
    if (formContainer) {
      formContainer.remove();
      overlay.style.display = "none";
    }
  }

  pvprInfos.forEach((pvprInfo) => {
    pvprInfo.addEventListener("click", showModal);
  });

  buyFormBtns.forEach((btn) => {
    btn.addEventListener("click", showOverlayAndInsertForm);
  });

  closeModalButton.addEventListener("click", hideModal);
  overlay.addEventListener("click", removeForm);
  overlay.addEventListener("click", hideModal);
});
