import Swiper from "swiper/bundle";
import { mediaQuery } from './mediaQueries'

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
      let thumbsSlider
      let slider_swiper
      
      if (slider_buttons.length) {
        const slides_count = slider_el.find('.swiper-slide').length
        const min_count = slider_buttons.data('slider-buttons')

        if (slides_count < +min_count) {
          slider_buttons.addClass('hidden')
        }
      }

      if (slider_el[0].hasAttribute('data-thumbs-slider')) {
        let direction = mediaQuery.matches ? 'vertical' : 'horizontal'
        const thumbsSliderEl = $(`[data-thumbs-id="${slider_id}"]`)
        thumbsSlider = new Swiper(thumbsSliderEl[0], {
          direction: direction,
          slidesPerView: 'auto',
          spaceBetween: 8,
          on: {
            init: function(swiper) {
              const thumbs = swiper.el.querySelectorAll('[data-thumb]')

              thumbs.forEach((thumb, i) => {
                thumb.onclick = function() {
                  slider_swiper.slideTo(i)
                }
              })
            },
          }
        })
      }

      let slider_options = {
        slidesPerView: "auto",

        spaceBetween: 6,
        speed: 500,

        breakpoints: {
          [BREAKPOINT]: {
            spaceBetween: 30,
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
          case 11:
            slider_options = {
              pagination: {
                el: `[data-swiper-pagination="${slider_id}"]`,
                type: 'bullets',
              },
              on: {
                slideChange: function(swiper) {
                  const index = swiper.realIndex
                  // const thumbs = thumbsSlider.el.querySelectorAll('[data-thumb]')
                  // const activeThumb = thumbsSlider.el.querySelector('[data-thumb].active')
  
                  // activeThumb.classList.remove('active')
                  // thumbs[index].classList.add('active')
                  thumbsSlider.slideTo(index)
                }
              }
            };
            break;
          case 'none':
            slider_options = {
              slidesPerView:  'auto',
            }
            break;
        case 2:
          slider_options = {
            ...slider_options,
            loop: true,
          };
          break;
      }

      slider_swiper = new Swiper(slider_el[0], slider_options);

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
