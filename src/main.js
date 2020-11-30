import {/* getRandomInteger, */render, RenderPosition} from "./utils.js";
import {generateFilter} from "./mock/filter.js";
import {createfilm, commentsCollection} from "./mock/film.js";
import FilmCard from "./view/film-card.js";
import Button from "./view/button.js";
import User from "./view/user.js";
import Sort from "./view/sort.js";
// import Stats from "./view/stats.js";
import FilmContainer from "./view/film-container.js";
import FilmList from "./view/film-list.js";
import FilmListTop from "./view/film-list-top.js";
import FilmListCommented from "./view/film-list-commented.js";
import FilmListContainer from "./view/film-list-container.js";
import Menu from "./view/menu.js";
import Popup from "./view/popup.js";
import ListEmpty from "./view/list-empty.js";

const CARD_FILM_QUANTITY = 5;
const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;
const FILM_COUNT_PER_STEP = 5;


const filmsQuantity = 0; // getRandomInteger(15, 20);
const films = new Array(filmsQuantity).fill().map(createfilm);
const filters = generateFilter(films);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
// Выводим попап
const bodyElement = document.querySelector(`body`);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCard(film);
  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  const onOpenPopup = (evt) => {
    const onEscKeyDown = (escEvt) => {
      if (escEvt.key === `Escape` || escEvt.key === `Esc`) {
        escEvt.preventDefault();
        bodyElement.classList.remove(`hide-overflow`);
        bodyElement.removeChild(popup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
        filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onOpenPopup);
        filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onOpenPopup);
        filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onOpenPopup);
      }
    };

    const onClosePopup = (closeEvt) => {
      closeEvt.preventDefault();
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(popup.getElement());
      document.querySelector(`.film-details__close-btn`).removeEventListener(`click`, onClosePopup);
      filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onOpenPopup);
      filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onOpenPopup);
      filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onOpenPopup);
    };

    evt.preventDefault();
    bodyElement.classList.add(`hide-overflow`);
    const popup = new Popup(film, commentsCollection);
    bodyElement.appendChild(popup.getElement());
    document.querySelector(`.film-details__close-btn`).addEventListener(`click`, onClosePopup);
    document.addEventListener(`keydown`, onEscKeyDown);

    filmComponent.getElement().querySelector(`.film-card__poster`).removeEventListener(`click`, onOpenPopup);
    filmComponent.getElement().querySelector(`.film-card__title`).removeEventListener(`click`, onOpenPopup);
    filmComponent.getElement().querySelector(`.film-card__comments`).removeEventListener(`click`, onOpenPopup);
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onOpenPopup);
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onOpenPopup);
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onOpenPopup);
};

render(headerElement, new User().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Menu(filters).getElement(), RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(mainElement, new ListEmpty().getElement(), RenderPosition.BEFOREEND);
} else {
// выводим статистику
// render(mainElement, new Stats().getElement(), RenderPosition.BEFOREEND);
  const filmContainer = new FilmContainer().getElement();

  render(mainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
  render(mainElement, filmContainer, RenderPosition.BEFOREEND);

  const filmList = new FilmList();
  render(filmContainer, filmList.getElement(), RenderPosition.BEFOREEND);
  const filmListContainer = new FilmListContainer().getElement();
  render(filmList.getElement(), filmListContainer, RenderPosition.BEFOREEND);

  // отображаем map
  for (let i = 0; i < CARD_FILM_QUANTITY; i++) {
    renderFilm(filmListContainer, films[i]);
  }

  // Настраиваем логику кнопки
  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;
    // Добавляем кнопку
    const loadMoreButton = new Button();
    render(filmList.getElement(), loadMoreButton.getElement(), RenderPosition.BEFOREEND);
    loadMoreButton.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListContainer, film));
      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });
  }

  // 2шт top
  const filmListTop = new FilmListTop().getElement();
  render(filmContainer, filmListTop, RenderPosition.BEFOREEND);
  const filmListContainerTop = new FilmListContainer().getElement();
  render(filmListTop, filmListContainerTop, RenderPosition.BEFOREEND);

  const topFilms = films.sort(function (a, b) {
    return b.rating - a.rating;
  });

  for (let i = 0; i < TOP_CARD_FILM_QUANTITY; i++) {
    renderFilm(filmListContainerTop, topFilms[i]);
  }

  // 2шт комментированные
  const filmListCommented = new FilmListCommented().getElement();
  render(filmContainer, filmListCommented, RenderPosition.BEFOREEND);
  const filmListContainerCommented = new FilmListContainer().getElement();
  render(filmListCommented, filmListContainerCommented, RenderPosition.BEFOREEND);

  const commentedFilms = films.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });

  for (let i = 0; i < COMMENTED_CARD_FILM_QUANTITY; i++) {
    renderFilm(filmListContainerCommented, commentedFilms[i]);
  }

  const footer = document.querySelector(`footer`);
  const footerStat = footer.querySelector(`.footer__statistics`);
  render(footerStat, `${filmsQuantity}`, RenderPosition.BEFOREEND);

}

