
// const FILMS_QUANTITY = 20;
// позже удалить
import {getRandomInteger} from "./utils.js";
import {generateFilter} from "./mock/filter.js";

import {createfilm} from "./mock/film.js";
import {createUserTemplate} from "./view/user.js";
import {createMenuTemplate} from "./view/menu.js";
// import {createStatsTemplate} from "./view/stats.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFilmContainer} from "./view/film-container.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createButtonTepmlate} from "./view/button.js";
// import {createPopupTemplate} from "./view/popup.js";

const CARD_FILM_QUANTITY = 5;
const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;
const FILM_COUNT_PER_STEP = 5;


const filmsQuantity = getRandomInteger(15, 20);
const films = new Array(filmsQuantity).fill().map(createfilm);
const filters = generateFilter(films);
// console.log(films);


const render = (parent, template, place) => {
  parent.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, createUserTemplate(), `beforeend`);
render(mainElement, createMenuTemplate(filters), `beforeend`);
// выводим статистику
// render(mainElement, createStatsTemplate(), `beforeend`);
render(mainElement, createFilterTemplate(films), `beforeend`);
render(mainElement, createFilmContainer(), `beforeend`);


const filmContainerElement = document.querySelector(`.films-list__container`);
// отображаем map
for (let i = 0; i < CARD_FILM_QUANTITY; i++) {
  render(filmContainerElement, createFilmCardTemplate(films[i]), `beforeend`);
}

const filmListElement = document.querySelector(`.films-list`);
// Настраиваем логику кнопки

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;


  // Добавляем кнопку

  render(filmListElement, createButtonTepmlate(), `beforeend`);
  const buttonLoadMoreElement = filmListElement.querySelector(`.films-list__show-more`);
  buttonLoadMoreElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
    .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
    .forEach((film) => render(filmContainerElement, createFilmCardTemplate(film), `beforeend`));
    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      buttonLoadMoreElement.remove();
    }
  });
}


// 2шт top
const filmListExtraElement = document.querySelector(`.films-list--extra`);
const filmTopContainerElement = filmListExtraElement.querySelector(`.films-list__container`);
const topFilms = films.sort(function (a, b) {
  return b.rating - a.rating;
});

for (let i = 0; i < TOP_CARD_FILM_QUANTITY; i++) {
  render(filmTopContainerElement, createFilmCardTemplate(topFilms[i]), `beforeend`);
}

// 2шт комментированные
const filmsElement = document.querySelector(`.films`);
const filmListExtraLastElement = filmsElement.lastElementChild;
const filmCommentedContainerElement = filmListExtraLastElement.querySelector(`.films-list__container`);
const commentedFilms = films.sort(function (a, b) {
  return b.comments.length - a.comments.length;
});

for (let i = 0; i < COMMENTED_CARD_FILM_QUANTITY; i++) {
  render(filmCommentedContainerElement, createFilmCardTemplate(commentedFilms[i]), `beforeend`);
}

const footer = document.querySelector(`footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, `${filmsQuantity}`, `beforeend`);

// Выводим попап
// const bodyElement = document.querySelector(`body`);
// render(bodyElement, createPopupTemplate(films[0]), `beforeend`);
