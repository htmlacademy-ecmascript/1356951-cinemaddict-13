import Observer from "../model/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = {};
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
