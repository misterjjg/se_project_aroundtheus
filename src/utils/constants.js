// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];

// Profile Edit Variables
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");

// Cards Variables
export const cardList = document.querySelector(".cards__list");

// Add New Card Variables
export const addNewCardButton = document.querySelector("#profile-add-button");
export const addNewCardModal = document.querySelector("#add-card-modal");
export const addNewCardForm = addNewCardModal.querySelector(".modal__form");

// Validation
export const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Selectors
export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#card-template",
  previewModal: "#preview-modal",
  addCardPopupSelector: "#add-card-modal",
  profilePopupSelector: "#profile-edit-modal",
  avatarPopupSelector: "#avatar-edit-modal",
};

//Avatar Variables
export const avatarEditForm = document.querySelector("#avatar-edit-form");
export const avatarEditButton = document.querySelector(
  "#profile-avatar__image-button"
);
