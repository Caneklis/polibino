document.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line no-console
  console.log("DOM полностью загружен и разобран");
  require("./modules/main-nav");

  const header = document.querySelector(".header");
  console.log(header);
  let scrollPrev = 0;

  window.addEventListener("scroll", () => {
    let scrolled = window.pageYOffset;

    if (scrolled > 10 && scrolled > scrollPrev) {
      header.classList.add("header--out");
      header.classList.remove("header--in");
    } else if (scrolled < 10) {
      header.classList.remove("header--in");
    } else {
      header.classList.remove("header--out");
      header.classList.add("header--in");
    }
    scrollPrev = scrolled;
  });
});
