import Abstract from "../view/abstract.js";

const createFilmCardTemplate = (film) => {
  const {
    filmName,
    poster,
    description,
    comments,
    rating,
    year,
    duration,
    genre
  } = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCard extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._onClick = this._onClick.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setClick(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._onClick);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._onClick);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._onClick);
  }

  _onClick(evt) {
    evt.preventDefault();
    this._callback.click();
    this.getElement().querySelector(`.film-card__poster`).removeEventListener(`click`, this._onClick);
    this.getElement().querySelector(`.film-card__title`).removeEventListener(`click`, this._onClick);
    this.getElement().querySelector(`.film-card__comments`).removeEventListener(`click`, this._onClick);
  }
}
