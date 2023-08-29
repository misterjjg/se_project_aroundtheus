import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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

//Api
const backendUrl = "https://around-api.en.tripleten-services.com/v1";
const validation = "67d17471-1da7-4346-ba00-92490de8ca42";

const api = new Api({
  baseUrl: backendUrl,
  headers: {
    authorization: validation,
    "Content-Type": "application/json",
  },
});

//Card Section Instance
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    section = new Section(
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
  })
  .catch(console.error);

// const section = new Section(
//   {
//     items: initialCards,
//     renderer: (cardData) => {
//       const cardElement = renderCard(cardData);
//       section.addItem(cardElement);
//     },
//   },
//   cardList
// );

// section.renderItems();

//Edit Profile Form Instance
const userInfo = new UserInfo(
  document.querySelector(".profile__title"),
  document.querySelector(".profile__description"),
  document.querySelector(".profile__image")
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

//Delete Card Instance
const cardDeletePopup = new PopupWithConfirmation("#delete-card-modal");

//Avatar Edit Instance
const avatarEditPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarFormSubmit
);

// Functions

function handleAvatarFormSubmit({ url }) {
  avatarEditPopup.setLoadingButton(true);
  api
    .setUserAvatar(url)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      avatarEditPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      avatarEditPopup.setLoadingButton(false);
    });
}

function handleProfileFormSubmit(inputValues) {
  const { title, description } = inputValues;
  profileEditPopup.setLoadingButton(true);
  api
    .setUserInfo(titel, description)
    .then(() => {
      userInfo.setUserInfo(title, description);
      profileEditPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      profileEditPopup.setLoadingButton(false);
    });
}

function handleNewCardSubmit(inputValues) {
  const { name, link } = inputValues;
  addNewCardPopup.setLoadingButton(true);
  api
    .addNewCard({ name, link })
    .then((cardData) => {
      const newCardData = renderCard(cardData);
      section.addItem(newCardData);
      addNewCardPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      addNewCardPopup.setLoadingButton(false);
    });
}

function handleCardClick(caption, imageUrl) {
  cardPreviewPopup.open(caption, imageUrl);
}

function renderCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    function handleDeleteClick() {
      cardDeletePopup.setSubmitAction(() => {
        cardDeletePopup.setLoadingButton(true);
        api
          .deleteCard(cardData._id)
          .then((res) => {
            cardElement.removeCardElement(res._id);
            cardDeletePopup.close();
          })
          .catch(console.error)
          .finally(() => {
            cardDeletePopup.setLoadingButton(false);
          });
      });
      cardDeletePopup.open();
    },
    function handleLikeClick() {
      api
        .changeLikeButton(cardData._id, cardElement.isLiked)
        .then((res) => cardElement.updateLikeIcon(res.isLiked))
        .catch(console.error);
    }
  );
  return cardElement.getView();
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
