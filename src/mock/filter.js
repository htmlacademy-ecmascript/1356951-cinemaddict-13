const filmToFilterMap = {
  History: (films) => films.filter((film) => film.isInHistory).length,
  Watchlist: (films) => films
    .filter((film) => film.isInWatchlist).length,
  Favorites: (films) => films
    .filter((film) => film.isInFavorites).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(films),
    };
  });
};
