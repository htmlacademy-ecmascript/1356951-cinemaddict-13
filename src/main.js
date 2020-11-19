const CARD_FILM_QUANTITY = 5;
const TOP_CARD_FILM_QUANTITY = 2;
const COMMENTED_CARD_FILM_QUANTITY = 2;

import {createUserTemplate} from "./view/user.js";
import {createMenuTemplate} from "./view/menu.js";
import {createStatsTemplate} from "./view/stats.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFilmContainer} from "./view/film-container.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createButtonTepmlate} from "./view/button.js";
import {createPopupTemplate} from "./view/popup.js";

const render = (parent, template, place) => {
   parent.insertAdjacentHTML(place, template)
};

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

render(headerElement, createUserTemplate(), `beforeend`);
render(mainElement, createMenuTemplate(), `beforeend`);
// выводим статистику
// render(mainElement, createStatsTemplate(), `beforeend`);
render(mainElement, createFilterTemplate(), `beforeend`);
render(mainElement, createFilmContainer(), `beforeend`);

const filmContainerElement = document.querySelector(`.films-list__container`);
for (let i = 0; i < CARD_FILM_QUANTITY; i++){
 render(filmContainerElement, createFilmCardTemplate(), `beforeend`);
}

// Добавляем кнопку
const filmListElement = document.querySelector(`.films-list`);
render(filmListElement, createButtonTepmlate(), `beforeend`);

// 2шт top
const filmListExtraElement = document.querySelector(`.films-list--extra`);
const filmTopContainerElement = filmListExtraElement.querySelector(`.films-list__container`);

for (let i = 0; i < TOP_CARD_FILM_QUANTITY; i++){
 render(filmTopContainerElement, createFilmCardTemplate(), `beforeend`);
}

// 2шт комментированные
const filmsElement = document.querySelector(`.films`);
const filmListExtraLastElement = filmsElement.lastElementChild;
const filmCommentedContainerElement = filmListExtraLastElement.querySelector(`.films-list__container`);
for (let i = 0; i < COMMENTED_CARD_FILM_QUANTITY; i++){
  render(filmCommentedContainerElement, createFilmCardTemplate(), `beforeend`);
}

// Выводим попап
const bodyElement = document.querySelector(`body`);

/* console.log(bodyElement);
render(bodyElement, createPopupTemplate(), `beforeend`); */
