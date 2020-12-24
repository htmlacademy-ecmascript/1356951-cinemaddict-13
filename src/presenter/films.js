import {remove, render, RenderPosition} from "../utils.js";
import Button from "../view/button.js";
import FilmPresenter from "../presenter/film.js";
import dayjs from "dayjs";
import Sort from "../view/sort.js";
import Stats from "../view/stats.js";
import FilmContainer from "../view/film-container.js";
import FilmList from "../view/film-list.js";
import FilmListTop from "../view/film-list-top.js";
import FilmListCommented from "../view/film-list-commented.js";
import FilmListContainer from "../view/film-list-container.js";
import {filter} from "../utils/filter.js";
import ListEmpty from "../view/list-empty.js";
import {mainElement} from "../main.js";
import {SortType, UserAction, UpdateType} from "../const.js";
const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;
const FILM_COUNT_PER_STEP = 5;

export default class Films {
  constructor(filmsModel = [], filterModel) {
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._renderedFilmsCount = FILM_COUNT_PER_STEP;
    this._sortComponent = null;// new Sort();
    this._filmContainer = new FilmContainer();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListTop();
    this._filmListCommented = new FilmListCommented();
    this._filmListContainer = new FilmListContainer();
    this._listEmpty = new ListEmpty();
    this._button = new Button();
    this._filmPresenter = {};
    this._filmTopPresenter = {};
    this._filmCommentedPresenter = {};
    this._hadleFilmChange = this._hadleFilmChange.bind(this);
    this._filmListContainerTop = new FilmListContainer();
    this._filmListContainerCommented = new FilmListContainer();
    this._setDefaultView = this._setDefaultView.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = SortType.DEFAULT;
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._filmsModel.getFilms().slice().length === 0) {
      this._renderEmptyFilmsList();
    } else {
      this._renderBoard();
    }
  }

  _getFilms() {
    // фильтрация
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms().slice();
    const filtredFilms = filter[filterType](films);
    // сортировка
    switch (this._currentSortType) {
      case SortType.DATE:
        filtredFilms.sort(function (a, b) {
          return dayjs(b.releaseDate).diff(dayjs(a.releaseDate));
        }).slice();
        break;
      case SortType.RATING:
        filtredFilms.sort(function (a, b) {
          return b.rating - a.rating;
        }).slice();
        break;
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _sourseFilms исходный массив
    }
    return filtredFilms;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_FILM_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      /* ase UserAction.DELETE_TASK:
        this._filmsModel.deleteTask(updateType, update);
        break;*/
    }
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].filmInit(data);
        if (this._filmTopPresenter[data.id]) {
          this._filmTopPresenter[data.id].filmInit(data);
        }
        if (this._filmCommentedPresenter[data.id]) {
          this._filmCommentedPresenter[data.id].filmInit(data);
        }
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        if (data) {
          this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        }
        this._renderBoard();
        break;
    }
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    // очищаем список
    this._clearBoard({resetRenderedTaskCount: true});
    // рендерим новый
    this._renderBoard();
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._filmListContainer.getElement(), film));
  }

  _renderFilmsList() {
    // отрисовка фильмов
    const filmCount = this._getFilms().length;
    const filmsToRender = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));
    this._renderFilms(filmsToRender);
    if (this._filmContainer.getElement().querySelector(`.films-list__show-more`) === null) {
      this._renderButton();
    }
  }

  _renderFilm(container, film) {
    const renderFilmPresenter = new FilmPresenter(this._handleViewAction, this._setDefaultView, container, this._filmsModel);
    renderFilmPresenter.filmInit(film);
    this._filmPresenter[film.id] = renderFilmPresenter;
  }

  _renderTopFilm(container, film) {
    const renderFilmPresenter = new FilmPresenter(this._handleViewAction, this._setDefaultView, container, this._filmsModel);
    renderFilmPresenter.filmInit(film);
    this._filmTopPresenter[film.id] = renderFilmPresenter;
  }

  _renderCommentedFilm(container, film) {
    const renderFilmPresenter = new FilmPresenter(this._handleViewAction, this._setDefaultView, container, this._filmsModel);
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

  _renderEmptyFilmsList() {
    // пустой список фильмов
    render(mainElement, this._listEmpty, RenderPosition.BEFOREEND);
  }

  _hadleFilmChange(updateFilm) {
    // Обновление модели
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
  }

  _renderBoard() {
    this._renderSort();

    render(mainElement, this._filmContainer, RenderPosition.BEFOREEND);
    render(this._filmContainer, this._filmList, RenderPosition.BEFOREEND);
    render(this._filmList, this._filmListContainer, RenderPosition.BEFOREEND);
    this._renderFilmsList();
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    Object
    .values(this._filmTopPresenter)
    .forEach((presenter) => presenter.destroy());
    this._filmTopPresenter = {};

    Object
    .values(this._filmCommentedPresenter)
    .forEach((presenter) => presenter.destroy());
    this._filmCommentedPresenter = {};

    remove(this._sortComponent);
    remove(this._listEmpty);
    remove(this._button);
    remove(this._filmListTop);
    remove(this._filmListCommented);

    if (resetRenderedTaskCount) {
      this._renderedFilmsCount = FILM_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderedTaskCount = Math.min(filmCount, this._renderedFilmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new Sort(this._currentSortType);

    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderStat() {
    // статистика
    render(mainElement, new Stats(), RenderPosition.BEFOREEND);
  }
}
