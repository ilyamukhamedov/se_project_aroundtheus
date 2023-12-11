export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;

    this._inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _showInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
      return;
    }
    this._enableButton();
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  resetFormValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._disableButton();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._disableButton();
    });

    this._setEventListeners();
  }
}
