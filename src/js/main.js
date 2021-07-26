// import Swiper JS
import Swiper from "swiper/bundle";
import * as AOS from "aos/dist/aos.js";

document.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line no-console
  console.log("DOM полностью загружен и разобран");
  require("./modules/main-nav");
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

  /* Swiper
   **************************************************************/
  var swiper = Swiper;
  var init = false;

  /* Which media query
   **************************************************************/
  function swiperMode() {
    let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)");
    let tablet = window.matchMedia("(min-width: 768px)");

    // Enable (for mobile)
    if (mobile.matches) {
      if (!init) {
        init = true;
        swiper = new Swiper(".swiper-container", {
          slidesPerView: 1,
          centeredSlides: true,
          loop: true,
          spaceBetween: 20,
          watchSlidesVisibility: true,
          loop: true,
          direction: "horizontal",
          grabCursor: true,
          autoHeight: true,

          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      }
    }

    // Disable (for tablet)
    else if (tablet.matches) {
      for (let i = 0; i < swiper.length; i++) {
        swiper[i].destroy();
      }
      init = false;
    }
  }

  /* On Load
   **************************************************************/
  window.addEventListener("load", function () {
    swiperMode();
  });

  /* On Resize
   **************************************************************/
  window.addEventListener("resize", function () {
    swiperMode();
  });

  AOS.init();
});
