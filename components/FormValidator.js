export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
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

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    const inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  resetFormValidation() {
    const inputList = [
      ...this._formElement.querySelectorAll(this._inputSelector),
    ];
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.resetFormValidation();
    });
    this._setEventListeners();
  }
}
