import { openPopup } from "../utils/utils";
import { previewCardModal, cardCaption, cardImage } from "../pages";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // ".cards__like-button";
    const likeButton = this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // ".cards__delete-button"
    const deleteButton = this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //#preview-modal
    const previewCard = this._cardElement
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
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardCaption.textContent = this._name;
    openPopup(previewCardModal);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    // get the card view
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".cards__image").src = this._link;
    this._cardElement.querySelector(".cards__title").textContent = this._name;
    // set event listeners
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
