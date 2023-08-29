import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button_delete");
    this._submitButtonText = this._submitButton.textContent;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setLoadingButton(isLoading, loadingText = "Removing...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._submitButtonText;
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitForm = (e) => {
      e.preventDefault();
      this._handleFormSubmit(e);
    };

    this._popupForm.addEventListener("submit", this._submitForm);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupForm.removeEventListeners("submit", this._submitForm);
  }
}
