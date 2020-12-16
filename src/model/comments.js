import Observer from "../model/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }
  setFilms(_comments) {
    this._comments = Object.assign(
        {},
        _comments
    );
  }

  getFilms() {
    return this._comments;
  }
}
