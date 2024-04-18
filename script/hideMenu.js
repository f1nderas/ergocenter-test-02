export default function hideMenuScript() {
  const header = document.querySelector(".header");
  const headerHigh = header.clientHeight;
  let scrollPosition = 0;
  window.addEventListener("scroll", function () {
    scrollPosition = window.scrollY;
    if (headerHigh < scrollPosition) {
      document.body.classList.remove("hide_menu");
    } else {
      document.body.classList.add("hide_menu");
    }
  });
}
