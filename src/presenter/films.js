import {getRandomInteger, render, RenderPosition} from "./utils.js";
import {generateFilter} from "./mock/filter.js";
import {createfilm, commentsCollection} from "./mock/film.js";
import FilmCard from "./view/film-card.js";
import Button from "./view/button.js";

import Sort from "./view/sort.js";
// import Stats from "./view/stats.js";
import FilmContainer from "./view/film-container.js";
import FilmList from "./view/film-list.js";
import FilmListTop from "./view/film-list-top.js";
import FilmListCommented from "./view/film-list-commented.js";
import FilmListContainer from "./view/film-list-container.js";
// import Menu from "./view/menu.js";
import Popup from "./view/popup.js";
import ListEmpty from "./view/list-empty.js";

export default class Films {
  constructor(filmList) {
    this._filmList = filmList;
    this._sortComponent = new Sort();
    this._filmContainer = new FilmContainer();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListTop();
    this._filmListCommented = new FilmListCommented();
    this._filmListContainer = new FilmListContainer();
    this._listEmpty = new ListEmpty();
    this._popup = new Popup();
  }
  init(films) {
    this._films = films.slice();
  }

  renderSort() {
    // сортировка
  }

  renderFilmsList() {
    // отрисовка фильмов
  }

  renderEmptyFilmsList() {
    // пустой список фильмов
  }

  renderButton() {
    // отрисовка кнопки
  }

  renderTopFilms() {
    // отрисовка топ фильмов
  }

  renderCommentedFilms() {
  // отрисовка комментируемых фильмов
  }

  renderPopup() {
    // попап
  }

  renderStat() {
    // статистика
  }

}
