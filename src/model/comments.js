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

  deleteComment(updateType, update) {
    if (this._comments[update.idMessage] !== `undefined`) {
      delete this._comments[update.idMessage];
    } else {
      throw new Error(`Can't delete unexisting comment`);
    }
    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    if (!this._comments[update.idMessage]) {
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

  static adaptToClient(comments) {
    const adaptedComments = Object.assign(
        {},
        comments,
        {
          idMessage: comments.id,
          text: comments.comments,
          emoji: comments.emotion,
          date: comments.date,
          author: comments.author
        });

    delete comments.emotion;
    delete comments.id;
    delete comments.comments;

    /* const arrayToObject = (arr) => {
      let object = {};
      for (let i = 0; i < arr.length; i++) {
        object[i] = arr[i];
      }
      return object;
    };*/
    // const tyt = () => {
    /* function toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
          rv[i] = arr[i];
        return rv;
      }
    //  };*/
    // const tyt = arrayToObject(adaptedComments);
    return adaptedComments;
  }

  /* static adaptToServer(comments) {
    const adaptedComments = Object.assign(
        {},
        comments,
        {
          id: comments.idMessage,
          comments: comments.text,
          emotion: comments.emoji,
          date: comments.date,
          author: comments.author
        });

    delete comments.idMessage;
    delete comments.text;
    delete comments.emoji;

    return adaptedComments;
  }*/
}

