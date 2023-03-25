
export class Counter {
  constructor(selector) {
    this.root = selector
    this.plus = this.root.querySelector('[data-count-plus]')
    this.minus = this.root.querySelector('[data-count-minus]')
    this.number = this.root.querySelector('[data-count-num]')
    this.maxCount = this.root.getAttribute('data-max-count') || Infinity

    this.init()
    this.setDisabled()
  }

  init() {
    this.root.addEventListener('click', e => {
      const target = e.target.closest('.counter__btn')

      if (target === this.minus) {
        if (!target.classList.contains('disabled')) {
          this.number.textContent = +this.number.textContent - 1
        }
      }

      if (target === this.plus) {
        if (!target.classList.contains('disabled')) {
          this.number.textContent = +this.number.textContent + 1
        }
      }

      this.setDisabled()
    })
  }

  setDisabled() {
    if (+this.maxCount === +this.number.textContent) {
      this.plus.classList.add('disabled')
    } else {
      this.plus.classList.remove('disabled')
    }

    if (this.number.textContent < 2) {
      this.minus.classList.add('disabled')
    } else {
      this.minus.classList.remove('disabled')
    }
  }
}

$(() => {
  const counters = document.querySelectorAll('.counter')

  counters.forEach(item => {
    const counter = new Counter(item)
  })
})

