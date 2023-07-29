import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { closePopup, openPopup, handlePopupClose } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Profile Edit
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Cards
const cardList = document.querySelector(".cards__list");

// Add New Card
const addNewCardButton = document.querySelector("#profile-add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardForm = addNewCardModal.querySelector(".modal__form");
const addNewCardTitleInput = document.querySelector("#add-card-title-input");
const addNewCardUrlInput = document.querySelector("#add-card-url-input");

// Preview Card
const previewCardModal = document.querySelector("#preview-modal");

// Functions

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddNewCardSubmit(e) {
  e.preventDefault();
  const name = addNewCardTitleInput.value;
  const link = addNewCardUrlInput.value;

  renderCard({ name, link }, cardList);
  closePopup(addNewCardModal);
  addNewCardForm.reset();
  addFormValidator._toggleButtonState();
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.getView();
  cardList.prepend(cardElement);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openPopup(addNewCardModal));

addNewCardForm.addEventListener("submit", handleAddNewCardSubmit);

[profileEditModal, previewCardModal, addNewCardModal].forEach(
  (modalElement) => {
    modalElement.addEventListener("click", handlePopupClose);
  }
);

// Validation
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addNewCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

initialCards.forEach((cardData) => renderCard(cardData, cardList));

export { previewCardModal };
