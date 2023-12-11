import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Ice castles",
    link: "https://images.unsplash.com/photo-1695378201929-c7e68a8102bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2824&q=80",
  },
  {
    name: "Pink walls",
    link: "https://images.unsplash.com/photo-1696075619091-dedae25b1f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2830&q=80",
  },
  {
    name: "House on a tree",
    link: "https://images.unsplash.com/photo-1547393429-098dd122091a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
  {
    name: "Church of Hallgrimur",
    link: "https://images.unsplash.com/photo-1694774433072-d6f07979e3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
  {
    name: "Night town",
    link: "https://images.unsplash.com/photo-1695249747530-57460a88ad80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
  {
    name: "Antelope canyon",
    link: "https://images.unsplash.com/photo-1505521377774-103a8cc2f735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
];

const cardList = document.querySelector(".cards__list");
const editModal = document.querySelector("#modal-edit");
const addModal = document.querySelector("#modal-add");
const imageModal = document.querySelector("#modal-image");
const profileFormElement = document.forms["profile-form"];
const addFormElement = document.forms["add-form"];
const previewImage = imageModal.querySelector(".modal__image");
const previewTitle = imageModal.querySelector("#modal-preview");
const modals = document.querySelectorAll(".modal");

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileParagraph = document.querySelector(".profile__paragraph");

const inputName = document.querySelector("#input-name");
const inputDescription = document.querySelector("#input-description");
const inputTitle = addFormElement.querySelector("#input-title");
const inputUrl = addFormElement.querySelector("#input-url");

function closeModal(form) {
  form.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
}

function openModal(form) {
  form.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
}

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close-button")) {
      closeModal(modal);
    }
  });
});

function createCard(item) {
  const cardElement = new Card(item, "#card-template", handleImageClick);
  return cardElement.generateCard();
}

function renderCard(data, wrapper) {
  const card = createCard(data);
  wrapper.prepend(card);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileParagraph.textContent = inputDescription.value;
  closeModal(editModal);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputUrl.value;
  renderCard({ name, link }, cardList);
  closeModal(addModal);
  evt.target.reset();
}

function handleImageClick(data) {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewTitle.textContent = data.name;
  openModal(imageModal);
}

function fillProfileForm() {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileParagraph.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  formValidators["profile-form"].resetFormValidation();
  openModal(editModal);
}

profileFormElement.addEventListener("submit", handleEditFormSubmit);

addFormElement.addEventListener("submit", handleAddFormSubmit);

profileEditButton.addEventListener("click", openEditProfileModal);

addNewCardButton.addEventListener("click", () => openModal(addModal));

initialCards.forEach((data) => renderCard(data, cardList));

// VALIDATION //
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

enableValidation(config);
