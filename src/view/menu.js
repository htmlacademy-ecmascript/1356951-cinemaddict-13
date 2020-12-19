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
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(``);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
        </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilter);
  }

  _setFilterTypeChangeHandler(callback) {
    this._callback.sortClick = callback;
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((navigationItem) => navigationItem.addEventListener(`click`, this._filterTypeChangeHandler));
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.sortClick(evt.target.firstChild.textContent.toLowerCase().slice(0, -1));
  }
}
