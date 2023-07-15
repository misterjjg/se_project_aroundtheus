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

// Things to do before next project:
// 1) Make all modals universal under the tag popup so there is less code
// 2) Disable the submit button on the add card when there is nothing written (maybe reset validation?)

// Profile Edit
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseModal = document.querySelector("#profile-close-modal");
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
const addNewCardCloseModal = document.querySelector("#add-card-close-modal");
const addNewCardForm = addNewCardModal.querySelector(".modal__form");
const addNewCardTitleInput = document.querySelector("#add-card-title-input");
const addNewCardUrlInput = document.querySelector("#add-card-url-input");
const addNewCardPopup = document.querySelector("#add-card-modal");

// Preview
const cardImage = document.querySelector(".modal__preview-image");
const cardCaption = document.querySelector(".modal__caption");
const previewCardModal = document.querySelector("#preview-modal");
const previewCardCloseButton = previewCardModal.querySelector(
  ".modal__close-button"
);

// Close Button
const closeButtons = document.querySelectorAll(".modal__close-button");

// Functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function renderCard(cardData, cardList) {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
}

function handleAddNewCardSubmit(e) {
  e.preventDefault();
  const name = addNewCardTitleInput.value;
  const link = addNewCardUrlInput.value;
  renderCard({ name, link }, cardList);
  closeModal(addNewCardModal);
  addNewCardForm.reset();
}

function previewCardPicture(cardData) {
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;
  openModal(previewCardModal);
}

function deleteCard(e) {
  e.target.closest(".cards__content").remove();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });

  deleteButton.addEventListener("click", deleteCard);

  cardImage.addEventListener("click", () => previewCardPicture(cardData));

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  return cardElement;
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

addNewCardForm.addEventListener("submit", handleAddNewCardSubmit);

profileEditModal.addEventListener("mousedown", (e) => {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close-button")
  ) {
    closeModal(profileEditModal);
  }
});

previewCardModal.addEventListener("mousedown", (e) => {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close-button")
  ) {
    closeModal(previewCardModal);
  }
});

addNewCardModal.addEventListener("mousedown", (e) => {
  if (
    e.target.classList.contains("modal") ||
    e.target.classList.contains("modal__close-button")
  ) {
    closeModal(addNewCardModal);
  }
});

initialCards.forEach((cardData) => renderCard(cardData, cardList));
