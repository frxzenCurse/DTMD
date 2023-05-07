document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('[data-search]')

  if (search) {
    const input = search.querySelector('[data-search-input]')
    const items = search.querySelectorAll('[data-search-item]')
    const empty = search.querySelector('[data-search-empty]')

    input.addEventListener('input', inputHandler)
    input.addEventListener('focus', inputHandler)

    function inputHandler() {
      const value = this.value

      if (value) {
        search.classList.add('active')
      } else {
        search.classList.remove('active')
        return
      }

      const reg = new RegExp(value, 'gi')
      const result = findAll(reg)

      if (result.length) {
        empty.classList.add('hidden')
      } else {
        empty.classList.remove('hidden')
      }
    }

    const findAll = function(reg) {
      let res = []

      items.forEach(item => {
        const city = item.textContent

        if (city.match(reg)) {
          res.push(item)
          item.classList.remove('hidden')
        } else {
          item.classList.add('hidden')
        }
      })

      return res;
    }

    items.forEach(item => {
      item.onclick = function() {
        const text = this.textContent

        input.value = text
        search.classList.remove('active')
      }
    })

    window.addEventListener('click', event => {
      const target = event.target.closest('[data-search]')

      if (!target) {
        console.log(321)
        search.classList.remove('active')
      }
    })
  }
})