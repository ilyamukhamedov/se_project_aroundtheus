// export default class Card {
//   constructor({ name, link }, cardSelector) {
//     this._name = name;
//     this._link = link;
//     this._cardSelector = cardSelector;
//   }

//   _setEventListeners() {
//     this._cardElement
//       .querySelector(".card__like-button")
//       .addEventListener("click", () => {
//         this._handleLikeIcon();
//       });
//     this._cardElement
//       .querySelector(".card__delete-button")
//       .addEventListener("click", () => {
//         this._handleDeleteCard();
//       });
//   }

//   _handleLikeIcon() {
//     this._cardElement
//       .querySelector(".card__like-button")
//       .classList.toggle("card__like-button_active");
//   }

//   _handleDeleteCard() {
//     this._cardElement.remove();
//     this._cardElement = null;
//   }

//   getView() {
//     this._cardElement = document
//       .querySelector(this._cardSelector)
//       .content.querySelector(".card")
//       .cloneNode(true);

//     this._setEventListeners();
//   }
// }

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._cardElement.querySelector(".card__image");
    const cardTitle = this._cardElement.querySelector(".card__title");

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._cardElement;
  }
}
