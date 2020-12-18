import {getRandomInteger, render, RenderPosition} from "./utils.js";
// import {generateFilter} from "./mock/filter.js";
import {createfilm} from "./mock/film.js";
import User from "./view/user.js";
// import Menu from "./view/menu.js";
import Films from "./presenter/films.js";
import Movies from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";


const filmsQuantity = getRandomInteger(0, 20);
const films = new Array(filmsQuantity).fill().map(createfilm);
// const filters = generateFilter(films);
const filmsModel = new Movies();
filmsModel.setFilms(films);
const filterModel = new FilterModel();
const filmsPresenter = new Films(filmsModel);
const headerElement = document.querySelector(`.header`);


export const mainElement = document.querySelector(`.main`);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

render(headerElement, new User().getElement(), RenderPosition.BEFOREEND);

// render(mainElement, new Menu(filters).getElement(), RenderPosition.BEFOREEND);
filterPresenter.init();
filmsPresenter.init();

const footer = document.querySelector(`footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, `${filmsQuantity}`, RenderPosition.BEFOREEND);
