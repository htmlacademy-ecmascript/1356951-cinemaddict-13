import Abstract from "../view/abstract.js";
import {SortType} from "../const.js";
const createFilterTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends Abstract {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    /* this._onDateClick = this._onDateClick.bind(this);
    this._onRatingClick = this._onRatingClick.bind(this);*/
  }

  getTemplate() {
    return createFilterTemplate();
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChangeHandler = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    console.log(evt.target.tagName);
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    console.log(evt.target.dataset.sortType);
    this._callback.sortTypeChangeHandler(evt.target.dataset.sortType);

    // this.getElement().querySelector().removeEventListener(`click`, this._sortTypeChangeHandler);
  }

  /*  setDateClickHandler(callback) {
    this._callback.defaultClick = callback;
    this._getElement().querySelector().addEventListeners(`click`, this._onDateClick);
  }

  _onDateClick(evt) {
    evt.preventDefault();
    this._callback.defaultClick();
    this._getElement().querySelector().removeEventListeners(`click`, this._onDateClick);
  }

  setRatingClickHandler(callback) {
    this._callback.defaultClick = callback;
    this._getElement().querySelector().addEventListeners(`click`, this._onRatingClick);
  }

  _onRatingClick(evt) {
    evt.preventDefault();
    this._callback.defaultClick();
    this._getElement().querySelector().removeEventListeners(`click`, this._onRatingClick);
  }*/
}
