import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const countTotalDurationWatchedFilm = (films) => {
  let counter = 0;
  for (let i = 0; i < films.length; i++) {
    counter += films[i].duration;
  }
  return counter;
};
export const getWatchedFilmInRangeDate = (data) => {
  const {films, dateFrom, dateTo} = data;
  let watchedFilms = films.getFilms().slice().filter((film) => {
    if (film.isInHistory === false) {
      return false;
    }
    return true;

  }).filter((film) => {
    if (film.watchingDate === null) {
      return false;
    } else {
      if (
        dayjs(film.watchingDate).isSame(dateFrom, `day`) ||
        dayjs(film.watchingDate).isBetween(dateFrom, dateTo) ||
        dayjs(film.watchingDate).isSame(dateTo, `day`)
      ) {
        return true;
      }
    }
    return false;
  });
  return watchedFilms;
};

export const getMostWatchedGenreFilm = (watchedFilms) => {
  let genres = [];
  if (watchedFilms !== `0`) {
    watchedFilms.forEach((film) => {
      film.genre.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });

    let genresCountArray = [];

    for (let i = 0; i < genres.length; i++) {
      let count = 0;
      genresCountArray.push([]);
      genresCountArray[i].push(genres[i]);
      watchedFilms.forEach((film) => {
        film.genre.forEach((genre) => {
          if (genre.includes(genres[i])) {
            count++;
          }
        });
      });
      genresCountArray[i].push(count);
    }
    genresCountArray.sort(function (a, b) {
      return b[1] - a[1];
    });
    return genresCountArray;
  }
  return `None`;
};
