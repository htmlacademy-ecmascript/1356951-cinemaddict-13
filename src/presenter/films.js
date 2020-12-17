import {remove, render, RenderPosition/* , updateItem*/} from "../utils.js";
import Button from "../view/button.js";
import Film from "../presenter/film.js";
import dayjs from "dayjs";
import Sort from "../view/sort.js";
import Stats from "../view/stats.js";
import FilmContainer from "../view/film-container.js";
import FilmList from "../view/film-list.js";
import FilmListTop from "../view/film-list-top.js";
import FilmListCommented from "../view/film-list-commented.js";
import FilmListContainer from "../view/film-list-container.js";
// import Popup from "../view/popup.js";
import ListEmpty from "../view/list-empty.js";
import {mainElement} from "../main.js";
import {SortType} from "../const.js";
const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;
const FILM_COUNT_PER_STEP = 5;
// let cardFilmQuantity = 5;

export default class Films {
  constructor() {
    this._renderedFilmsCount = FILM_COUNT_PER_STEP;
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
    this._filmTopPresenter = {};
    this._filmCommentedPresenter = {};
    // this._popup = new Popup();
    // this._renderedFilmCount = null;
    this._hadleFilmChange = this._hadleFilmChange.bind(this);
    this._filmListContainerTop = new FilmListContainer();
    this._filmListContainerCommented = new FilmListContainer();
    this._setDefaultView = this._setDefaultView.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;
  }

  init(films = []) {
    // Можешь объяснить почему в this._films меняется порядок фильмов, но при отрисовке действует старый порядок?
    this._films = films;
    // this._sourseFilms = films.getFilms().slice();
    if (this._films.getFilms().slice().length === 0) {
      this._renderEmptyFilmsList();
    } else {
      this._renderSort();

      render(mainElement, this._filmContainer, RenderPosition.BEFOREEND);
      render(this._filmContainer, this._filmList, RenderPosition.BEFOREEND);
      render(this._filmList, this._filmListContainer, RenderPosition.BEFOREEND);
      this._renderFilmsList();
    }
  }

  _renderDefaultSort() {
    // сортировка
  }

  _getFilms() { // renderSortedFilms
    // сортировка
    switch (this._currentSortType) {
      case SortType.DATE:
        this._films.getFilms().slice().sort(function (a, b) {
          return dayjs(b.releaseDate).diff(dayjs(a.releaseDate));
        });
        break;
      case SortType.RATING:
        this._films.getFilms().slice().sort(function (a, b) {
          return b.rating - a.rating;
        }).slice();
        break;
      // default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _sourseFilms исходный массив
       // this._films = this._sourseFilms.slice();
    }
    return this._films.getFilms();
    //  this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    // сортировка
    // this._getFilms(sortType);
    // очищаем список
    this._clearFilms();
    // рендерим новый
    this._renderFilmsList();
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._filmListContainer.getElement(), film));
  }

  _renderFilmsList() {
    // отрисовка фильмов
    /* if (this._getFilms.slice().length < cardFilmQuantity) {
      cardFilmQuantity = this._getFilms.length;
    }*/
    const filmCount = this._getFilms().length;

    const filmsToRender = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));
    this._renderFilms(filmsToRender);
    /* for (let i = 0; i < cardFilmQuantity; i++) {
      this._renderFilm(this._filmListContainer.getElement(), this._getFilms[i]);
    }*/
    if (this._filmContainer.getElement().querySelector(`.films-list__show-more`) === null) {
      this._renderButton();
    }
  }

  _renderFilm(container, film) {
    const renderFilmPresenter = new Film(this._hadleFilmChange, this._setDefaultView, container);
    renderFilmPresenter.filmInit(film);
    this._filmPresenter[film.id] = renderFilmPresenter;
  }

  _renderTopFilm(container, film) {
    const renderFilmPresenter = new Film(this._hadleFilmChange, this._setDefaultView, container);
    renderFilmPresenter.filmInit(film);
    this._filmTopPresenter[film.id] = renderFilmPresenter;
  }

  _renderCommentedFilm(container, film) {
    const renderFilmPresenter = new Film(this._hadleFilmChange, this._setDefaultView, container);
    renderFilmPresenter.filmInit(film);
    this._filmCommentedPresenter[film.id] = renderFilmPresenter;
  }

  _setDefaultView() {
    Object.values(this._filmPresenter).forEach((presenter) => {
      presenter.closePopup();
    });
    Object.values(this._filmTopPresenter).forEach((presenter) => {
      presenter.closePopup();
    });
    Object.values(this._filmCommentedPresenter).forEach((presenter) => {
      presenter.closePopup();
    });
  }

  _clearFilms() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmsCount = FILM_COUNT_PER_STEP;
    remove(this._button);
  }

  _renderEmptyFilmsList() {
    // пустой список фильмов
    render(mainElement, this._listEmpty, RenderPosition.BEFOREEND);
  }

  _hadleFilmChange(updateFilm) {
    // Обновление модели
    // this._films = updateItem(this._films, updateFilm);
    if (this._filmPresenter[updateFilm.id]) {
      this._filmPresenter[updateFilm.id].filmInit(updateFilm);
    }
    if (this._filmTopPresenter[updateFilm.id]) {
      this._filmTopPresenter[updateFilm.id].filmInit(updateFilm);
    }
    if (this._filmCommentedPresenter[updateFilm.id]) {
      this._filmCommentedPresenter[updateFilm.id].filmInit(updateFilm);
    }
  }

  _renderButton() {
    // отрисовка кнопки
    const filmCount = this._getFilms().length;
    const filmsToRender = this._getFilms().slice(this._renderedFilmsCount, Math.min(this._renderedFilmsCount + FILM_COUNT_PER_STEP, filmCount));

    if (filmCount > FILM_COUNT_PER_STEP) {
      // Добавляем кнопку
      render(this._filmList, this._button, RenderPosition.BEFOREEND);
      this._button.setButtonClickListeners(() => {
        filmsToRender.forEach((film) => this._renderFilm(this._filmListContainer.getElement(), film));

        this._renderedFilmsCount += FILM_COUNT_PER_STEP;
        this._button.getElement().remove();
        this._button.removeElement();
        // remove(this._button);

        /* this._getFilms
        .slice(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => this._renderFilm(this._filmListContainer.getElement(), film));
        this._renderedFilmCount += FILM_COUNT_PER_STEP;
        if (this._renderedFilmCount >= this._getFilms.slice().length) {
          this._button.getElement().remove();
          this._button.removeElement();
        }*/
      });
    }
    if (this._filmContainer.getElement().querySelector(`.films-list--extra`) === null) {
      this._renderTopFilms();
      this._renderCommentedFilms();
    }
  }

  _renderTopFilms() {
    // отрисовка топ фильмов
    render(this._filmContainer, this._filmListTop, RenderPosition.BEFOREEND);
    render(this._filmListTop, this._filmListContainerTop, RenderPosition.BEFOREEND);
    let topCardQuantity = this._getFilms().slice().length > 1 ? TOP_CARD_FILM_QUANTITY : this._getFilms().slice().length;
    this._topFilms = this._getFilms().slice().sort(function (a, b) {
      return b.rating - a.rating;
    }).slice(0, topCardQuantity);
    this._topFilms.forEach((film) => this._renderTopFilm(this._filmListContainerTop.getElement(), film));
    /* for (let i = 0; i < topCardQuantity; i++) {
      this._renderTopFilm(this._filmListContainerTop.getElement(), this._topFilms[i]);
    }*/
  }

  _renderCommentedFilms() {
  // отрисовка комментируемых фильмов
    render(this._filmContainer, this._filmListCommented, RenderPosition.BEFOREEND);
    render(this._filmListCommented, this._filmListContainerCommented, RenderPosition.BEFOREEND);
    let commentedCardQuantity = this._getFilms().length > 1 ? COMMENTED_CARD_FILM_QUANTITY : 1;
    const commentedFilms = this._getFilms().slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }).slice(0, commentedCardQuantity);
    commentedFilms.forEach((film) => this._renderCommentedFilm(this._filmListContainerCommented.getElement(), film));
    /* for (let i = 0; i < commentedCardQuantity; i++) {
      this._renderCommentedFilm(this._filmListContainerCommented.getElement(), commentedFilms[i]);
    }*/
  }
  _renderSort() {
    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderStat() {
    // статистика
    render(mainElement, new Stats(), RenderPosition.BEFOREEND);
  }
}
