import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  cardList,
  addNewCardButton,
  addNewCardForm,
  validationSettings,
  profileEditForm,
} from "../utils/constants.js";
import "../pages/index.css";

//Card Section Instance
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

//Edit Profile Form Instance
const userInfo = new UserInfo(
  document.querySelector(".profile__title"),
  document.querySelector(".profile__description")
);

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

//Add New Card Instance
const addNewCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleNewCardSubmit
);

//Preview Card Instance
const cardPreviewPopup = new PopupWithImage("#preview-modal");

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addNewCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Functions

function handleProfileFormSubmit(inputValues) {
  const { title, description } = inputValues;
  userInfo.setUserInfo(title, description);
  profileEditPopup.close();
}

function handleNewCardSubmit(inputValues) {
  const { title, url } = inputValues;
  const newCardData = renderCard({ name: title, link: url });
  section.addItem(newCardData);
  addNewCardPopup.close();
}

function handleCardClick(caption, imageUrl) {
  cardPreviewPopup.open(caption, imageUrl);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getView();
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

profileEditPopup.setEventListeners();
addNewCardPopup.setEventListeners();
cardPreviewPopup.setEventListeners();
