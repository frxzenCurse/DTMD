import Swiper from "swiper/bundle";

const BREAKPOINT = 1280;

export function swiperInit() {
  const slider = $("[data-slider-id]");

  if (slider.length) {
    slider.each(function () {
      const slider_el = $(this);
      const slider_id = slider_el.data("slider-id");
      const slider_prev_id = slider_el.data("slider-prev");
      const slider_next_id = slider_el.data("slider-next");
      const slider_prev = $(`[data-slider-button="${slider_prev_id}"]`);
      const slider_next = $(`[data-slider-button="${slider_next_id}"]`);
      const slider_buttons = $('[data-slider-buttons]')
      
      if (slider_buttons.length) {
        const slides_count = slider_el.find('.swiper-slide').length
        const min_count = slider_buttons.data('slider-buttons')

        if (slides_count < +min_count) {
          slider_buttons.addClass('hidden')
        }
      }

      let slider_options = {
        slidesPerView: "auto",

        spaceBetween: 10,
        speed: 500,

        breakpoints: {
          [BREAKPOINT]: {
            spaceBetween: 20,
          },
        },
      };


      switch (slider_id) {
        case 'main':
          slider_options = {
            slidesPerView:  1,
            spaceBetween: 0,
            // allowTouchMove: false,
            loop: true,
            speed: 500,
            autoplay: {
              delay: 6500,
              disableOnInteraction: false,
            },
            pagination: {
              el: '.swiper-pagination',
            },
            navigation: {
              nextEl: '[data-main-next]',
            },
            on: {
              init: function() {
              },
              slideChange: function(event) {
                const fraction = document.querySelector('[data-slider-fraction]')
                const index = event.realIndex + 1

                fraction.textContent = index < 10 ? `0${index}` : index
              },
            }
          };
          break;
        case 2:
          slider_options = {
            ...slider_options,
            loop: true,
          };
          break;
      }

      const slider_swiper = new Swiper(slider_el[0], slider_options);

      slider_prev.on("click", () => {
        slider_swiper.slidePrev();
      });
      slider_next.on("click", () => {
        slider_swiper.slideNext();
      });
    });
  }
}


// swiper
{
  $(window).on("load", () => {
    swiperInit();
  });
}
