import {remove, render, RenderPosition} from "../utils.js";
import Button from "../view/button.js";
import FilmPresenter from "../presenter/film.js";
import dayjs from "dayjs";
import Sort from "../view/sort.js";
import FilmContainer from "../view/film-container.js";
import FilmList from "../view/film-list.js";
import FilmListTop from "../view/film-list-top.js";
import FilmListCommented from "../view/film-list-commented.js";
import FilmListContainer from "../view/film-list-container.js";
import {filter} from "../utils/filter.js";
import ListEmpty from "../view/list-empty.js";
import {mainElement} from "../main.js";
import LoadingView from "../view/loading.js";
import {SortType, UserAction, UpdateType} from "../const.js";
const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;
const FILM_COUNT_PER_STEP = 5;

export default class Films {
  constructor(filmsModel = [], filterModel, api) {
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._api = api;
    this._renderedFilmsCount = 0;
    this._sortComponent = null;
    this._filmContainer = new FilmContainer();
    this._filmList = new FilmList();
    this._filmListTop = new FilmListTop();
    this._filmListCommented = new FilmListCommented();
    this._filmListContainer = new FilmListContainer();
    this._listEmpty = new ListEmpty();
    this._button = new Button();
    this._loadingComponent = new LoadingView();
    this._isLoading = true;
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
    this._renderBoard();
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
    }
    return filtredFilms;
  }

  _handleViewAction(actionType, updateType, update, buttonType) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        const newUpdateType = this._filterModel.getFilter() === buttonType ?
          UpdateType.MINOR : updateType;
        this._api.updateFilms(update).then((response) => {
          this._filmsModel.updateFilm(newUpdateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
    }
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
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
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
    const filmsToRender = this._getFilms().slice(0, Math.min(filmCount, this._renderedFilmsCount !== 0 ? this._renderedFilmsCount : FILM_COUNT_PER_STEP));
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
    this._renderFooter();
  }

  updateFooter() {
    this._renderFooter(this._filmsModel.getFilms().slice().length);
  }

  _renderFooter(number) {
    const footer = document.querySelector(`footer`);
    const footerStat = footer.querySelector(`.footer__statistics`);
    footerStat.innerHTML = ``;
    if (number) {
      render(footerStat, `${number}`, RenderPosition.BEFOREEND);
    } else {
      render(footerStat, `${this._getFilms().length}`, RenderPosition.BEFOREEND);
    }
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

  hide() {
    this._filmContainer.hide();
    this._sortComponent.hide();
  }

  show() {
    this._filmContainer.show();
    this._sortComponent.show();
    this._handleSortTypeChange(`default`);
  }

  _renderButton() {
    // отрисовка кнопки
    const filmCount = this._getFilms().length;
    if (filmCount > this._renderedFilmsCount && filmCount > FILM_COUNT_PER_STEP) {
      // Добавляем кнопку
      render(this._filmList, this._button, RenderPosition.BEFOREEND);
      this._button.setButtonClickListeners(() => {
        const filmsToRender = this._getFilms().slice(this._renderedFilmsCount, Math.min(this._renderedFilmsCount + FILM_COUNT_PER_STEP, filmCount));
        filmsToRender.forEach((film) => this._renderFilm(this._filmListContainer.getElement(), film));
        this._renderedFilmsCount += FILM_COUNT_PER_STEP;
        if (filmCount <= this._renderedFilmsCount) {
          this._button.getElement().remove();
          this._button.removeElement();
        }
      });
    }


    this._renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (this._filmContainer.getElement().querySelector(`.films-list--extra`) === null) {
      this._renderTopFilms();
      this._renderCommentedFilms();
    }
  }

  _renderTopFilms() {
    // отрисовка топ фильмов
    render(this._filmContainer, this._filmListTop, RenderPosition.BEFOREEND);
    render(this._filmListTop, this._filmListContainerTop, RenderPosition.BEFOREEND);
    const topCardQuantity = this._filmsModel.getFilms().length < TOP_CARD_FILM_QUANTITY ? this._getFilms().slice().length : TOP_CARD_FILM_QUANTITY;
    this._topFilms = this._filmsModel.getFilms().slice().sort(function (a, b) {
      return b.rating - a.rating;
    }).slice(0, topCardQuantity);
    this._topFilms.forEach((film) => this._renderTopFilm(this._filmListContainerTop.getElement(), film));
  }

  _renderCommentedFilms() {
  // отрисовка комментируемых фильмов
    render(this._filmContainer, this._filmListCommented, RenderPosition.BEFOREEND);
    render(this._filmListCommented, this._filmListContainerCommented, RenderPosition.BEFOREEND);
    const commentedCardQuantity = this._filmsModel.getFilms().length < COMMENTED_CARD_FILM_QUANTITY ? this._filmsModel.getFilms().length : COMMENTED_CARD_FILM_QUANTITY;
    const commentedFilms = this._filmsModel.getFilms().slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }).slice(0, commentedCardQuantity);
    commentedFilms.forEach((film) => this._renderCommentedFilm(this._filmListContainerCommented.getElement(), film));
    this._renderFooter();
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    this._renderSort();
    render(mainElement, this._filmContainer, RenderPosition.BEFOREEND);
    render(this._filmContainer, this._filmList, RenderPosition.BEFOREEND);
    if (this._getFilms().slice().length === 0) {
      this._renderEmptyFilmsList();
      return;
    }
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
    remove(this._loadingComponent);
    remove(this._listEmpty);
    remove(this._button);
    remove(this._filmListTop);
    remove(this._filmListCommented);

    if (resetRenderedTaskCount) {
      this._renderedFilmsCount = 0;
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

  _renderLoading() {
    render(mainElement, this._filmContainer, RenderPosition.BEFOREEND);
    render(this._filmContainer, this._filmList, RenderPosition.BEFOREEND);
    render(this._filmList, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new Sort(this._currentSortType);

    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }
}
