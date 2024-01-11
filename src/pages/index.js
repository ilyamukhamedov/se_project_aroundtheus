import "../pages/index.css";

import {
  selectors,
  config,
  profileEditButton,
  addNewCardButton,
  changeImageButton,
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
  .catch((err) => {
    console.error(err);
  });

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

const addCardPopup = new PopupWithForm(selectors.addFormPopup, (cardData) => {
  addCardPopup.setLoading(true);
  api
    .createNewCard(cardData)
    .then((res) => {
      const card = renderCard(res);
      cardSection.addItem(card);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopup.setLoading(false);
    });
});

const ProfileEditPopup = new PopupWithForm(
  selectors.editFormPopup,
  (userData) => {
    ProfileEditPopup.setLoading(true);
    api
      .updateUserInfo(userData)
      .then(() => {
        userInfo.setUserInfo(userData.name, userData.about);
        ProfileEditPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        ProfileEditPopup.setLoading(false);
      });
  }
);

const updateAvatarPopup = new PopupWithForm(
  selectors.changeImagePopup,
  (data) => {
    updateAvatarPopup.setLoading(true);
    api
      .updateAvatar(data.link)
      .then((user) => {
        userInfo.setAvatar(user.avatar);
        updateAvatarPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        updateAvatarPopup.setLoading(false);
      });
  }
);

// Functions

function fillProfileForm() {
  const { name, about } = userInfo.getUserInfo();
  document.querySelector(selectors.inputName).value = name;
  document.querySelector(selectors.inputDescription).value = about;
}

function handleLikeClick(card) {
  if (card._isLiked) {
    api
      .dislikeCard(card._id)
      .then(() => {
        card.updateLikes();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(card._id)
      .then(() => {
        card.updateLikes(card._id);
      })
      .catch((err) => {
        console.error(err);
      });
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
      .catch((err) => {
        console.log(err);
      })
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
  ProfileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Initialize instances

updateAvatarPopup.setEventListeners();
addCardPopup.setEventListeners();
ProfileEditPopup.setEventListeners();
deleteCardPopup.setEventListeners();
cardPreviewPopup.setEventListeners();

enableValidation(config);
