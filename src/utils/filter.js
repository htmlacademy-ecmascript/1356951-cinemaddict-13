import {FilterType} from "../const.js";


export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isInHistory),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isInFavorites)
};


