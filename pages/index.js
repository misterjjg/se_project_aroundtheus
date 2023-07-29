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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Add New Card
const addNewCardButton = document.querySelector("#profile-add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardForm = addNewCardModal.querySelector(".modal__form");
const addNewCardTitleInput = document.querySelector("#add-card-title-input");
const addNewCardUrlInput = document.querySelector("#add-card-url-input");

// Preview
const cardImage = document.querySelector(".modal__preview-image");
const cardCaption = document.querySelector(".modal__caption");
const previewCardModal = document.querySelector("#preview-modal");

// Functions
// function openPopup(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscape);
// }

// function closePopup(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscape);
// }

// function handleEscape(e) {
//   if (e.key === "Escape") {
//     const openedPopup = document.querySelector(".modal_opened");
//     closePopup(openedPopup);
//   }
// }

// function handlePopupClose(e) {
//   if (
//     e.target.classList.contains("modal") ||
//     e.target.classList.contains("modal__close-button")
//   ) {
//     closePopup(e.currentTarget);
//   }
// }

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

// function renderCard(cardData, cardList) {
//   const cardElement = getCardElement(cardData);
//   cardList.prepend(cardElement);
// }

function handleAddNewCardSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: addNewCardTitleInput.value,
    link: addNewCardUrlInput.value,
  };
  const cardElement = renderCard(cardData);
  cardList.prepend(cardElement);
  closePopup(addNewCardModal);
  addNewCardForm.reset();
}

// function handlePreviewCard(cardData) {
//   cardImage.src = cardData.link;
//   cardImage.alt = cardData.name;
//   cardCaption.textContent = cardData.name;
//   openPopup(previewCardModal);
// }

// function handleDeleteCard(e) {
//   e.target.closest(".cards__content").remove();
// }

// function handleLikeIcon(e) {
//   e.target.classList.toggle("cards__like-button_active");
// }

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector(".cards__image");
//   const cardTitle = cardElement.querySelector(".cards__title");
//   const likeButton = cardElement.querySelector(".cards__like-button");
//   const deleteButton = cardElement.querySelector(".cards__delete-button");

//   likeButton.addEventListener("click", handleLikeIcon);

//   deleteButton.addEventListener("click", handleDeleteCard);

//   cardImage.addEventListener("click", () => handlePreviewCard(cardData));

//   cardImage.src = cardData.link;
//   cardImage.alt = cardData.name;
//   cardTitle.textContent = cardData.name;
//   return cardElement;
// }

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template");
  card.getView();
}

initialCards.forEach((cardData) => renderCard(cardData, cardList));

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

export { previewCardModal, cardCaption, cardImage };
