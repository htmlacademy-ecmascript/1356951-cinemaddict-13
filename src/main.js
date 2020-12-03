import {getRandomInteger, render, RenderPosition} from "./utils.js";
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

// const CARD_FILM_QUANTITY = 5;
const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;
const FILM_COUNT_PER_STEP = 5;
let cardFilmQuantity = 5;

const filmsQuantity = getRandomInteger(0, 20);
const films = new Array(filmsQuantity).fill().map(createfilm);
const filters = generateFilter(films);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
// Выводим попап
const bodyElement = document.querySelector(`body`);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCard(film);
  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  const onOpenPopup = () => {
    const onEscKeyDown = (escEvt) => {
      if (escEvt.key === `Escape` || escEvt.key === `Esc`) {
        escEvt.preventDefault();
        bodyElement.classList.remove(`hide-overflow`);
        bodyElement.removeChild(popup.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
        filmComponent.setClick(onOpenPopup);
      }
    };

    const onClosePopup = () => {
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(popup.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
      filmComponent.setClick(onOpenPopup);
    };

    bodyElement.classList.add(`hide-overflow`);
    const popup = new Popup(film, commentsCollection);
    bodyElement.appendChild(popup.getElement());
    popup.setClick(onClosePopup);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmComponent.setClick(onOpenPopup);
};

render(headerElement, new User().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Menu(filters).getElement(), RenderPosition.BEFOREEND);

if (films.length === 0) {
  render(mainElement, new ListEmpty().getElement(), RenderPosition.BEFOREEND);
} else {
// выводим статистику
// render(mainElement, new Stats().getElement(), RenderPosition.BEFOREEND);
  const filmContainer = new FilmContainer().getElement();

  render(mainElement, new Sort(), RenderPosition.BEFOREEND);
  render(mainElement, filmContainer, RenderPosition.BEFOREEND);

  const filmList = new FilmList();
  render(filmContainer, filmList, RenderPosition.BEFOREEND);
  const filmListContainer = new FilmListContainer();
  render(filmList.getElement(), filmListContainer, RenderPosition.BEFOREEND);

  // отображаем map
  if (films.length < cardFilmQuantity) {
    cardFilmQuantity = films.length;
  }
  for (let i = 0; i < cardFilmQuantity; i++) {
    renderFilm(filmListContainer.getElement(), films[i]);
  }

  // Настраиваем логику кнопки
  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmCount = FILM_COUNT_PER_STEP;
    // Добавляем кнопку
    const loadMoreButton = new Button();
    render(filmList, loadMoreButton, RenderPosition.BEFOREEND);
    loadMoreButton.setClick(() => {
      films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmListContainer.getElement(), film));
      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= films.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });
  }

  // 2шт top
  const filmListTop = new FilmListTop();
  render(filmContainer, filmListTop, RenderPosition.BEFOREEND);
  const filmListContainerTop = new FilmListContainer();
  render(filmListTop, filmListContainerTop, RenderPosition.BEFOREEND);

  const topFilms = films.sort(function (a, b) {
    return b.rating - a.rating;
  });

  for (let i = 0; i < TOP_CARD_FILM_QUANTITY; i++) {
    renderFilm(filmListContainerTop.getElement(), topFilms[i]);
  }

  // 2шт комментированные
  const filmListCommented = new FilmListCommented();
  render(filmContainer, filmListCommented, RenderPosition.BEFOREEND);
  const filmListContainerCommented = new FilmListContainer();
  render(filmListCommented, filmListContainerCommented, RenderPosition.BEFOREEND);

  const commentedFilms = films.sort(function (a, b) {
    return b.comments.length - a.comments.length;
  });

  for (let i = 0; i < COMMENTED_CARD_FILM_QUANTITY; i++) {
    renderFilm(filmListContainerCommented.getElement(), commentedFilms[i]);
  }

  const footer = document.querySelector(`footer`);
  const footerStat = footer.querySelector(`.footer__statistics`);
  render(footerStat, `${filmsQuantity}`, RenderPosition.BEFOREEND);

}

