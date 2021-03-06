import Comments from "./model/comments.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};
const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class ApiComments {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getComments(film) {
    return this._load({url: `/comments/${film.id}`})
      .then(ApiComments.toJSON)
      .then((comments) => comments.map(Comments.adaptToClient))
      .then((responseComments) => {
        const commentsList = {};
        for (let i = 0; i < responseComments.length; i++) {
          commentsList[responseComments[i].idMessage] = responseComments[i];
        }
        return commentsList;
      });
  }

  updateComments(film) {
    return this._load({
      url: `/movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(Comments.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(ApiComments.toJSON)
      .then(Comments.adaptToClient);
  }

  addComment(comment, film) {
    return this._load({
      url: `comments/${film.id}`,
      method: Method.POST,
      body: JSON.stringify(Comments.adaptToServerNewComment(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(ApiComments.toJSON)
      .then(Comments.adaptNewCommentToClient);
  }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.idMessage}`,
      method: Method.DELETE,
      body: JSON.stringify(Comments.adaptToServerNewComment(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}${url}`,
        {method, body, headers}
    )
      .then(ApiComments.checkStatus)
      .catch(ApiComments.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}

