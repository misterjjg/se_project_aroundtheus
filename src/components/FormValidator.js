export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;

    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];

    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(input) {
    const errorMessageElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = input.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorMessageElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
    return;
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._input)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  resetValidation() {
    this.toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}
