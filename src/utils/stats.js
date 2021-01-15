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

export const countTotalDurationWatchedFilm = (films, dateFrom, dateTo) => {
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
      return counter + film.duration;
    }

    return counter;
  }, 0);
};
/* const getWatchedFilm = ((film, dateFrom, dateTo) => {
  if (film.watchingDate === null) {
    return false;
  } else {
    if (
      dayjs(film.watchingDate).isSame(dateFrom) ||
      dayjs(film.watchingDate).isBetween(dateFrom, dateTo) ||
      dayjs(film.watchingDate).isSame(dateTo)
    ) {
      return true;
    }
  }
  return false;
});*/

/* const tyt = (film) => {
  if (film.watchingDate !== null) {
    return true;
  }

};*/

export const getMostWatchedGenreFilm = (films, dateFrom, dateTo) => {
  let watchedFilms = films.filter((film) => {
    if (film.watchingDate === null) {
      return false;
    } else {
      if (
        dayjs(film.watchingDate).isSame(dateFrom) ||
        dayjs(film.watchingDate).isBetween(dateFrom, dateTo) ||
        dayjs(film.watchingDate).isSame(dateTo)
      ) {
        return true;
      }
    }
    return false;
  });
  let genres = [];
  // console.log(films);
  console.log(watchedFilms);
  watchedFilms.forEach((film) => {
    film.genre.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
  });
  console.log(genres);

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
  console.log(genres);
  console.log(genresCountArray);
  genresCountArray.sort(function (a, b) {
    return b[1] - a[1];
  });

  return genresCountArray;
};
