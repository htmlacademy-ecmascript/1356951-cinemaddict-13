import {getRandomInteger, renderElement, RenderPosition} from "./utils.js";
import {generateFilter} from "./mock/filter.js";
import {createfilm/* , commentsCollection*/} from "./mock/film.js";
// import {createMenuTemplate} from "./view/menu.js";
// import {createFilmContainer} from "./view/film-container.js";
import FilmCard from "./view/film-card.js";
import Button from "./view/button.js";
import User from "./view/user.js";
import Filter from "./view/filter.js";
// import Stats from "./view/stats.js";FilmListContainer
import FilmContainer from "./view/film-container.js";
import FilmList from "./view/film-list.js";
import FilmListTop from "./view/film-list-top.js";
import FilmListCommented from "./view/film-list-commented.js";
import FilmListContainer from "./view/film-list-container.js";
import Menu from "./view/menu.js";

import Popup from "./view/popup.js";

const CARD_FILM_QUANTITY = 5;
const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;
const FILM_COUNT_PER_STEP = 5;


const filmsQuantity = getRandomInteger(15, 20);
const films = new Array(filmsQuantity).fill().map(createfilm);
const filters = generateFilter(films);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

renderElement(headerElement, new User().getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new Menu(filters).getElement(), RenderPosition.BEFOREEND);

// выводим статистику
// renderElement(mainElement, new Stats().getElement(), RenderPosition.BEFOREEND);
renderElement(mainElement, new Filter().getElement(), RenderPosition.BEFOREEND);

const filmContainer = new FilmContainer().getElement();
renderElement(mainElement, filmContainer, RenderPosition.BEFOREEND);

const filmList = new FilmList().getElement();
renderElement(filmContainer, filmList, RenderPosition.BEFOREEND);
const filmListContainer = new FilmListContainer().getElement();
renderElement(filmList, filmListContainer, RenderPosition.BEFOREEND);

// отображаем map
for (let i = 0; i < CARD_FILM_QUANTITY; i++) {
  renderElement(filmListContainer, new FilmCard(films[i]).getElement(), RenderPosition.BEFOREEND);
}

// Настраиваем логику кнопки
if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  // Добавляем кнопку
  const loadMoreButton = new Button().getElement();
  renderElement(filmList, loadMoreButton, RenderPosition.BEFOREEND);
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
    .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
    .forEach((film) => renderElement(filmListContainer, new FilmCard(film).getElement(), `beforeend`));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
      loadMoreButton.removeElement();
    }
  });
}

// 2шт top
const filmListTop = new FilmListTop().getElement();
renderElement(filmContainer, filmListTop, RenderPosition.BEFOREEND);
const filmListContainerTop = new FilmListContainer().getElement();
renderElement(filmListTop, filmListContainerTop, RenderPosition.BEFOREEND);

const topFilms = films.sort(function (a, b) {
  return b.rating - a.rating;
});

for (let i = 0; i < TOP_CARD_FILM_QUANTITY; i++) {
  renderElement(filmListContainerTop, new FilmCard(topFilms[i]).getElement(), RenderPosition.BEFOREEND);
}

// 2шт комментированные
const filmListCommented = new FilmListCommented().getElement();
renderElement(filmContainer, filmListCommented, RenderPosition.BEFOREEND);
const filmListContainerCommented = new FilmListContainer().getElement();
renderElement(filmListCommented, filmListContainerCommented, RenderPosition.BEFOREEND);

const commentedFilms = films.sort(function (a, b) {
  return b.comments.length - a.comments.length;
});

for (let i = 0; i < COMMENTED_CARD_FILM_QUANTITY; i++) {
  renderElement(filmListContainerCommented, new FilmCard(commentedFilms[i]).getElement(), RenderPosition.BEFOREEND);
}

const footer = document.querySelector(`footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
renderElement(footerStat, `${filmsQuantity}`, RenderPosition.BEFOREEND);

// Выводим попап
// const bodyElement = document.querySelector(`body`);
// renderElement(bodyElement, new Popup(films[0], commentsCollection).getElement(), RenderPosition.BEFOREEND);
