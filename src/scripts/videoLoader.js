var placeholder = document.getElementById("video-placeholder");
var playIcon = document.querySelector(".play-icon");

function loadVideo() {
  // Коли користувач клікає на заглушку або іконку, ми вставляємо iframe
  var iframe = document.createElement("iframe");
  iframe.src = iframe.src =
    "https://www.youtube-nocookie.com/embed/MKRqi_W5VyE?autoplay=1";
  iframe.title = "YouTube video player";
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;

  // Замінимо заглушку на iframe
  var container = document.getElementById("video-container");
  container.innerHTML = "";
  container.appendChild(iframe);
}

placeholder.addEventListener("click", loadVideo);
playIcon.addEventListener("click", loadVideo);
