import {render, RenderPosition} from "./utils.js";
// import {createfilm} from "./mock/film.js";
import User from "./view/user.js";
import Films from "./presenter/films.js";
import Movies from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
import {UpdateType, AUTHORIZATOIN, END_POINT} from "./const.js";
import Stats from "./view/stats.js";

export const api = new Api(END_POINT, AUTHORIZATOIN);
const filmsModel = new Movies();
const filterModel = new FilterModel();
const filmsPresenter = new Films(filmsModel, filterModel, api);
const headerElement = document.querySelector(`.header`);

export const mainElement = document.querySelector(`.main`);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

render(headerElement, new User().getElement(), RenderPosition.BEFOREEND);

const statComponent = new Stats(filmsModel);

api.getFilms()
  .then((films) => {
    filterPresenter.init();
    filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, films);
    render(mainElement, statComponent, RenderPosition.BEFOREEND);
    statComponent.hide();
  })
  .catch(() => {
    filterPresenter.init();
    filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, []);
    render(mainElement, statComponent, RenderPosition.BEFOREEND);
    statComponent.hide();
  });

const handleSiteMenuClick = (menuItem) => {

  switch (menuItem) {
    case `stat`:
      // Скрыть доску
      filmsPresenter.hide();
      // Показать статистику
      statComponent.updateElement();
      statComponent.setPeriodTypeChangeHandler();
      filmsPresenter.updateFooter();
      break;
    default:
      filmsPresenter.show();
      statComponent.hide();
  }
};
