import {/* getRandomInteger, */render, RenderPosition} from "../utils.js";
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
    // this._filmCard =
    this._popup = new Popup();
  }
  init(films = []) {
    this._films = films.slice();
    console.log(this._films);
    if (this._films.length === 0) {
      this.renderEmptyFilmsList();
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
    console.log(this._films);
    if (this._films.length < cardFilmQuantity) {
      cardFilmQuantity = this._films.length;
    }
    for (let i = 0; i < cardFilmQuantity; i++) {
      new Film().filmInit(this._filmListContainer.getElement(), this._films[i]);
      // this._renderFilm(this._filmListContainer.getElement(), this._films[i]);
    }
    this._renderButton();
    // отрисовка фильмов
  }

  _renderEmptyFilmsList() {
    render(mainElement, this._listEmpty, RenderPosition.BEFOREEND);
    // пустой список фильмов
  }

  /* _renderFilm(filmListElement, film) {
    const filmComponent = new FilmCard(film);
    render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

    const onOpenPopup = () => {
      const onEscKeyDown = (escEvt) => {
        if (escEvt.key === `Escape` || escEvt.key === `Esc`) {
          escEvt.preventDefault();
          bodyElement.classList.remove(`hide-overflow`);
          bodyElement.removeChild(popup.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
          filmComponent.setFilmCardClickListeners(onOpenPopup);
        }
      };

      const onClosePopup = () => {
        bodyElement.classList.remove(`hide-overflow`);
        bodyElement.removeChild(popup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
        filmComponent.setFilmCardClickListeners(onOpenPopup);
      };

      bodyElement.classList.add(`hide-overflow`);
      const popup = new Popup(film, commentsCollection);
      bodyElement.appendChild(popup.getElement());
      popup.setCloseClickListener(onClosePopup);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    filmComponent.setFilmCardClickListeners(onOpenPopup);
    this._renderButton();
    // фильм
  }*/

  _renderButton() {
    // отрисовка кнопки
    console.log(this._films);
    if (this._films.length > FILM_COUNT_PER_STEP) {
      let renderedFilmCount = FILM_COUNT_PER_STEP;
      // Добавляем кнопку
      // const loadMoreButton = new Button();
      render(this._filmList, this._button, RenderPosition.BEFOREEND);
      this._button.setButtonClickListeners(() => {
        this._films
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => new Film().filmInit(this._filmListContainer.getElement(), film));
        renderedFilmCount += FILM_COUNT_PER_STEP;

        if (renderedFilmCount >= this._films.length) {
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
    // const filmListTop = new FilmListTop();
    render(this._filmContainer, this._filmListTop, RenderPosition.BEFOREEND);
    const filmListContainerTop = new FilmListContainer();
    render(this._filmListTop, filmListContainerTop, RenderPosition.BEFOREEND);

    const topFilms = this._films.sort(function (a, b) {
      return b.rating - a.rating;
    });

    for (let i = 0; i < TOP_CARD_FILM_QUANTITY; i++) {
      new Film().filmInit(filmListContainerTop.getElement(), topFilms[i]);
    }
  }

  _renderCommentedFilms() {
  // отрисовка комментируемых фильмов
  // const filmListCommented = new FilmListCommented();
    render(this._filmContainer, this._filmListCommented, RenderPosition.BEFOREEND);
    const filmListContainerCommented = new FilmListContainer();
    render(this._filmListCommented, filmListContainerCommented, RenderPosition.BEFOREEND);

    const commentedFilms = this._films.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    for (let i = 0; i < COMMENTED_CARD_FILM_QUANTITY; i++) {
      new Film().filmInit(filmListContainerCommented.getElement(), commentedFilms[i]);
    }

  }

  /* onOpenPopup() {
    // попап
  }*/

  _renderStat() {
    // статистика
    render(mainElement, new Stats(), RenderPosition.BEFOREEND);
  }

}
