import dayjs from "dayjs";
export const MAX_SENTENCE_OF_DESCRIPTION = 5;
export const MIN_SENTENCE_OF_DESCRIPTION = 1;
export const MAX_COMMENTS = 5;
export const MIN_COMMENTS = 0;
const DAYS_IN_WEEK = 7;
const MONTH_COUNT = 1;
const YEAR_COUNT = 1;
export const YEAR_COUNT_TOTAL = 45;

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
};

export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

export const UserActionMessage = {
  ADD_MESSAGE: `ADD_MESSAGE`,
  DELETE_MESSAGE: `DELETE_MESSAGE`
};

export const startFromDate = new Map();
startFromDate.set(`statistic-all-time`, dayjs().subtract(YEAR_COUNT_TOTAL, `year`).toDate());
startFromDate.set(`statistic-today`, dayjs().toDate());
startFromDate.set(`statistic-week`, dayjs().subtract(DAYS_IN_WEEK, `day`).toDate());
startFromDate.set(`statistic-month`, dayjs().subtract(MONTH_COUNT, `month`).toDate());
startFromDate.set(`statistic-year`, dayjs().subtract(YEAR_COUNT, `year`).toDate());

export const period = {
  ALL_TIME: `statistic-all-time`,
  TODAY: `statistic-today`,
  WEEK: `statistic-week`,
  MONTH: `statistic-month`,
  YEAR: `statistic-year`
};

export const AUTHORIZATOIN = `Basic oimtcs2fdgf`;
export const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict/`;
