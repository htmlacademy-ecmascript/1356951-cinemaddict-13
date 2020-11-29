import {createElement} from "../utils.js";

const createFilterItemTemplate = (film) => {
  const {name, count} = film;
  return (
    `<a href="#${name.toLowerCase()}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );

};

const createMenuTemplate = (films) => {
  const filterItemTemplate = films.map((film) => createFilterItemTemplate(film)).join(``);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemTemplate}
        </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
