export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponses(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _handleRequests(url, options) {
    return fetch(url, options).then(this._handleServerResponses);
  }

  getInitialCards() {
    const cardInfo = this._handleRequests(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return cardInfo;
  }

  getUserInfo() {
    const userInfo = this._handleRequests(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return userInfo;
  }

  editProfileForm(data) {
    return this._handleRequests(`${this._baseUrl}/users/me`, {
      methid: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.description,
      }),
    });
  }

  addNewCard(data) {
    return this._handleRequests(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.url,
      }),
    });
  }

  deleteCard(cardId) {
    return this._handleRequests(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeButton(cardId, isLiked) {
    return this._handleRequests(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }

  setUserAvatar(url) {
    console.log("url:" + url);
    return this._handleRequests(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }
}
