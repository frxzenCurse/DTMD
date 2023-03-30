// function accordionDropdown(e, root) {
//   const accordion = $(root)
//   const target = $(e.target)

//   if (target.closest('[data-accordion-button]').length) {
//     target.closest(accordion).toggleClass('active');
//     target.closest(accordion).find('[data-accordion-dropdown]').eq(0).slideToggle()
//   }
// }

// $(() => {
//   window.addEventListener('click', (e) => {
//     accordionDropdown(e, '[data-accordion]')
//   })
// })

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('[data-accordion]')

  accordions.forEach(item => {
    const drop = item.querySelector('[data-accordion-dropdown]')
    const button = item.querySelector('[data-accordion-button]')

    button.onclick = function() {
      $(drop).slideToggle()
      item.classList.toggle('active')
    }
  })
})