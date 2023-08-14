import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

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

// Profile Edit Variables
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// Cards Variables
const cardList = document.querySelector(".cards__list");

// Add New Card Variables
const addNewCardButton = document.querySelector("#profile-add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardForm = addNewCardModal.querySelector(".modal__form");

// Preview Card Varibales
const previewCardModal = document.querySelector("#preview-modal");

// Functions

function handleProfileFormSubmit(inputValue) {
  userInfo.setUserInfo(inputValue);
  profileEditPopup.close();
}

function handleNewCardSubmit(inputValues) {
  const { name, link } = inputValues;
  const newCardElement = renderCard({ name, link });
  section.addItem(newCardElement);
  addNewCardPopup.close();
}

function handleCardClick({ name, link }) {
  cardPreviewPopup.open(name, link);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  const cardElement = card.getView();
  cardList.prepend(cardElement);
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  const { profileName, description } = userInfo.getUserInfo();
  profileTitleInput.value = profileName;
  profileDescriptionInput.value = description;
  profileEditPopup.open();
  editFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  addNewCardPopup.open();
  addFormValidator.resetValidation();
});

//Card Section
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = renderCard(cardData);
      section.addItem(cardElement);
    },
  },
  cardList
);

section.renderItems();

//Edit Profile Form
const userInfo = new UserInfo(
  document.querySelector(".profile__title"),
  document.querySelector(".profile__description")
);

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

//Add New Card
const addNewCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleNewCardSubmit
);

//Preview Card
const cardPreviewPopup = new PopupWithImage("#preview-modal");

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
