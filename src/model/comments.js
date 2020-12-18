// import Observer from "../model/observer.js";

export default class Comments {
  constructor() {
    this._observer = {};
    this._comments = {};
  }

  addObserver(observer) {
    this._observer = Object.assign(
        {},
        observer
    );
  }

  removeObserver(observer) {
    this._observer = this._observer.filter((existedObserver) => existedObserver !== observer);
  }

  _notify(event, payload) {
    this._observer.forEach((observer) => observer(event, payload));
  }

  setComments(_comments) {
    if (!_comments) {
      return;
    }
    this._comments = Object.assign(
        {},
        _comments
    );
  }

  getComments() {
    return this._comments;
  }
}
