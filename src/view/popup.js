// import Abstract from "../view/abstract.js";
import dayjs from "dayjs";
import SmartView from "../view/smart.js";
import {nanoid} from "../mock/film.js";

/* let nanoid = (t = 5)=>{
  let e = ``; let r = crypto.getRandomValues(new Uint8Array(t)); for (;t--;) {
    /*eslint-disable */
// let n = 63 & r[t]; e += n < 36 ? n.toString(36) : n < 62 ? (n - 26).toString(36).toUpperCase() : n < 63 ? `_` : `-`;
/*eslint-disable */
 // } return e;
//};*/

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

const createComment = ({text, emoji, date, author}) => {
  const today = dayjs();
  const dayAgo = today.diff(date, `day`) === 0 ? `` : today.diff(date, `day`);
  const textX = dayAgo === 0 ? `today` : ` days ago`;
  const textMessage = text ? text : ``;
  const chosenEmoji = emoji ?
  `<span class="film-details__comment-emoji">
      <img src=${emoji} width="55" height="55" alt="emoji-smile">
    </span>` : ``;
  return `<li class="film-details__comment">
  ${chosenEmoji}
    <div>
      <p class="film-details__comment-text">${textMessage}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${dayAgo}${textX}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

const createPopupTemplate = (data = {}, commentsX = []) => {
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
    text
    // isMessage  134  ${// if (isMessage) {createComment()}}

  } = data;
  console.log(comments);
  console.log(commentsX);
  const renderPlaceholder = (textMessage) => {
    const placeholder = textMessage ? `${data.text}` : ``;
    return placeholder;
  };
  const renderEmogi = (emogiX) => {
    const emojiY = emogiX ?
      `<span><img src="${emogiX.src}" width="55" height="55" alt="${emogiX.id}"></span>` : ``;
    return emojiY;
  };

  const getActiveClass = (param) => {
    const activeClass = param ? `checked` : ``;
    return activeClass;
  };

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

              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmName}</h3>
                  <p class="film-details__title-original">Original: ${filmName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
              ${createFilmDetails(`Director`, director)}
              ${createFilmDetails(`Writers`, writers)}
              ${createFilmDetails(`Actors`, actors)}
              ${createFilmDetails(`Release Date`, releaseDate)}
              ${createFilmDetails(`Runtime`, duration)}
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
            ${comments.map((item) => createComment(commentsX[item])).join(` `)}

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
  constructor(film = {}, comments) {
    super();
    this._data = Popup.parseFilmToData(film);
    console.log(comments);
    // this._commentsData = Popup.parsecommentsToData(comments);
    this._comments = comments;
    this._onClick = this._onClick.bind(this);
    this._onWatchedlistClick = this._onWatchedlistClick.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._messageToggleHandler = this._messageToggleHandler.bind(this);
    this._messageInputHandler = this._messageInputHandler.bind(this);
    this._smileChangeHandler = this._smileChangeHandler.bind(this);
    console.log(this._data);
    /* this.updateData({
      emoji: `smile`
    });*/
    // console.log(this._data);
    this._setInnerHandlers();
    // console.log(this._commentsData);
  }

  getTemplate() {
    return createPopupTemplate(this._data, this._comments);
  }
  //

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickListener(this._callback.click);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedlistClickHandler(this._callback.watchedlistClick);
  }

  _setInnerHandlers() {

    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._messageInputHandler);
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`click`, this._smileChangeHandler);
    this.getElement().addEventListener(`keydown`, this._messageToggleHandler);
  }

  _messageInputHandler(evt) {
    evt.preventDefault();
    console.log(evt.target.value);
    this.updateData({
      text: evt.target.value
    }, true);
  }

  _messageToggleHandler(evt) {
   // evt.preventDefault();
    console.log(evt.key);
    if ((evt.metaKey || evt.ctrlKey) && evt.key === `Enter`) {
      // this.updateData({
        // isMessage: !this._data.isMessage,
        const newComment = {
          idMessage: nanoid(),
          text: this._data.text,
          emoji: this._data.emoji.src,
          daysAgo: 7,//date.getTime() / 86400000,
          date: dayjs(),
          author: `anon`
            };
       // comments: this._data.comments.push()
      this._comments[newComment.idMessage] = newComment;
      // });
      this.updateData({
       comments: [...this._data.comments, newComment.idMessage]
      })
    }

  }

  _smileChangeHandler(evt) {
    evt.preventDefault();
    console.log(evt.target.parentNode);
    this.updateData({
      emoji: {
        src: evt.target.src,
        id: evt.target.parentNode.getAttribute(`for`)
      }
    }
    );
  }

  setCloseClickListener(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._onClick);
  }

  _onClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`input[name="favorite"`).addEventListener(`change`, this._onFavoriteClick);

  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
    // this.getElement().querySelector(`input[name="favorite"`).removeEventListener(`change`, this._onFavoriteClick);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`input[name="watchlist"]`).addEventListener(`change`, this._onWatchlistClick);
  }

  _onWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
    // this.getElement().querySelector(`input[name="watchlist"`).removeEventListener(`change`, this._onWatchlistClick);
  }

  setWatchedlistClickHandler(callback) {
    this._callback.watchedlistClick = callback;
    this.getElement().querySelector(`input[name="watched"`).addEventListener(`change`, this._onWatchedlistClick);
  }

  _onWatchedlistClick(evt) {
    evt.preventDefault();
    this._callback.watchedlistClick();
    // this.getElement().querySelector(`input[name="watched"`).removeEventListener(`change`, this._onWatchedlistClick);
  }

  static parseFilmToData(film) {
    return Object.assign(
        {},
        film,
        {
          isMessage: film.message !== null,
          idNewMessage: nanoid()
        }
    );
  }

  static parseDataToFilm(data) {
    let film = Object.assign({}, data);


    delete film.isMessage;
    /* delete film.textMessage;
    delete film.emojiMessage;
    delete film.dateMessage;
    delete film.authorMessage;*/
    return film;
  }

  /*static parsecommentsToData(comments) {
    return Object.assign(
      {},
      comments,
      {
        /*idMessage: kgk5u: {
              idMessage: `kgk5u`,
              text: `привет`,// this.data.text;
              emoji: `./images/emoji/smile.png`, //  this.data.emoji.src;
              daysAgo: 7,//date.getTime() * (-1) / 86400000,
              date: dayjs(),
              author: `anon`
              }
      }
    )
  }*/

}
