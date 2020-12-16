import {getRandomInteger, render, RenderPosition} from "./utils.js";
import {generateFilter} from "./mock/filter.js";
import {createfilm} from "./mock/film.js";
import User from "./view/user.js";
import Menu from "./view/menu.js";
import Films from "./presenter/films.js";
import Movies from "./model/movies.js";


const filmsQuantity = getRandomInteger(0, 20);
const films = new Array(filmsQuantity).fill().map(createfilm);
const filters = generateFilter(films);
const FilmsPresenter = new Films();
const headerElement = document.querySelector(`.header`);

const filmsModel = new Movies();
filmsModel.setFilms(films);

export const mainElement = document.querySelector(`.main`);

render(headerElement, new User().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new Menu(filters).getElement(), RenderPosition.BEFOREEND);
FilmsPresenter.init(filmsModel);

const footer = document.querySelector(`footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, `${filmsQuantity}`, RenderPosition.BEFOREEND);
