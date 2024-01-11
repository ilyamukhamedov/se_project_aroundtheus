// export const initialCards = [
//   {
//     name: "Ice castles",
//     link: "https://images.unsplash.com/photo-1695378201929-c7e68a8102bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2824&q=80",
//   },
//   {
//     name: "Pink walls",
//     link: "https://images.unsplash.com/photo-1696075619091-dedae25b1f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2830&q=80",
//   },
//   {
//     name: "House on a tree",
//     link: "https://images.unsplash.com/photo-1547393429-098dd122091a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
//   },
//   {
//     name: "Church of Hallgrimur",
//     link: "https://images.unsplash.com/photo-1694774433072-d6f07979e3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
//   },
//   {
//     name: "Night town",
//     link: "https://images.unsplash.com/photo-1695249747530-57460a88ad80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
//   },
//   {
//     name: "Antelope canyon",
//     link: "https://images.unsplash.com/photo-1505521377774-103a8cc2f735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
//   },
// ];

export const profileEditButton = document.querySelector("#profile-edit-button");
export const addNewCardButton = document.querySelector("#profile-add-button");
export const changeImageButton = document.querySelector(
  "#profile-image-button"
);

export const inputName = document.querySelector("#input-name");
export const inputDescription = document.querySelector("#input-description");

export const selectors = {
  cardList: ".cards__list",
  editFormPopup: "#modal-edit",
  addFormPopup: "#modal-add",
  deleteCardPopup: "#modal-confirm",
  changeImagePopup: "#modal-profile-image",
  previewPopup: "#modal-image",
  profileForm: "profile-form",
  profileTitle: ".profile__title",
  profileParagraph: ".profile__paragraph",
  profileImage: ".profile__image",
  cardTemplate: "#card-template",
};

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
