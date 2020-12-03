import Abstract from "../view/abstract.js";

const createButtonTepmlate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class Button extends Abstract {
  constructor() {
    super();
    this._onButtonClick = this._onButtonClick.bind(this);
  }
  getTemplate() {
    return createButtonTepmlate();
  }

  setButtonClick(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._onButtonClick);
  }

  _onButtonClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

}
