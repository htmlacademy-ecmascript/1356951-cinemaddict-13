import Abstract from "../view/abstract.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item ${type === currentFilterType ?
      `main-navigation__item--active` :
      ``}">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );

};
const createMenuTemplate = (filters, currentFilterType) => {
  console.log(filters, currentFilterType);
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(``);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
        </div>
      <a href="#stats" class="main-navigation__additional ${currentFilterType === `stat` ?
      `main-navigation__additional--active` :
      ``}">Stats</a>
    </nav>`
  );
};

export default class Menu extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._menuTypeChangeHandler = this._menuTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  /* updateClasses() {
    const statisticCtx = document.querySelector(`.main-navigation__additional`);
    statisticCtx.innerHtml = ``;
    this._setChart(statisticCtx);

  }*/
  updateElement() {
    let prevElement = this.getElement();
    const scroll = prevElement.scrollTop;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = scroll;
    this.restoreHandlers();
  }

  restoreHandlers() {
    // throw new Error(`Abstract method not implemented: resetHandlers`);
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((navigationItem) => navigationItem.addEventListener(`click`, this._filterTypeChangeHandler));
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._filterTypeChangeHandler);
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._menuTypeChangeHandler);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.sortClick = callback;
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((navigationItem) => navigationItem.addEventListener(`click`, this._filterTypeChangeHandler));
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._filterTypeChangeHandler);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._menuTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    console.log(evt.target.firstChild.textContent.toLowerCase().slice(0, -1));
    /* if (evt.target.firstChild.textContent.toLowerCase().slice(0, -1) === `stat`) {
      this.getElement().querySelector(`main-navigation__item--active`).classList.remove(`.main-navigation__item--active`);
      this.getElement().querySelector(`main-navigation__additional`).classList.add(`.main-navigation__additional--active`);
    } else {
      this.getElement().querySelector(`main-navigation__additional`).classList.remove(`.main-navigation__additional--active`);
    }*/
    if (evt.target.firstChild.textContent.toLowerCase().slice(0, -1) === `stat`) {
      this._currentFilter = `stat`;
      this.updateElement();
    }
    this._callback.sortClick(evt.target.firstChild.textContent.toLowerCase().slice(0, -1));
  }

  _menuTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.firstChild.textContent.toLowerCase().slice(0, -1));
  }
}
