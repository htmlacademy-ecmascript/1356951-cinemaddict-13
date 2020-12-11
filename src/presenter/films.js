import {/* getRandomInteger, */remove, render, RenderPosition, updateItem} from "../utils.js";
// import {generateFilter} from "./mock/filter.js";
// import {commentsCollection} from "./mock/film.js";
// import FilmCard from "./view/film-card.js";
import Button from "../view/button.js";
import Film from "../presenter/film.js";

import Sort from "../view/sort.js";
import Stats from "../view/stats.js";
import FilmContainer from "../view/film-container.js";
import FilmList from "../view/film-list.js";
import FilmListTop from "../view/film-list-top.js";
import FilmListCommented from "../view/film-list-commented.js";
import FilmListContainer from "../view/film-list-container.js";
// import Menu from "./view/menu.js";
import Popup from "../view/popup.js";
import ListEmpty from "../view/list-empty.js";
import {mainElement} from "../main.js";

const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;
const FILM_COUNT_PER_STEP = 5;
let cardFilmQuantity = 5;

// const bodyElement = document.querySelector(`body`);
// const filmPresenter = new Film();

export default class Films {
  constructor() {
    this._sortComponent = new Sort();
    this._filmContainer = new FilmContainer();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListTop();
    this._filmListCommented = new FilmListCommented();
    this._filmListContainer = new FilmListContainer();
    this._listEmpty = new ListEmpty();
    this._button = new Button();
    //
    this._filmPresenter = {};
    this._popup = new Popup();
    this._renderedFilmCount = null;
    this._hadleFilmChange = this._hadleFilmChange.bind(this);
    // this._films = this._films.bind(this);
    // this._renderFilmPresenter = new Film();
  }
  init(films = []) {
    this._films = films.slice();
    if (this._films.length === 0) {
      this._renderEmptyFilmsList();
      // render(mainElement, this._listEmpty, RenderPosition.BEFOREEND);
    } else {
    // выводим статистику
    // render(mainElement, new Stats().getElement(), RenderPosition.BEFOREEND);
      // const filmContainer = new FilmContainer();

      render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);
      render(mainElement, this._filmContainer, RenderPosition.BEFOREEND);

      // const filmList = new FilmList();
      render(this._filmContainer, this._filmList, RenderPosition.BEFOREEND);
      // const filmListContainer = new FilmListContainer();
      render(this._filmList, this._filmListContainer, RenderPosition.BEFOREEND);
      this._renderFilmsList();
    }

  }

  _renderSort() {
    // сортировка
  }

  _renderFilmsList() {
    // отрисовка фильмов
    // const filmPresenterRender = new Film();
    if (this._films.length < cardFilmQuantity) {
      cardFilmQuantity = this._films.length;
    }
    for (let i = 0; i < cardFilmQuantity; i++) {
      this._renderFilm(this._filmListContainer.getElement(), this._films[i]);
      // new Film().filmInit(this._filmListContainer.getElement(), this._films[i]);
      // this._filmPresenter[this._films[i].id] = new Film();
    }
    this._renderButton();
  }

  _renderFilm(container, film) {
    const renderFilmPresenter = new Film(this._hadleFilmChange, container);
    renderFilmPresenter.filmInit(film);
    this._filmPresenter[film.id] = renderFilmPresenter;
  }

  _clearFilms() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._button);
  }

  _renderEmptyFilmsList() {
    // пустой список фильмов
    render(mainElement, this._listEmpty, RenderPosition.BEFOREEND);
  }

  _hadleFilmChange(updateFilm) {
    this._films = updateItem(this._films, updateFilm);
    // console.log(this._filmPresenter[updateFilm.id]);
    this._filmPresenter[updateFilm.id].filmInit(updateFilm);
  }

  _renderButton() {
    // отрисовка кнопки
    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
      // Добавляем кнопку
      render(this._filmList, this._button, RenderPosition.BEFOREEND);
      this._button.setButtonClickListeners(() => {
        this._films
        .slice(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => this._renderFilm(this._filmListContainer.getElement(), film));
        this._renderedFilmCount += FILM_COUNT_PER_STEP;

        if (this._renderedFilmCount >= this._films.length) {
          this._button.getElement().remove();
          this._button.removeElement();
        }
      });
    }
    this._renderTopFilms();
    this._renderCommentedFilms();
  }

  _renderTopFilms() {
    // отрисовка топ фильмов
    render(this._filmContainer, this._filmListTop, RenderPosition.BEFOREEND);
    const filmListContainerTop = new FilmListContainer();
    render(this._filmListTop, filmListContainerTop, RenderPosition.BEFOREEND);
    let topCardQuantity = this._films.length > 1 ? TOP_CARD_FILM_QUANTITY : 1;
    const topFilms = this._films.sort(function (a, b) {
      return b.rating - a.rating;
    });
    for (let i = 0; i < topCardQuantity; i++) {
      this._renderFilm(filmListContainerTop.getElement(), topFilms[i]);
    }
  }

  _renderCommentedFilms() {
  // отрисовка комментируемых фильмов
    render(this._filmContainer, this._filmListCommented, RenderPosition.BEFOREEND);
    const filmListContainerCommented = new FilmListContainer();
    render(this._filmListCommented, filmListContainerCommented, RenderPosition.BEFOREEND);
    let commentedCardQuantity = this._films.length > 1 ? COMMENTED_CARD_FILM_QUANTITY : 1;
    const commentedFilms = this._films.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    for (let i = 0; i < commentedCardQuantity; i++) {
      this._renderFilm(filmListContainerCommented.getElement(), commentedFilms[i]);
      // new Film().filmInit(filmListContainerCommented.getElement(), commentedFilms[i]);
    }

  }

  _renderStat() {
    // статистика
    render(mainElement, new Stats(), RenderPosition.BEFOREEND);
  }

}
