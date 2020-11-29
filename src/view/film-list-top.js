import {createElement} from "../utils.js";

const createFilmListTop = () => {
  return (
    `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmListTop {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListTop();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(createFilmListTop());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
