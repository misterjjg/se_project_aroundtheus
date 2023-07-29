import { openPopup } from "../utils/utils.js";
import { previewCardModal } from "../pages/index.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // ".cards__like-button";
    this._likeButton = this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".cards__delete-button"
    this._deleteButton = this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //#preview-modal
    this._previewCard = this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => this._handlePreviewCard());
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handlePreviewCard() {
    const cardImage = document.querySelector(".modal__preview-image");
    const cardCaption = document.querySelector(".modal__caption");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardCaption.textContent = this._name;
    openPopup(previewCardModal);
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);
  }

  getView() {
    // get the card view
    this._cardElement = this._getTemplate();

    this._cardImageElement = this._cardElement.querySelector(".cards__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._cardTitleElement = this._cardElement.querySelector(".cards__title");
    this._cardTitleElement.textContent = this._name;
    // set event listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
