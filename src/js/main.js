// import Swiper JS
import Swiper from 'swiper/bundle';
import * as AOS from 'aos/dist/aos.js';
import './modules/custom-select.js';
import { initPhoneMask } from './modules/phone-mask.js';
import { Fancybox } from '@fancyapps/ui';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-console
  console.log('DOM полностью загружен и разобран');
  require('./modules/main-nav');
  require('./modules/popup');

  const header = document.querySelector('.header');
  let scrollPrev = 0;

  window.addEventListener('scroll', () => {
    let scrolled = window.pageYOffset;

    if (scrolled > 10 && scrolled > scrollPrev) {
      header.classList.add('header--out');
      header.classList.remove('header--in');
    } else if (scrolled < 10) {
      header.classList.remove('header--in');
    } else {
      header.classList.remove('header--out');
      header.classList.add('header--in');
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
    let mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
    let tablet = window.matchMedia('(min-width: 768px)');

    // Enable (for mobile)
    if (mobile.matches) {
      if (!init) {
        init = true;
        swiper = new Swiper('.swiper-container', {
          centeredSlides: true,
          slidesPerView: 'auto',
          loop: true,
          spaceBetween: 20,
          watchSlidesVisibility: true,
          loop: true,
          direction: 'horizontal',
          grabCursor: true,
          autoHeight: true,

          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'fraction',
          },

          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
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
  window.addEventListener('load', function () {
    swiperMode();
  });

  /* On Resize
   **************************************************************/
  window.addEventListener('resize', function () {
    swiperMode();
  });

  var textSlider = new Swiper('.textpage__slider', {
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'fraction',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
    let videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }

  function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
  }

  function parseMediaURL(media) {
    let regexp =
      /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
  }

  function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  }

  function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();

  const tooltips = Array.from(document.querySelectorAll('.tooltip'));
  const tooltipContainer = document.querySelector('.tooltip-content');

  let tooltipID;
  tooltips.forEach((tooltip) => {
    if (tooltip) {
      tooltip.addEventListener('mouseenter', (e) => {
        tooltipID = e.target.getAttribute('data-id');
        tooltipContainer.classList.add('tooltip-content--fade-in');
        tooltipContainer.style.left = `${e.pageX}px`;
        tooltipContainer.style.top = `${e.pageY}px`;
        tooltipContainer.innerHTML = tooltipData[tooltipID - 1].txt;
      });

      tooltip.addEventListener('mouseout', (e) => {
        tooltipContainer.classList.remove('tooltip-content--fade-in');
      });
    }
  });

  if (tooltipContainer) {
    tooltipContainer.addEventListener('mouseenter', () => {
      tooltipContainer.classList.add('tooltip-content--fade-in');
    });
    tooltipContainer.addEventListener('mouseout', () => {
      tooltipContainer.classList.remove('tooltip-content--fade-in');
    });
  }

  const sponsors = document.querySelectorAll('.sponsors-page__item-card');

  const sponsorsDescriptions = document.querySelectorAll(
    '.sponsors-page__item-card-full'
  );

  sponsors.forEach((sponsor) => {
    if (sponsor) {
      sponsor.addEventListener('click', () => {
        const body = document.querySelector('body');
        const { popupTrigger } = sponsor.dataset;
        const popupModal = document.querySelector(
          `[data-popup-modal="${popupTrigger}"]`
        );
        sponsors.forEach((item) => {
          item.classList.remove('sponsors-page__item-card--active');
        });

        sponsor.classList.add('sponsors-page__item-card--active');
        sponsorsDescriptions.forEach((item) => {
          item.classList.remove('is--visible');
        });

        popupModal.classList.add('is--visible');
      });

      // sponsor.addEventListener("mouseover", () => {
      //   const body = document.querySelector("body");
      //   const { popupTrigger } = sponsor.dataset;
      //   const popupModal = document.querySelector(
      //     `[data-popup-modal="${popupTrigger}"]`
      //   );

      //   popupModal.classList.add("is--visible");
      // });

      // sponsor.addEventListener("mouseleave", () => {
      //   const body = document.querySelector("body");
      //   const { popupTrigger } = sponsor.dataset;
      //   const popupModal = document.querySelector(
      //     `[data-popup-modal="${popupTrigger}"]`
      //   );

      //   popupModal.classList.remove("is--visible");
      // });
    }
  });

  const closeSponsorsDesription = document.querySelectorAll(
    '.sponsors-page__item-card-close'
  );

  closeSponsorsDesription.forEach((item) => {
    if (item) {
      item.addEventListener('click', () => {
        sponsorsDescriptions.forEach((item) => {
          item.classList.remove('is--visible');
        });

        sponsors.forEach((item) => {
          item.classList.remove('sponsors-page__item-card--active');
        });
      });
    }
  });

  const mainHistorySlider = new Swiper('.history__main-slider .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,

    navigation: {
      nextEl: '.history__main-slider-arrow-next',
      prevEl: '.history__main-slider-arrow-prev',
    },
  });

  const timelineSlider = document.querySelectorAll('.timeline__slider');

  timelineSlider.forEach((element) => {
    const slider = new Swiper(element.querySelector('.swiper'), {
      slidesPerView: 1,
      spaceBetween: 20,

      pagination: {
        el: element.querySelector('.swiper-pagination'),
        clickable: true,
        type: 'fraction',
      },

      navigation: {
        nextEl: element.querySelector('.timeline__slider-arrow-next'),
        prevEl: element.querySelector('.timeline__slider-arrow-prev'),
      },
    });
  });

  initPhoneMask();
});
