import Abstract from "../view/abstract.js";
import {getTimeFromMins} from "../utils.js";

const createFilmCardTemplate = (film) => {
  const {
    filmName,
    poster,
    description,
    comments,
    rating,
    year,
    duration,
    genre,
    isInFavorites,
    isInHistory,
    isInWatchlist
  } = film;

  const getActiveClass = (param) => {
    const activeClass = param ? ` film-card__controls-item--active` : ``;
    return activeClass;
  };

  const getYear = () => {
    const onlyYear = year.getFullYear();
    return onlyYear;
  };

  const getDescription = () => {
    const totalDescription = description.length > 140 ?
      description.slice(0, 139) + `...` :
      description;
    return totalDescription;
  };
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getYear()}</span>
        <span class="film-card__duration">${getTimeFromMins(duration)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${getDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${getActiveClass(isInWatchlist)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${getActiveClass(isInHistory)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${getActiveClass(isInFavorites)}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._data = FilmCard.parseFilmToData(film);
    this._onFilmCardClick = this._onFilmCardClick.bind(this);
    this._onWatchedlistClick = this._onWatchedlistClick.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
  }

  setFilmCardClickListeners(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._onFilmCardClick);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._onFilmCardClick);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._onFilmCardClick);
  }

  _onFilmCardClick(evt) {
    evt.preventDefault();
    this._callback.click();
    this.getElement().querySelector(`.film-card__poster`).removeEventListener(`click`, this._onFilmCardClick);
    this.getElement().querySelector(`.film-card__title`).removeEventListener(`click`, this._onFilmCardClick);
    this.getElement().querySelector(`.film-card__comments`).removeEventListener(`click`, this._onFilmCardClick);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._onFavoriteClick);

  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
    this.getElement().querySelector(`.film-card__controls-item--favorite`).removeEventListener(`click`, this._onFavoriteClick);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._onWatchlistClick);
  }

  _onWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).removeEventListener(`click`, this._onWatchlistClick);
  }

  setWatchedlistClickHandler(callback) {
    this._callback.watchedlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._onWatchedlistClick);
  }

  _onWatchedlistClick(evt) {
    evt.preventDefault();
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).removeEventListener(`click`, this._onWatchedlistClick);
    this._callback.watchedlistClick();
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
        }
    );
  }
}
