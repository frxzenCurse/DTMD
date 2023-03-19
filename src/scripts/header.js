
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
})