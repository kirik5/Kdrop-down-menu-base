export default class DropDownMenu {
    constructor({
        menu,
        background
    }) {
        this._menu = document.querySelector(menu)
        this._background = document.querySelector(background)
        this._menu.addEventListener('click', this._menuClickHandler)
    }

    _showSubmenu = (submenu, button) => {
        const container = button.parentElement.parentElement
        this._hideAllSubmenus(container)

        submenu.classList.remove('anim-target')
        button.dataset.showedsub = true

        this._showBackground()
    }

    _hideSubmenu = (submenu, button) => {
        submenu.classList.add('anim-target')
        button.removeAttribute('data-showedsub')

        this._hideBackground()
    }

    _menuClickHandler = evt => {
        this._button = evt.target.closest('.menu__button')
        
        if (!this._button) {
            this._hideAllSubmenus(this._menu)
            this._hideBackground()
            return
        }

        this._submenu = this._button.nextElementSibling


        if (!this._button.dataset.showedsub) {
            this._showSubmenu(this._submenu, this._button)
        } else {
            this._hideSubmenu(this._submenu, this._button)
        }
    }

    _hideAllSubmenus = (container) => {
        const buttons = container.querySelectorAll('[data-showedsub]')

        if (buttons.length === 0) return

        const upButton = buttons[0]
        const upSubmenu = buttons[0].nextElementSibling
        const nestedButtons = [...buttons].splice(1)

        this._hideSubmenu(upSubmenu, upButton)

        if (nestedButtons.length === 0) return

        nestedButtons.forEach(elem => {
            elem.removeAttribute('data-showedsub')
            elem.nextElementSibling.classList.add('anim-target')
        })
    }

    _showBackground = () => {
        const activeButtons = this._menu.querySelectorAll('[data-showedsub]')
        if (activeButtons.length === 0) return

        this._background.classList.remove('anim-target')
    }

    _hideBackground = () => {
        const allActiveButtons = this._menu.querySelectorAll('[data-showedsub]')
        if (allActiveButtons.length !== 0) return

        this._background.classList.add('anim-target')
    }
}