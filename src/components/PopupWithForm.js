import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {}

  setEventListeners() {
    super(setEventListeners);
  }
}
