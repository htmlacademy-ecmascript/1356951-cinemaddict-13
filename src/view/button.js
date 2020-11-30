import {createElement} from "../utils.js";

const createButtonTepmlate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class Button {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonTepmlate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(createButtonTepmlate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
