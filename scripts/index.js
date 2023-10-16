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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardList = document.querySelector(".cards__list");
const editModal = document.querySelector("#modal-edit");
const addModal = document.querySelector("#modal-add");
const imageModal = document.querySelector("#modal-image");
const profileFormElement = editModal.querySelector(".modal__form");
const addFormElement = addModal.querySelector(".modal__form");
const previewImage = imageModal.querySelector(".modal__image");
const previewTitle = imageModal.querySelector("#modal-preview");

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#profile__add-button");
const editCloseButton = editModal.querySelector("#modal-close-button");
const addCloseButton = addModal.querySelector("#add-close-button");
const imageCloseButton = imageModal.querySelector("#image-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileParagraph = document.querySelector(".profile__paragraph");

const inputName = document.querySelector("#input-name");
const inputDescription = document.querySelector("#input-description");
const inputTitle = addFormElement.querySelector("#input-title");
const inputUrl = addFormElement.querySelector("#input-url");

function closeForm(form) {
  form.classList.remove("modal_opened");
}

function openForm(form) {
  form.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileParagraph.textContent = inputDescription.value;
  closeForm(editModal);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = inputTitle.value;
  const link = inputUrl.value;
  renderCard({ name, link }, cardList);
  closeForm(addModal);
  inputTitle.value = "";
  inputUrl.value = "";
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => cardElement.remove());

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openForm(imageModal);
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

profileFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);

profileEditButton.addEventListener("click", () => {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileParagraph.textContent;
  openForm(editModal);
});

editCloseButton.addEventListener("click", () => closeForm(editModal));

addNewCardButton.addEventListener("click", () => openForm(addModal));

addCloseButton.addEventListener("click", () => closeForm(addModal));

imageCloseButton.addEventListener("click", () => closeForm(imageModal));

initialCards.forEach((cardData) => renderCard(cardData, cardList));
