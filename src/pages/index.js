import "../pages/index.css";

import {
  initialCards,
  selectors,
  config,
  profileEditButton,
  addNewCardButton,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

// Create instances
const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileParagraph
);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = new Card(data, selectors.cardTemplate, (data) => {
        cardPreviewPopup.open(data);
      });
      cardSection.addItem(cardElement.generateCard());
    },
  },
  selectors.cardList
);

const userInfoPopup = new PopupWithForm(selectors.editFormPopup, (data) => {
  userInfo.setUserInfo(data);
});

const newCardPopup = new PopupWithForm(selectors.addFormPopup, (data) => {
  const card = new Card(data, selectors.cardTemplate, () => {
    cardPreviewPopup.open(data);
  });
  cardSection.addItem(card.generateCard());
});

// VALIDATION //
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

//Event Listeners
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  formValidators[selectors.profileForm].resetFormValidation();
  userInfoPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

function fillProfileForm() {
  const { name, description } = userInfo.getUserInfo();
  document.querySelector(selectors.inputName).value = name;
  document.querySelector(selectors.inputDescription).value = description;
}

// Initialize instances
userInfoPopup.setEventListeners();
cardPreviewPopup.setEventListeners();
newCardPopup.setEventListeners();

cardSection.renderItems(initialCards);
enableValidation(config);
