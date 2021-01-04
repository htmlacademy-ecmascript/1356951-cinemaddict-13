import dayjs from "dayjs";
import he from "he";
import SmartView from "../view/smart.js";
import {nanoid} from "../mock/film.js";
import Comments from "../model/comments.js";
import {commentsCollection} from "../mock/film.js";
import {UserActionMessage, UpdateType, UserAction, AUTHORIZATOIN, END_POINT} from "../const.js";
import ApiComments from "../api-comments.js";
import {getTimeFromMins} from "../utils.js";

/*eslint-disable */
const relativeTime = require(`dayjs/plugin/relativeTime`);
 /*eslint-disable */
dayjs.extend(relativeTime);
const apiComments = new ApiComments(END_POINT, AUTHORIZATOIN);

const commentsModel = new Comments();
commentsModel.setComments(commentsCollection);

const createFilmDetails = (name, data) => {
  let filmDetails = ``;
  if (!data.isArray && typeof data !== `object`) {
    filmDetails = (
      `<tr class="film-details__row">
        <td class="film-details__term">${name}</td>
        <td class="film-details__cell">${data}</td>
      </tr>`);
  }
  if (typeof data === `object`) {
    let genresHtml = ``;
    for (let i = 0; i < data.length; i++) {
      genresHtml += `<span class="film-details__genre">${data[i]}</span>`;
    }
    filmDetails = (
      `<tr class="film-details__row">
      <td class="film-details__term">${name}</td>
      <td class="film-details__cell">${genresHtml}</td>
    </tr>`
    );
  }
  return filmDetails;
};

const createComment = ({text, emoji, date, author, idMessage}) => {
  // const today = dayjs();
  // const dayAgo = today.diff(date, `day`) === 0 ? `` : today.diff(date, `day`);
  //const textX = dayAgo === 0 ? `today` : ` ago`;
  console.log(dayjs(date).toNow(true));
  const textMessage = text ? text : ``;
  const chosenEmoji = emoji ?
    `<span class="film-details__comment-emoji">
      <img src=./images/emoji/${emoji}.png width="55" height="55" alt="emoji-smile">
    </span>` :
    `<span class="film-details__comment-emoji">
    <img style="opacity: 0" width="55" height="55">
  </span>`;
  return `<li class="film-details__comment">
  ${chosenEmoji}
    <div>
      <p class="film-details__comment-text">${he.encode(textMessage)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayjs(date).toNow(true)} ago</span>
        <button id="${idMessage}" class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

const createPopupTemplate = (data = {}, commentsAll = []) => {
  const {
    filmName,
    poster,
    description,
    comments,
    rating,
    duration,
    genre,
    director,
    writers,
    actors,
    releaseDate,
    country,
    isInFavorites,
    isInHistory,
    isInWatchlist,
    emoji,
    text,
    altFilmName,
    ageRating
  } = data;
  const renderPlaceholder = (textMessage) => {
    const placeholder = textMessage ? `${data.text}` : ``;
    return placeholder;
  };
  const renderEmogi = (emotion) => {
    if (emotion !== undefined) {
      const emojiY = emotion ?
        `<span><img src="./images/emoji/${emotion.src}.png" width="55" height="55" alt="${emotion.id}"></span>` : ``;
      return emojiY;
    }
    return ``;
  };

  const getActiveClass = (param) => {
    const activeClass = param ? `checked` : ``;
    return activeClass;
  };
  const commentsToRender = Object.keys(commentsAll).length > 0 ?
    comments.map((item) => createComment(commentsAll[item])).join(` `) :
    `Loading ...`;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${poster} alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmName}</h3>
                  <p class="film-details__title-original">Original: ${altFilmName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
              ${createFilmDetails(`Director`, director)}
              ${createFilmDetails(`Writers`, writers)}
              ${createFilmDetails(`Actors`, actors)}
              ${createFilmDetails(`Release Date`, dayjs(releaseDate).format(`DD MMMM YYYY`))}
              ${createFilmDetails(`Runtime`, getTimeFromMins(duration))}
              ${createFilmDetails(`Country`, country)}
              ${createFilmDetails(`Genres`, genre)}

              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" ${getActiveClass(isInWatchlist)} id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden"  ${getActiveClass(isInHistory)} id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden"  ${getActiveClass(isInFavorites)} id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">

            ${commentsToRender}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"> ${renderEmogi(emoji)}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${renderPlaceholder(text)}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`);
};

export default class Popup extends SmartView {
  constructor(film = {}, films) {
    super();
    this._filmsModel = films;
    this._data = Popup.parseFilmToData(film);
    this._commentsModel = new Comments();// commentsModel;
    this._getComments();
    this.updateElement = this.updateElement.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onWatchedlistClick = this._onWatchedlistClick.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._messageToggleHandler = this._messageToggleHandler.bind(this);
    this._messageInputHandler = this._messageInputHandler.bind(this);
    this._smileChangeHandler = this._smileChangeHandler.bind(this);
    this._onDeleteMessageClick = this._onDeleteMessageClick.bind(this);
    this._setInnerHandlers();
  }
  _getComments() {
    apiComments.getComments(this._data)
      .then((comments) => {
        this._commentsModel.setComments(comments);
        this.updateElement();
      });
  }

  _handleViewActionComments(actionType, updateType, update) {
    switch (actionType) {
      case UserActionMessage.ADD_MESSAGE:
        this._commentsModel.addComment(updateType, update);
        break;
      case UserActionMessage.DELETE_MESSAGE:
        this._commentsModel.deleteComment(updateType, update);
        break;
    }
    // Здесь будем вызывать обновление модели.
  }

  _handleViewActionFilm(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_MESSAGE:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_MESSAGE:
        this._filmsModel.deleteComment(updateType, update);
        break;
    }
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._commentsModel.getComments());
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickListener(this._callback.click);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedlistClickHandler(this._callback.watchedlistClick);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._messageInputHandler);
    this.getElement().querySelectorAll(`.film-details__emoji-label`)
    .forEach((item) => item.addEventListener(`click`, this._smileChangeHandler));
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
    .forEach((deleteButton) => deleteButton.addEventListener(`click`, this._onDeleteMessageClick));
    document.addEventListener(`keydown`, this._messageToggleHandler);
  }

  _messageInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value
    }, true);
  }

  _messageToggleHandler(evt) {
    if ((evt.metaKey || evt.ctrlKey) && evt.key === `Enter`) {
      document.removeEventListener(`keydown`, this._messageToggleHandler);
      const emoji = this._data.emoji ? this._data.emoji.src : null;
      const text = this._data.text ? this._data.text : null;
      if (text === null && emoji === null) {
        return;
      }
      const newComment = {
        idMessage: nanoid(),
        text,
        emoji,
        date: dayjs(),
        daysAgo: 7, // date.getTime() / 86400000, /*eslint-disable */
        author: `anon`
      };

      this._handleViewActionComments(
          UserActionMessage.ADD_MESSAGE,
          UpdateType.PATCH,
          newComment
      );

      delete this._data.text;
      delete this._data.emoji;

      this.updateData({
        comments: [...this._data.comments, newComment.idMessage]
      });

      this._handleViewActionFilm(
          UserAction.ADD_MESSAGE,
          UpdateType.MINOR,
          this._data
      );
    }
  }

  _smileChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: {
        // если есть вариант проще и красивее, то не держи в себе
        src: evt.target.getAttribute(`src`).slice(0, -4).replace(`./images/emoji/`, ``),
        id: evt.target.parentNode.getAttribute(`for`)
      }
    }
    );
  }

  _onDeleteMessageClick(evt) {
    evt.preventDefault();
    const index = this._data.comments.findIndex((comment) => comment === evt.target.id);
    const updateComments = [
      ...this._data.comments.slice(0, index),
      ...this._data.comments.slice(index + 1)
    ];
    this.updateData({
      comments: updateComments
    });
    this._handleViewActionFilm(
        UserAction.DELETE_MESSAGE,
        UpdateType.PATCH,
        this._data
    );
  }

  setCloseClickListener(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onClick);
  }

  _onClick(evt) {
    evt.preventDefault();
    delete this._data.text;
    delete this._data.emoji;
    this._callback.click();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`input[name="favorite"`).addEventListener(`change`, this._onFavoriteClick);
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
    this.updateData({
      isInFavorites: !this._data.isInFavorites
    }, true);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`input[name="watchlist"]`).addEventListener(`change`, this._onWatchlistClick);
  }

  _onWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
    this.updateData({
      isInWatchlist: !this._data.isInWatchlist
    }, true);
  }

  setWatchedlistClickHandler(callback) {
    this._callback.watchedlistClick = callback;
    this.getElement().querySelector(`input[name="watched"`).addEventListener(`change`, this._onWatchedlistClick);
  }

  _onWatchedlistClick(evt) {
    evt.preventDefault();
    this._callback.watchedlistClick();
    this.updateData({
      isInHistory: !this._data.isInHistory
    }, true);
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
