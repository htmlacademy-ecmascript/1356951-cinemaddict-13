import {/* getRandomInteger, */render, RenderPosition} from "./utils.js";
// import {createfilm} from "./mock/film.js";
import User from "./view/user.js";
import Films from "./presenter/films.js";
import Movies from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
// import ApiComments from "./api-comments.js";
import {UpdateType, AUTHORIZATOIN, END_POINT} from "./const.js";

// const AUTHORIZATOIN = `Basic oimtcs2fdgf`;
// const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;
const api = new Api(END_POINT, AUTHORIZATOIN);
const filmsModel = new Movies();
/* api.getFilms().then((films) => {
  console.log(films);
});*/

// console.log(filmsModel);
// console.log(api.getFilms().length);

// const filmsQuantity = getRandomInteger(0, 20);
// const films = new Array(filmsQuantity).fill().map(createfilm);

// filmsModel.setFilms(films);
// const tyt = filmsModel.getFilms();
// console.log(tyt);
// console.log(filmsModel.getFilms().length);
const filterModel = new FilterModel();
const filmsPresenter = new Films(filmsModel, filterModel, api);
const headerElement = document.querySelector(`.header`);


export const mainElement = document.querySelector(`.main`);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

render(headerElement, new User().getElement(), RenderPosition.BEFOREEND);

// filterPresenter.init();
filmsPresenter.init();

/* const footer = document.querySelector(`footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, `${filmsModel.getFilms().length}`, RenderPosition.BEFOREEND);*/
api.getFilms()
  .then((films) => {
    filterPresenter.init();
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filterPresenter.init();
    filmsModel.setFilms(UpdateType.INIT, []);
  });
