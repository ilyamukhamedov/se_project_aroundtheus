import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImage = this._popupElement.querySelector(".modal__image");
    this._previewTitle = this._popupElement.querySelector("#modal-preview");
  }
  open(data) {
    this._previewTitle.textContent = data.name;
    this._previewImage.src = data.link;
    this._previewImage.alt = data.name;
    super.open();
  }
}
