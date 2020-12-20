import {getRandomInteger, render, RenderPosition} from "./utils.js";
import {createfilm} from "./mock/film.js";
import User from "./view/user.js";
import Films from "./presenter/films.js";
import Movies from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";


const filmsQuantity = getRandomInteger(0, 20);
const films = new Array(filmsQuantity).fill().map(createfilm);
const filmsModel = new Movies();
filmsModel.setFilms(films);
const filterModel = new FilterModel();
const filmsPresenter = new Films(filmsModel, filterModel);
const headerElement = document.querySelector(`.header`);


export const mainElement = document.querySelector(`.main`);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

render(headerElement, new User().getElement(), RenderPosition.BEFOREEND);

filterPresenter.init();
filmsPresenter.init();

const footer = document.querySelector(`footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, `${filmsQuantity}`, RenderPosition.BEFOREEND);
