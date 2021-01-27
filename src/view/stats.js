import Smart from "../view/smart.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import {getWatchedFilmInRangeDate, countTotalDurationWatchedFilm, getMostWatchedGenreFilm} from "../utils/stats.js";
import {startFromDate, period} from "../const.js";

const MINUTS_OF_HOUR = 60;

const renderGenreChart = (statisticCtx, genresCountArray) => {
  const genres = genresCountArray.map((genre) => {
    return genre[0];
  });
  const watchingCount = genresCountArray.map((genre) => {
    return genre[1];
  });
  const BAR_HEIGHT = 50;
  statisticCtx.height = BAR_HEIGHT * 8;
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: watchingCount,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatsTemplate = (films, genresCountArray, currentPeriod) => {
  const watchedFilmsCount = films !== `0` ?
    films.length :
    films;
  const totalDurationWatchedFilm = films !== `0` ?
    countTotalDurationWatchedFilm(films) :
    films;
  const topGenre = typeof genresCountArray === `object` && genresCountArray.length !== 0 ?
    genresCountArray[0][0] :
    `None`;
  const hoursDurationWatchedFilm = Math.trunc(+totalDurationWatchedFilm / MINUTS_OF_HOUR);
  const minutesDurationWatchedFilm = +totalDurationWatchedFilm % MINUTS_OF_HOUR;
  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time"
        ${currentPeriod === period.ALL_TIME ?
      `checked` :
      ``}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today"
        ${currentPeriod === period.TODAY ?
      `checked` :
      ``}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week"
        ${currentPeriod === period.WEEK ?
      `checked` :
      ``}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month"
        ${currentPeriod === period.MONTH ?
      `checked` :
      ``}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year"
        ${currentPeriod === period.YEAR ?
      `checked` :
      ``}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsCount}<span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hoursDurationWatchedFilm} <span class="statistic__item-description">h</span> ${minutesDurationWatchedFilm} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );

};

export default class Stats extends Smart {
  constructor(films) {
    super();
    this._films = films;
    this._data = {
      films: this._films,
      dateFrom: dayjs().subtract(45, `year`).toDate(),
      dateTo: dayjs().toDate()
    };
    this._currentPeriod = period.ALL_TIME;
    this._genreChart = null;
    this._periodTypeChange = this._periodTypeChange.bind(this);
  }

  getTemplate() {
    this._watchedFilmInRangeDate = this._data.films.getFilms().slice().length !== 0 ?
      getWatchedFilmInRangeDate(this._data) :
      `0`;
    this._genresCountArray = getMostWatchedGenreFilm(this._watchedFilmInRangeDate);
    return createStatsTemplate(this._watchedFilmInRangeDate, this._genresCountArray, this._currentPeriod);
  }

  restoreHandlers() {
    this.updateChart();
    this.setPeriodTypeChangeHandler();
  }

  setPeriodTypeChangeHandler() {
    this.getElement().querySelectorAll(`.statistic__filters-label`).forEach((periodItem) => periodItem.addEventListener(`click`, this._periodTypeChange));
  }

  _periodTypeChange(evt) {
    evt.preventDefault();
    this.getElement().querySelectorAll(`.statistic__filters-label`).forEach((periodItem) => periodItem.removeEventListener(`click`, this._periodTypeChange));
    this._currentPeriod = evt.target.htmlFor;
    this.updateData({
      dateFrom: startFromDate.get(evt.target.htmlFor)
    });
  }

  updateChart() {
    const statisticCtx = document.querySelector(`.statistic__chart`);
    this._setChart(statisticCtx);

  }

  _setChart(statisticCtx) {
    renderGenreChart(statisticCtx, this._genresCountArray);
  }
}


