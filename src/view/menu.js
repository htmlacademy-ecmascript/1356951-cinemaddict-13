import Smart from "../view/smart.js";

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  if (name !== `All movies`) {
    return (
      `<a href="#${name.toLowerCase()}" class="main-navigation__item ${type === currentFilterType ?
        `main-navigation__item--active` :
        ``}">${name} <span class="main-navigation__item-count">${count}</span></a>`
    );
  } else {
    return (`<a href="#${name.toLowerCase()}" class="main-navigation__item ${type === currentFilterType ?
      `main-navigation__item--active` :
      ``}">${name} </a>`
    );
  }
};
const createMenuTemplate = (filters, currentFilterType) => {
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

export default class Menu extends Smart {
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

  restoreHandlers() {
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
    if (evt.target.localName === `span`) {
      return;
    }
    this._currentFilter = evt.target.firstChild.textContent.toLowerCase().slice(0, -1);
    if (evt.target.firstChild.textContent.toLowerCase().slice(0, -1) === `stat`) {
      this.getElement().querySelectorAll(`.main-navigation__item`).forEach((navigationItem) => navigationItem.removeEventListener(`click`, this._filterTypeChangeHandler));
      this.getElement().querySelector(`.main-navigation__additional`).removeEventListener(`click`, this._filterTypeChangeHandler);
      this.getElement().querySelector(`.main-navigation__additional`).removeEventListener(`click`, this._menuTypeChangeHandler);

    }
    this.updateElement();
    this._callback.sortClick(evt.target.firstChild.textContent.toLowerCase().slice(0, -1));
  }

  _menuTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.firstChild.textContent.toLowerCase().slice(0, -1));
  }
}
