import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const countWatchedFilmInDateRange = (fulms, dateFrom, dateTo) => {
  return fulms.reduce((counter, fulm) => {
    if (fulm.watchingDate === null) {
      return counter;
    }

    // С помощью day.js проверям, сколько задач с дедлайном
    // попадают в диапазон дат
    if (
      dayjs(fulm.watchingDate).isSame(dateFrom) ||
      dayjs(fulm.watchingDate).isBetween(dateFrom, dateTo) ||
      dayjs(fulm.watchingDate).isSame(dateTo)
    ) {
      return counter + 1;
    }

    return counter;
  }, 0);
};
