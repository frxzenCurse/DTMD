class CustomSelect {
  constructor(root) {
    this.root = root
    this.dropdown = this.root.querySelector('[data-custom-drop]')
    this.select = this.root.querySelector('[data-custom-select]')
    this.text = this.root.querySelector('[data-custom-text]')
    this.list = this.root.querySelector('[data-custom-list]')
    this.selected = {}
    this.SPEED = 400

    this.init()
  }

  init() {
    
    for (let i = 0; i < this.select.length; i++) {
      const option = this.select[i]
      const value = option.getAttribute('value')

      if (value === this.select.value) {
        this.text.textContent = option.textContent
        this.selected = {
          value: value,
          text: option.textContent
        }
        this.createItem(value, option.textContent, true)
      } else {
        this.createItem(value, option.textContent)
      }
    }

    this.handlers()
  }

  handlers() {
    const button = this.root.querySelector('[data-custom-btn]')

    button.onclick = () => {
      this.root.classList.toggle('active')
      $(this.dropdown).slideToggle(this.SPEED)
    }

    window.addEventListener('click', event => {
      const target = event.target

      if (!target.closest('[data-custom-root]')) {
        this.close()
        return
      }

      if (target.hasAttribute('data-option-value')) {

        if (target.classList.contains('active')) return;

        const value = target.getAttribute('data-option-value')
        this.close()

        this.text.textContent = target.textContent
        this.select.value = value
        this.select.dispatchEvent(new Event('change'))

        setTimeout(() => {
          this.changeActive(value)
          // this.removeItem(value)
          // this.createItem(this.selected.value, this.selected.text)
          this.selected = {
            value: value,
            text: target.textContent,
          }
        }, this.SPEED);
      }
    })
  }

  close() {
    this.root.classList.remove('active')
    $(this.dropdown).slideUp(this.SPEED)
  }

  createItem(value, text, isSelected) {
    const div = document.createElement('div')
    if (isSelected) {
      div.innerHTML = 
        `<div class="custom-select__item active" data-option-value="${value}">
        ${text}
        </div>`
    } else {
      div.innerHTML = 
        `<div class="custom-select__item" data-option-value="${value}">
        ${text}
        </div>`
    }

    this.list.append(div.firstElementChild)
  }

  changeActive(newValue) {
    const old = this.list.querySelector(`[data-option-value="${this.selected.value}"]`)
    const newActive = this.list.querySelector(`[data-option-value="${newValue}"]`)
    
    old.classList.remove('active')
    newActive.classList.add('active')
  }

  // removeItem(value) {
  //   const item = this.list.querySelector(`[data-option-value="${value}"]`)
  //   item.remove()
  // }
}

document.addEventListener('DOMContentLoaded', () => {
  const selects = document.querySelectorAll('[data-custom-root]')

  selects.forEach(select => new CustomSelect(select))
})