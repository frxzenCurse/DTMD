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
      const text = option.textContent
      const value = option.getAttribute('value')

      if (text === this.select[this.select.selectedIndex].textContent) {
        this.text.textContent = text
        this.selected = {
          value: value,
          text: text
        }
        this.createItem(text, true)
      } else {
        this.createItem(text)
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

      if (target.classList.contains('custom-select__item')) {

        if (target.classList.contains('active')) return;

        const text = target.textContent.trim()
        this.close()

        this.text.textContent = text
        for (let i = 0; i < this.select.length; i++) {
          if (this.select[i].textContent === text) {
            const value = this.select[i].getAttribute('value')
            this.select.value = value
          }
        }
        this.select.dispatchEvent(new Event('change'))

        setTimeout(() => {
          this.changeActive(text)
          // this.removeItem(value)
          // this.createItem(this.selected.value, this.selected.text)
          this.selected = {
            text: text,
          }
        }, this.SPEED);
      }
    })
  }

  close() {
    this.root.classList.remove('active')
    $(this.dropdown).slideUp(this.SPEED)
  }

  createItem(text, isSelected) {
    const div = document.createElement('div')
    if (isSelected) {
      div.innerHTML = 
        `<div class="custom-select__item active">
        ${text}
        </div>`
    } else {
      div.innerHTML = 
        `<div class="custom-select__item">
        ${text}
        </div>`
    }

    this.list.append(div.firstElementChild)
  }

  changeActive(newText) {
    // const old = this.list.querySelector(`[data-option-value="${this.selected.value}"]`)
    // const newActive = this.list.querySelector(`[data-option-value="${newValue}"]`)
    const items = this.root.querySelectorAll('.custom-select__item')
    let old
    let newActive

    items.forEach(item => {
      if (item.textContent.trim() === newText) {
        newActive = item
      }

      if (item.textContent.trim() === this.selected.text) {
        old = item
      }
    })
    console.log(old)
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