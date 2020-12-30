import Observer from "../model/observer.js";
// import dayjs from "dayjs";

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }
  setFilms(updateType, films) {
    this._films = films.slice();
    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't add comment to unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  getFilm(id) {
    const index = this._films.findIndex((film) => film.id === id);

    if (index === -1) {
      throw new Error(`Can't find an unexisting film`);
    }
    return this._films[index];
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          comments: film.comments,
          actors: film.film_info.actors,
          country: film.film_info.release.release_country,
          description: film.film_info.description,
          director: film.film_info.director,
          duration: film.film_info.runtime,
          filmName: film.film_info.title,
          altFilmName: film.film_info.alternative_title,
          genre: film.film_info.genre,
          id: film.id,
          isInFavorites: film.user_details.favorite,
          isInHistory: film.user_details.already_watched,
          isInWatchlist: film.user_details.watchlist,
          watchingDate: film.user_details.watching_date,
          poster: film.film_info.poster,
          rating: film.film_info.total_rating.toString(),
          releaseDate: new Date(film.film_info.release.date),
          releaseCountry: film.film_info.release.release_country,
          writers: film.film_info.writers,
          year: new Date(film.film_info.release.date),
          ageRating: film.film_info.age_rating

          // dayjs(film.film_info.release.date).format(`YYYY`)
        }
    );
    // delete adaptedFilm.comments;
    delete adaptedFilm.film_info;
    // delete adaptedFilm.id;
    delete adaptedFilm.user_details;
    // Ненужные ключи мы удаляем
    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "comments": film.comments,
          "id": film.id,
          "user_details": {
            "watchlist": film.isInWatchlist,
            "already_watched": film.isInHistory,
            "watching_date": film.watchingDate,
            "favorite": film.isInFavorites,
          },
          "film_info": {
            "actors": film.actors,
            "age_rating": film.ageRating,
            "alternative_title": film.altFilmName,
            "description": film.description,
            "director": film.director,
            "genre": film.genre,
            "poster": film.poster,
            "release": {
              "date": film.releaseDate.toISOString(),
              "release_country": film.releaseCountry
            },
            "runtime": film.duration,
            "title": film.filmName,
            "total_rating": film.rating,
            "writers": film.writers,
          },
        }
    );

    // Ненужные ключи мы удаляем
    // delete adaptedFilm.comments;
    delete adaptedFilm.actors;
    delete adaptedFilm.country;
    delete adaptedFilm.description;
    delete adaptedFilm.director;
    delete adaptedFilm.duration;
    delete adaptedFilm.filmName;
    delete adaptedFilm.altFilmName;
    delete adaptedFilm.genre;
    // delete adaptedFilm.id;
    delete adaptedFilm.isInFavorites;
    delete adaptedFilm.isInHistory;
    delete adaptedFilm.isInWatchlist;
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.poster;
    delete adaptedFilm.rating;
    delete adaptedFilm.releaseDate;
    delete adaptedFilm.releaseCountry;
    delete adaptedFilm.writers;
    delete adaptedFilm.year;

    return adaptedFilm;
  }
}
