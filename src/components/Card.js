// import { openPopup } from "../utils/utils.js";
// import { previewCardModal } from "../pages/index.js";
// const cardImage = document.querySelector(".modal__preview-image");
// const cardCaption = document.querySelector(".modal__caption");

export default class Card {
  constructor(
    name,
    link,
    isLiked,
    likes,
    _id,
    userId,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this.isLiked = isLiked;
    this._likes = likes;
    this.cardId = _id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._getData());
    });
  }

  _renderLikes() {
    if (this.isLiked) {
      this._cardLikeButton.classList.add("cards__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("cards__like-button_active");
    }
  }

  updateLikes(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _showCardLikes() {
    this._cardLikeCounter.textContent = this._likes.length;
    if (this.cardIsLiked()) {
      this._cardLikeButton.classList.add("cards__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("cards__like-button_active");
    }
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);
  }

  _getData() {
    return {
      name: this._name,
      link: this._link,
    };
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector(".cards__image");

    this._cardLikeButton = this._cardElement.querySelector(
      ".cards__like-button"
    );
    this._cardDeleteButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );
    this._cardLikeCounter = this._cardElement.querySelector(".cards__counter");
    this._cardLikeCounter.textContent = this._cardLikesCounter;

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".cards__title").textContent = this._name;

    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }
}
