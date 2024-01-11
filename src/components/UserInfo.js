export default class UserInfo {
  constructor(userNameSelector, userDescriptionSelector, avatarSelector) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(
      userDescriptionSelector
    );
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo(name, about) {
    this._userNameElement.textContent = name;
    this._userDescriptionElement.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
