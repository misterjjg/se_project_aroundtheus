export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeByEscape = this._closeByEscape.bind(this);
    this._closeByMouseClick = this._closeByMouseClick.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("click", this._closeByMouseClick);
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _closeByEscape = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  _closeByMouseClick = (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("modal__close-button")
    ) {
      this.close(e.currentTarget);
    }
  };

  setEventListeners() {
    document.addEventListener("keydown", this._closeByEscape);
    this._popupElement.addEventListener("click", this._closeByMouseClick);
  }
}
