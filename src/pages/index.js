import "../pages/index.css";

import {
  selectors,
  config,
  profileEditButton,
  addNewCardButton,
  changeImageButton,
  inputName,
  inputDescription,
} from "../utils/constants.js";

import Api from "../components/Api.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

// API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9aa267fe-3315-41ab-a072-2d6dbd5ca77b",
    "Content-Type": "application/json",
  },
});

let cardSection;

api
  .getAppInfo()
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: initialCards.reverse(),
        renderer: (data) => {
          const card = renderCard(data);
          cardSection.addItem(card);
        },
      },
      selectors.cardList
    );
    cardSection.renderItems();
  })
  .catch(console.error);

// Validation

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    if (formName) {
      formValidators[formName] = validator;
      validator.enableValidation();
    }
  });
};

// Create Instances

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileParagraph,
  selectors.profileImage
);

const deleteCardPopup = new PopupWithConfirm(selectors.deleteCardPopup);

const addCardPopup = new PopupWithForm(
  selectors.addFormPopup,
  handleAddFormSubmit
);

const profileEditPopup = new PopupWithForm(
  selectors.editFormPopup,
  handleProfileFormSubmit
);

const updateAvatarPopup = new PopupWithForm(
  selectors.changeImagePopup,
  handleAvatarFormSubmit
);

// Functions

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.setLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.setLoading(false);
    });
}

function handleProfileFormSubmit(userData) {
  function makeRequest() {
    return api.updateUserInfo(userData).then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about);
    });
  }
  handleSubmit(makeRequest, profileEditPopup);
}

function handleAddFormSubmit(cardData) {
  function makeRequest() {
    return api.createNewCard(cardData).then((res) => {
      const card = renderCard(res);
      cardSection.addItem(card);
      addCardPopup.reset();
    });
  }
  handleSubmit(makeRequest, addCardPopup);
}

function handleAvatarFormSubmit(data) {
  function makeRequest() {
    return api.updateAvatar(data.link).then((user) => {
      userInfo.setAvatar(user.avatar);
      updateAvatarPopup.reset();
    });
  }
  handleSubmit(makeRequest, updateAvatarPopup);
}

function fillProfileForm() {
  const { name, about } = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = about;
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .dislikeCard(card.id)
      .then(() => {
        card.updateLikes();
      })
      .catch(console.error);
  } else {
    api
      .likeCard(card.id)
      .then(() => {
        card.updateLikes(card.id);
      })
      .catch(console.error);
  }
}

function handleImageClick(imageData) {
  cardPreviewPopup.open(imageData);
}

function handleDeleteButton(cardID, card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setLoading(true);
    api
      .deleteCard(cardID)
      .then(() => {
        card.removeCard();
        deleteCardPopup.close();
      })
      .catch(console.error)
      .finally(() => {
        deleteCardPopup.setLoading(false);
      });
  });
}

function renderCard(data) {
  const card = new Card(
    data,
    selectors.cardTemplate,
    handleImageClick,
    handleLikeClick,
    handleDeleteButton
  );
  return card.generateCard();
}

// Event Listeners

changeImageButton.addEventListener("click", () => {
  updateAvatarPopup.open();
});

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  formValidators[selectors.profileForm].resetFormValidation();
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Initialize instances

updateAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
profileEditPopup.setEventListeners();
deleteCardPopup.setEventListeners();
cardPreviewPopup.setEventListeners();

enableValidation(config);
