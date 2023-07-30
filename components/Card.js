import { openPopup } from "../utils/utils.js";
import { previewCardModal } from "../pages/index.js";
const cardImage = document.querySelector(".modal__preview-image");
const cardCaption = document.querySelector(".modal__caption");

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
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
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector(".cards__image").src = this._link;
    this._cardElement.querySelector(".cards__image").alt = this._name;
    this._cardElement.querySelector(".cards__title").textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
