document.addEventListener("DOMContentLoaded", function () {
  var placeholder = document.getElementById("video-placeholder");
  var playIcon = document.querySelector(".play-icon");

  if (!placeholder || !playIcon) {
    return;
  }

  function loadVideo() {
    var videoLinkElement = document.querySelector(".video_link");
    var videoLink;

    if (!videoLinkElement) {
      console.log("Video link not found, using default link");
      videoLink =
        "https://www.youtube-nocookie.com/embed/Tgk68SPXbA8?si=IdEISkStSSHYPpvA";
    } else {
      videoLink = videoLinkElement.textContent.trim();
    }

    videoLink += "&autoplay=1";

    var iframe = document.createElement("iframe");
    iframe.src = videoLink;
    iframe.title = "YouTube video player";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    var container = document.querySelector(".video_review_section");
    if (!container) {
      console.log("Container not found");
      return;
    }
    container.innerHTML = "";
    container.appendChild(iframe);
  }

  placeholder.addEventListener("click", loadVideo);
  playIcon.addEventListener("click", loadVideo);
});
