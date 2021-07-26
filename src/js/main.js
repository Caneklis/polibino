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

  var textSlider = new Swiper(".textpage__slider", {
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      768: {
        initialSlide: 2,
        centeredSlides: true,
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  AOS.init();

  function findVideos() {
    let videos = document.querySelectorAll(".video");

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    let link = video.querySelector(".video__link");
    let media = video.querySelector(".video__media");
    let button = video.querySelector(".video__button");
    let id = parseMediaURL(media);

    video.addEventListener("click", () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    link.removeAttribute("href");
    video.classList.add("video--enabled");
  }

  function parseMediaURL(media) {
    let regexp =
      /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
  }

  function createIframe(id) {
    let iframe = document.createElement("iframe");

    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("allow", "autoplay");
    iframe.setAttribute("src", generateURL(id));
    iframe.classList.add("video__media");

    return iframe;
  }

  function generateURL(id) {
    let query = "?rel=0&showinfo=0&autoplay=1";

    return "https://www.youtube.com/embed/" + id + query;
  }

  findVideos();
});
