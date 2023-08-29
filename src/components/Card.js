// import { openPopup } from "../utils/utils.js";
// import { previewCardModal } from "../pages/index.js";
// const cardImage = document.querySelector(".modal__preview-image");
// const cardCaption = document.querySelector(".modal__caption");

export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this.isLiked = data.isLiked;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    // ".cards__like-button";
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".cards__delete-button"
    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //#preview-modal
    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handlePreviewDisplay();
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _toggleLikeButton() {
    if (this.isLiked) {
      this._likeButton.classList.add("cards__like-button_active");
    } else {
      this._likeButton.classList.remove("cards__like-button_active");
    }
  }

  updateLikeIcon(isLiked) {
    this.isLiked = isLiked;
    this._toggleLikeButton();
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  removeCardElement() {
    this._cardElement.remove();
  }

  _handlePreviewDisplay() {
    this._handleCardClick(this._name, this._link);
  }

  _getTemplate() {
    return document
      .querySelector(`${this._templateSelector}`)
      .content.querySelector(".cards__content")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    const cardImage = this._cardElement.querySelector(".cards__image");
    const cardTitle = this._cardElement.querySelector(".cards__title");
    this._likeButton = this._cardElement.querySelector(".cards__like-button");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
