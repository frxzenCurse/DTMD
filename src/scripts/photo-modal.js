import { defaults } from './fancybox'

document.addEventListener('DOMContentLoaded', () => {
  const photos = document.querySelectorAll('[data-photo-btn]')

  photos.forEach(photo => {
    const img = photo.querySelector('img')
    const src = img.getAttribute('src')
    const modal = document.querySelector('[data-fancy-modal="photo"]')
    const options = {
      ...defaults,
      beforeShow: function(instance, slide) {
        const image = slide.src.querySelector('img')
        console.log(src)
        image.setAttribute('src', src)
      }
    }

    img.onclick = () => {
      // console.log(src)
      $.fancybox.defaults = {...$.fancybox.defaults, ...options}
      $.fancybox.open($(modal))
    }
  })
})