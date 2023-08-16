export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeByEscape = this._closeByEscape.bind(this);
    this._popupCloseButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    // this._closeByMouseClick = this._closeByMouseClick.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeByEscape);
    // this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    // this._popupElement.removeEventListener("click", this._closeByMouseClick);
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _closeByEscape = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modal__close-button")
      ) {
        this.close(e.currentTarget);
      }
    });

    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
}
