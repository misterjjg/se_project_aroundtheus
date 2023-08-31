import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  cardList,
  addNewCardButton,
  addNewCardForm,
  validationSettings,
  profileEditForm,
  selectors,
  avatarEditButton,
  avatarEditForm,
} from "../utils/constants.js";
import "../pages/index.css";

const cardSelector = selectors.cardTemplate;

//Api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "67d17471-1da7-4346-ba00-92490de8ca42",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData.avatar);
    userId = userData._id;
    newCardSection = new Section(
      {
        items: cardData,
        renderer: (data) => {
          const newCard = renderCard(data);
          newCardSection.addItem(newCard);
        },
      },
      selectors.cardSection
    );
    newCardSection.renderItems();
  })
  .catch(console.error);

//Card Section Instance
// Promise.all([api.getInitialCards(), api.getUserInfo()])
//   .then(([initialCards, userData]) => {
//     userInfo.setUserInfo(userData.name, userData.about);
//     userInfo.setUserAvatar(userData.avatar);
//     section = new Section(
//       {
//         items: initialCards,
//         renderer: (cardData) => {
//           const cardElement = renderCard(cardData);
//           section.addItem(cardElement);
//         },
//       },
//       cardList
//     );
//     section.renderItems();
//   })
//   .catch(console.error);

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
const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  profileAvatar: ".profile__image",
});

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

//Form Validators
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addNewCardForm);

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//Delete Card Instance
const deleteCardPopup = new PopupWithConfirmation("#delete-modal");

//Avatar Edit Instance
const avatarEditPopup = new PopupWithForm(
  selectors.avatarPopupSelector,
  handleAvatarFormSubmit
);

// Functions
let newCardSection;
let userId;

function handleAvatarFormSubmit(inputValues) {
  avatarEditPopup.renderLoading(true);
  api
    .updateProfileAvatar(inputValues.avatar)
    .then(() => {
      userInfo.setAvatar(inputValues.avatar);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarEditPopup.renderLoading(false, "Save");
    });
}

function handleProfileFormSubmit(inputValues) {
  profileEditPopup.renderLoading(true);
  api
    .updateProfileInfo(inputValues)
    .then(() => {
      userInfo.setUserInfo(inputValues);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false, "Save");
    });
}

function handleNewCardSubmit(inputValues) {
  addNewCardPopup.renderLoading(true);
  api
    .addNewCard(inputValues)
    .then((cardData) => {
      const newCardData = renderCard(cardData);
      newCardSection.addItem(newCardData);
      addNewCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addNewCardPopup.renderLoading(false, "Create");
    });
}

function handleCardClick(cardData) {
  cardPreviewPopup.open(cardData);
}

function renderCard(cardData) {
  const card = new Card(
    cardData.name,
    cardData.link,
    cardData.isLiked,
    cardData.likes,
    cardData._id,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.getView();
}

function handleDeleteClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.renderLoading(true);
    api
      .deleteCard(card.cardId)
      .then(() => {
        card.handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        deleteCardPopup.renderLoading(false);
      });
  });
}

function handleProfileEditClick() {
  const user = userInfo.getUserInfo();
  profileTitleInput.value = user.name;
  profileDescriptionInput.value = user.about;
  profileEditPopup.open();
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .removeCardLikes(card.cardId)
      .then((res) => {
        card.updateLikes(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addCardLikes(card.cardId)
      .then((res) => {
        card.updateLikes(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  handleProfileEditClick();
  editFormValidator.resetValidation();
});

addNewCardButton.addEventListener("click", () => {
  addNewCardPopup.open();
  addFormValidator.resetValidation();
});

avatarEditButton.addEventListener("click", () => {
  avatarFormValidator.toggleButtonState();
  avatarEditPopup.open();
});

profileEditPopup.setEventListeners();
addNewCardPopup.setEventListeners();
cardPreviewPopup.setEventListeners();
avatarEditPopup.setEventListeners();
deleteCardPopup.setEventListeners();
