import {SortType} from "../const.js";


export const filter = {
  [SortType.ALL]: (films) => films,
  [SortType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [SortType.HISTORY]: (films) => films.filter((film) => film.isInHistory),
  [SortType.FAVORITES]: (films) => films.filter((film) => film.isInFavorites)
  // [SortType.DEFAULT]: (films) => films,
  // [SortType.DATE]: (films) => films.filter((film) => film.isArchive),
  // [SortType.RATING]: (films) => films.filter((film) => isTaskRepeating(film.repeating)),
};


