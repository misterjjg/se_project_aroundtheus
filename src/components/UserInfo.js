export default class UserInfo {
  constructor(nameElement, jobElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  getUserInfo() {
    const userData = {};
    userData.profileName = this._nameElement.textContent;
    userData.description = this._jobElement.textContent;
    return userData;
  }

  setUserInfo(nameInfo, jobInfo) {
    this._nameElement.textContent = nameInfo;
    this._jobElement.textContent = jobInfo;
  }
}
