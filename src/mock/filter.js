const filmToFilterMap = {
  History: (films) => films.filter((film) => film.isInHistory).length,
  Watchlist: (films) => films
    .filter((film) => film.isInWatchlist).length,
  Favorites: (films) => films
    .filter((film) => film.isInFavorites).length,
  /* favorites: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => task.isFavorite).length,
  repeating: (tasks) => tasks
    .filter((task) => !task.isArchive)
    .filter((task) => isTaskRepeating(task.repeating)).length,
  archive: (tasks) => tasks.filter((task) => task.isArchive).length,*/
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(films),
    };
  });
};
