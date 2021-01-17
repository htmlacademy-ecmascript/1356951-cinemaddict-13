import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const countWatchedFilmInDateRange = (films, dateFrom, dateTo) => {
  return films.reduce((counter, film) => {
    if (film.watchingDate === null) {
      return counter;
    }

    // С помощью day.js проверям, сколько задач с дедлайном
    // попадают в диапазон дат
    if (
      dayjs(film.watchingDate).isSame(dateFrom) ||
      dayjs(film.watchingDate).isBetween(dateFrom, dateTo) ||
      dayjs(film.watchingDate).isSame(dateTo)
    ) {
      return counter + 1;
    }

    return counter;
  }, 0);
};

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
        dayjs(film.watchingDate).isSame(dateFrom) ||
        dayjs(film.watchingDate).isBetween(dateFrom, dateTo) ||
        dayjs(film.watchingDate).isSame(dateTo)
      ) {
        // console.log(dayjs(film.watchingDate));
        // console.log(dateFrom);
        return true;
      }
    }
    return false;
  });
  // console.log(watchedFilms);
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
      // genresCountArray[i].push(0);
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
