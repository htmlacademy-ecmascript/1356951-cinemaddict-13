import {render, RenderPosition} from "./utils.js";
// import {createfilm} from "./mock/film.js";
import User from "./view/user.js";
import Films from "./presenter/films.js";
import Movies from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import Api from "./api.js";
// import ApiComments from "./api-comments.js";
import {UpdateType, AUTHORIZATOIN, END_POINT} from "./const.js";
import Stats from "./view/stats.js";


const api = new Api(END_POINT, AUTHORIZATOIN);
const filmsModel = new Movies();

const filterModel = new FilterModel();
const filmsPresenter = new Films(filmsModel, filterModel, api);
const headerElement = document.querySelector(`.header`);


export const mainElement = document.querySelector(`.main`);
const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);

render(headerElement, new User().getElement(), RenderPosition.BEFOREEND);


// сл строку надо убрать(она не нужна), но тогда линтер будет ругать, оставлю это на попозже
// filmsPresenter.init();
// console.log(filmsModel.getFilms().slice());
const statComponent = new Stats(filmsModel);

statComponent.hide();


api.getFilms()
  .then((films) => {
    filterPresenter.init();
    filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, films);
    // filmsPresenter.renderStat();
    render(mainElement, statComponent, RenderPosition.BEFOREEND);
    // statComponent.setPeriodTypeChangeHandler();

  })
  .catch(() => {
    filterPresenter.init();
    filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, []);
    // filmsPresenter.renderStat();
    render(mainElement, statComponent, RenderPosition.BEFOREEND);
  });

const handleSiteMenuClick = (menuItem) => {

  switch (menuItem) {
    /* case MenuItem.ALL:
      console.log(`all`);
      // Скрыть статистику
      // Показать доску
      // boardPresenter.createTask(handleTaskNewFormClose);
      // statComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.WATCHLIST:
      console.log(`WATCHLIST`);
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.HISTORY:
      console.log(`HISTORY`);
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.FAVORITES:
      console.log(`FAVORITES`);
      // Показать доску
      // Скрыть статистику
      break;*/
    case `stat`:
      // Скрыть доску
      filmsPresenter.hide();
      statComponent.updateElement();
      statComponent.setPeriodTypeChangeHandler();
      statComponent.show();
      filmsPresenter.updateFooter();
      // Показать статистику
      break;
    default:
      // filmsPresenter.init();
      filmsPresenter.show();
      statComponent.hide();
  }
};

// setMenuClickHandler;
// filterPresenter.setMenuClickHandler(handleSiteMenuClick);
