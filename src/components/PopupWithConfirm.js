import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setLoading(isLoadingjow) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
