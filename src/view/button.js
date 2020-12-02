import Abstract from "../view/abstract.js";

const createButtonTepmlate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class Button extends Abstract {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }
  getTemplate() {
    return createButtonTepmlate();
  }

  setClick(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._onClick);
  }

  _onClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

}
