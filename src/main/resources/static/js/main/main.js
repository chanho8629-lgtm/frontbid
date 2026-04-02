document.addEventListener("DOMContentLoaded", function () {
  const thumbnailLinks = Array.from(
    document.querySelectorAll(".yt-lockup-view-model__content-image")
  );

  thumbnailLinks.forEach(function (link) {
    const overlay = link.querySelector(".ytThumbnailHoverOverlayViewModelHost");
    if (!overlay) {
      return;
    }

    function showOverlay() {
      overlay.style.display = "block";
    }

    function hideOverlay() {
      overlay.style.display = "none";
    }

    hideOverlay();

    link.addEventListener("mouseenter", showOverlay);
    link.addEventListener("mouseleave", hideOverlay);
    link.addEventListener("focusin", showOverlay);
    link.addEventListener("focusout", function (event) {
      if (event.relatedTarget && link.contains(event.relatedTarget)) {
        return;
      }
      hideOverlay();
    });
  });
});
