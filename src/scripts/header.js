
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header')
  
  // scroll
  checkScroll()

  window.addEventListener('scroll', checkScroll)

  function checkScroll() {
    const scrollPos = window.scrollY

    if (scrollPos < 1) {
      header.classList.remove('header--scroll')
    } else {
      header.classList.add('header--scroll')
    }
  }

  // menu
  const menuBtn = header.querySelector('[data-header-btn]')

  menuBtn.onclick = function() {
    header.classList.toggle('header--menu')
    document.body.classList.toggle('body--hidden')
  }

  const catalogBtn = document.querySelector('[data-header-catalog]')
  // catalog
  window.addEventListener('click', event => {
    const target = event.target.closest('[data-header-catalog]')

    if (target) {
      catalogBtn.classList.toggle('active')
    } else {
      catalogBtn.classList.remove('active')
    }
  })
})