import FilmCard from "../view/film-card.js";
import Popup from "../view/popup.js";
import {render, RenderPosition, remove, replace} from "../utils.js";
import {UserAction, UpdateType} from "../const.js";
import dayjs from "dayjs";
import ApiComments from "../api-comments.js";
import {AUTHORIZATOIN, END_POINT} from "../const.js";
import {State} from "../utils/popup.js";
import {FilterType} from "../const.js";

const apiComments = new ApiComments(END_POINT, AUTHORIZATOIN);
const bodyElement = document.querySelector(`body`);

export default class FilmPresenter {
  constructor(changeData, viewChange, container, films) {
    this._filmsModel = films;
    this._filmListElement = container;
    this._changeData = changeData;
    this._viewChange = viewChange;
    this._onOpenPopup = this._onOpenPopup.bind(this);
    this._onClosePopup = this._onClosePopup.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._filmComponent = null;
    this._handlerFavoriteClick = this._handlerFavoriteClick.bind(this);
    this._handlerWatchlistClick = this._handlerWatchlistClick.bind(this);
    this._handlerWatchedlistClick = this._handlerWatchedlistClick.bind(this);
    this._onDeleteCommentPopup = this._onDeleteCommentPopup.bind(this);
    this._onAddCommentPopup = this._onAddCommentPopup.bind(this);
  }

  filmInit(film) {
    this._film = film;
    const prevFilm = this._filmComponent;
    this._filmComponent = new FilmCard(this._film);
    this._filmComponent.setFilmCardClickListeners(this._onOpenPopup);
    this._filmComponent.setWatchedlistClickHandler(this._handlerWatchedlistClick);
    this._filmComponent.setWatchlistClickHandler(this._handlerWatchlistClick);
    this._filmComponent.setFavoriteClickHandler(this._handlerFavoriteClick);

    if (prevFilm === null) {
      render(this._filmListElement, this._filmComponent, RenderPosition.BEFOREEND);
    } else if (this._filmListElement.contains(prevFilm.getElement())) {
      replace(this._filmComponent, prevFilm);
    }
  }

  destroy() {
    remove(this._filmComponent);
  }

  _onOpenPopup() {
    this._viewChange();
    this._popup = new Popup(this._film, this._filmsModel);
    apiComments.getComments(this._film)
    .then((comments) => {
      this._popup.setComments(comments);
    });
    bodyElement.classList.add(`hide-overflow`);
    bodyElement.appendChild(this._popup.getElement());
    this._popup.setWatchedlistClickHandler(this._handlerWatchedlistClick);
    this._popup.setWatchlistClickHandler(this._handlerWatchlistClick);
    this._popup.setFavoriteClickHandler(this._handlerFavoriteClick);
    this._popup.setCloseClickListener(this._onClosePopup);
    this._popup.setDeleteCommentListener(this._onDeleteCommentPopup);
    this._popup.setAddCommentListener(this._onAddCommentPopup);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(escEvt) {
    if (escEvt.key === `Escape` || escEvt.key === `Esc`) {
      escEvt.preventDefault();
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(this._popup.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._filmComponent.setFilmCardClickListeners(this._onOpenPopup);
      this._popup = null;
    }
  }

  closePopup() {
    this._onClosePopup();
  }

  _onClosePopup() {
    if (this._popup) {
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(this._popup.getElement());
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._filmComponent.setFilmCardClickListeners(this._onOpenPopup);
      this._popup = null;
    }
  }

  _onAddCommentPopup(newComment, film) {
    apiComments.addComment(newComment, film).then((response) => {
      this._changeData(
          UserAction.ADD_COMMENT,
          UpdateType.MINOR,
          response[0]
      );
      this._popup.addComment(response);
    });
  }

  _onDeleteCommentPopup(updateType, deletingComment, updateComments) {
    apiComments.deleteComment(deletingComment).then(() => {
      this._popup.deleteCommentInModel(updateType, deletingComment, updateComments);
      this._changeData(
          UserAction.UPDATE_FILM,
          UpdateType.PATCH,
          Object.assign(
              {},
              this._film,
              {
                comments: updateComments,
                deletingComment: null,
                isDisabled: false,
                isDeleting: false
              }
          )
      );
    })
    .catch(() => {
      this._popup.setViewState(State.ABORTING);
    });
  }

  _handlerFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isInFavorites: !this._film.isInFavorites
            }
        ),
        FilterType.FAVORITES
    );
  }

  _handlerWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isInWatchlist: !this._film.isInWatchlist
            }
        ),
        FilterType.WATCHLIST
    );
  }

  _handlerWatchedlistClick() {
    if (this._film.watchingDate !== null) {
      this._changeData(
          UserAction.UPDATE_FILM,
          UpdateType.PATCH,
          Object.assign(
              {},
              this._film,
              {
                isInHistory: !this._film.isInHistory,
                watchingDate: null
              }
          ),
          FilterType.HISTORY
      );
    } else {
      this._changeData(
          UserAction.UPDATE_FILM,
          UpdateType.PATCH,
          Object.assign(
              {},
              this._film,
              {
                isInHistory: !this._film.isInHistory,
                watchingDate: dayjs().toDate()
              }
          )
      );
    }
  }

  _actionWithComments(film, commentsModel, callback) {
    apiComments.getComments(film)
    .then((comments) => {
      commentsModel.setComments(comments);
      callback();
    });
  }
}
