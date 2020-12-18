import {SortType} from "../const.js";


export const filter = {
  [SortType.ALL]: (tasks) => tasks.filter((task) => !task.isArchive),
  // [SortType.OVERDUE]: (tasks) => tasks.filter((task) => isTaskExpired(task.dueDate)),
  // [SortType.TODAY]: (tasks) => tasks.filter((task) => isTaskExpiringToday(task.dueDate)),
  [SortType.FAVORITES]: (tasks) => tasks.filter((task) => task.isFavorite),
  // [SortType.REPEATING]: (tasks) => tasks.filter((task) => isTaskRepeating(task.repeating)),
  [SortType.ARCHIVE]: (tasks) => tasks.filter((task) => task.isArchive)
};
