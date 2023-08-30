export default class UserInfo {
  constructor(selectors) {
    this._nameElement = document.querySelector(selectors.profileNameSelector);
    this._descriptionElement = document.querySelector(
      selectors.userDescriptionSelector
    );
    this._avatarElement = document.querySelector(selectors.userAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
    };
  }

  setUserInfo(inputValues) {
    this._nameElement.textContent = inputValues.name;
    this._descriptionElement.textContent = inputValues.about;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
