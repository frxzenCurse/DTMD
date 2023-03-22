
document.addEventListener('DOMContentLoaded', () => {

  const menu = document.querySelector('[data-filters-menu]')

  if (menu) {
    const buttons = document.querySelectorAll('[data-filters-button]')
    
    buttons.forEach(btn => {
      btn.onclick = () => {
        document.body.classList.toggle('body--hidden')
        menu.classList.toggle('active')
      }
    })
  }
})