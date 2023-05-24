import { mediaQuery } from './mediaQueries';

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('[data-accordion]')

  accordions.forEach(item => {
    const drop = item.querySelector('[data-accordion-dropdown]')
    const button = item.querySelector('[data-accordion-button]')
    const isCatalog = item.hasAttribute('data-catalog-accordion')

    button.onclick = function() {
      if (isCatalog) {
        const activeAccordion = document.querySelector('[data-catalog-accordion].active')

        if (activeAccordion && item !== activeAccordion) {
          $(activeAccordion.querySelector('[data-accordion-dropdown]')).slideUp()
          activeAccordion.classList.remove('active')
        }
      }
      $(drop).slideToggle()
      item.classList.toggle('active')

    }
  })
  // card page
  const cardAccordions = document.querySelector('[data-card-accordions]')

  if (cardAccordions && !mediaQuery.matches) {
    const items = cardAccordions.querySelectorAll('[data-accordion]')

    items.forEach(item => {
      const drop = item.querySelector('[data-accordion-dropdown]')
      
      item.classList.remove('active')
      $(drop).slideUp()
    })
  }
})

