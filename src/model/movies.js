import Observer from "../model/observer.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }
  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }
}
