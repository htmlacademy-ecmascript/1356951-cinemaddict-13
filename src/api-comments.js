import Comments from "./model/comments.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`
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
      // .then((comments) => comments.reduce(Comments.adaptToClient));
      .then((comments) => comments.map(Comments.adaptToClient))
      .then((commentsArr) => {
        // console.log(commentsArr);
        let object = {};
        for (let i = 0; i < commentsArr.length; i++) {
          object[commentsArr[i].idMessage] = commentsArr[i];
        }
        // console.log(object);
        return object;
      });
    /* .then((comments) => comments.reduce(function (obj, item) {
        obj[item.key] = item.value;
        return obj;
      }, {}));*/
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
