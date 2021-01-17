import dayjs from "dayjs";
// import {months} from "dayjs/locale/*";
export const MAX_SENTENCE_OF_DESCRIPTION = 5;
export const MIN_SENTENCE_OF_DESCRIPTION = 1;
export const MAX_COMMENTS = 5;
export const MIN_COMMENTS = 0;
export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const FilterType = {
  ALL: `all movies`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
  //  STAT: `stat`
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_MESSAGE: `ADD_MESSAGE`,
  DELETE_MESSAGE: `DELETE_MESSAGE`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const UserActionMessage = {
  // UPDATE_FILM: `UPDATE_FILM`,
  ADD_MESSAGE: `ADD_MESSAGE`,
  DELETE_MESSAGE: `DELETE_MESSAGE`
};

export const startFromDate = new Map();
startFromDate.set(`statistic-all-time`, dayjs().subtract(45, `year`).toDate());
startFromDate.set(`statistic-today`, dayjs().toDate());
startFromDate.set(`statistic-week`, dayjs().subtract(7, `day`).toDate());
startFromDate.set(`statistic-month`, dayjs().subtract(1, `month`).toDate());
startFromDate.set(`statistic-year`, dayjs().subtract(1, `year`).toDate());

export const period = {
  ALL_TIME: `statistic-all-time`,
  TODAY: `statistic-today`,
  WEEK: `statistic-week`,
  MONTH: `statistic-month`,
  YEAR: `statistic-year`
};

export const AUTHORIZATOIN = `Basic oimtcs2fdgf`;
export const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;
