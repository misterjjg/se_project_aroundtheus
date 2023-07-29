export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(input) {
    const errorMessageElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = input.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    input.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  _checkInputValidity(_form, input, _settings) {
    if (!input.validity.valid) {
      this._showInputError(this._form, input, this._settings);
    } else {
      this._hideInputError(this._form, input, this._settings);
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((input) => input.validity.valid);
  }

  _enableButton() {
    this.button.classList.remove(this._inactiveButtonClass);
    this.button.disabled = false;
  }

  _disableButton() {
    this.button.classList.add(this._inactiveButtonClass);
    this.button.disabled = true;
    return;
  }

  _toggleButtonState() {
    const inputList = [...this.form.querySelectorAll(this._inputSelector)];
    this.button = this._form.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      this._disableButton();
      return;
    }
    this._enableButton();
  }

  _setEventListeners() {
    const inputList = [...this.form.querySelectorAll(this._inputSelector)];
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, submitButton, settings);

    inputList.forEach((input) => {
      input.addEventListener("input", (e) => {
        this._checkInputValidity(this._form, input, this._settings);
        this._toggleButtonState(inputList, submitButton, this._settings);
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
