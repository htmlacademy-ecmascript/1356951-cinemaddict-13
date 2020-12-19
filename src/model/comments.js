// import Observer from "../model/observer.js";
import Observer from "../model/observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    // this._observer = {};
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

  deleteComment(updateType, update) {
    if (this._comments[update.idMessage] !== `undefined`) {
      delete this._comments[update.idMessage];
    } else {
      throw new Error(`Can't delete unexisting comment`);
    }
    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    if (!this._comments[update.idMessage]/* === `undefined`*/) {
      this._comments = Object.assign(
          {},
          this._comments,
          {
            [update.idMessage]: update
          }
      );


    } else {
      throw new Error(`Can't add already existing comment`);
    }
    this._notify(updateType, update);
  }
}
