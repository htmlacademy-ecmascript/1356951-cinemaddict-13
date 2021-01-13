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
