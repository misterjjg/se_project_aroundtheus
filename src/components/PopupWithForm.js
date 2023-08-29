import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupInputs = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__save-button");
    this._submitButtonText = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  setLoadingButton(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._submitButtonText;
      this._submitButton.disabled = false;
    }
  }

  close() {
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", this._submitForm);
    super.close();
  }

  _getInputValues() {
    const inputs = {};
    this._popupInputs.forEach((input) => {
      if (input.value !== "") {
        inputs[input.name] = input.value;
      }
    });

    return inputs;
  }

  _submitForm = (e) => {
    e.preventDefault();
    const inputValues = this._getInputValues();
    this._handleFormSubmit(inputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this._submitForm);
  }
}
