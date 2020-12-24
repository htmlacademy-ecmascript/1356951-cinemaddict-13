import {/* getRandomInteger, */render, RenderPosition} from "./utils.js";
// import {createfilm} from "./mock/film.js";
import User from "./view/user.js";
import Films from "./presenter/films.js";
import Movies from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
import {UpdateType} from "./const.js";

const AUTHORIZATOIN = `Basic oimtcs2fdgf`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;
const api = new Api(END_POINT, AUTHORIZATOIN);
const filmsModel = new Movies();
/* api.getFilms().then((films) => {
  console.log(films);
});*/
api.getFilms().then((films) => {
  filmsModel.setFilms(UpdateType.MAJOR, films);
});
console.log(filmsModel.getFilms());
console.log(api.getFilms());

// const filmsQuantity = getRandomInteger(0, 20);
// const films = new Array(filmsQuantity).fill().map(createfilm);

// filmsModel.setFilms(films);
// console.log(filmsModel.getFilms());
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
render(footerStat, `${filmsModel.getFilms().length}`, RenderPosition.BEFOREEND);
