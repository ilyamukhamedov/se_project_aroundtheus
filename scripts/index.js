const initialCards = [
  {
    name: "Ice Castles",
    link: "https://images.unsplash.com/photo-1695378201929-c7e68a8102bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2824&q=80",
  },
  {
    name: "Red stairs",
    link: "https://plus.unsplash.com/premium_photo-1691030924668-ffa1ba97d532?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
  {
    name: "House on a tree",
    link: "https://images.unsplash.com/photo-1547393429-098dd122091a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
  {
    name: "Tower",
    link: "https://images.unsplash.com/photo-1694774433072-d6f07979e3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
  {
    name: "Night town",
    link: "https://images.unsplash.com/photo-1695249747530-57460a88ad80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
  {
    name: "Canyon",
    link: "https://images.unsplash.com/photo-1505521377774-103a8cc2f735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
  },
];

const profileEditButton = document.querySelector("#profile-edit-button");
const editModal = document.querySelector("#modal-edit");
const modalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileParagraph = document.querySelector(".profile__paragraph");
const inputTitle = document.querySelector("#input-title");
const inputParagraph = document.querySelector("#input-paragraph");
const profileFormElement = editModal.querySelector(".modal__form");
const cardList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

function closeForm() {
  editModal.classList.remove("modal_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileParagraph.textContent = inputParagraph.value;
  closeForm();
}

function getCardElement(Data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = Data.name;
  cardImage.src = Data.link;
  cardImage.alt = Data.name;
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  inputTitle.value = profileTitle.textContent;
  inputParagraph.value = profileParagraph.textContent;
  editModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closeForm);
profileFormElement.addEventListener("submit", handleFormSubmit);

initialCards.forEach((Data) => {
  const cardElement = getCardElement(Data);
  cardList.append(cardElement);
});
