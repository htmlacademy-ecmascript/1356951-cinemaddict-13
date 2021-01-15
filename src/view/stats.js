import Smart from "../view/smart.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import dayjs from "dayjs";
import {countWatchedFilmInDateRange, countTotalDurationWatchedFilm, getMostWatchedGenreFilm} from "../utils/stats.js";

const MINUTS_OF_HOUR = 60;

const renderGenreChart = (statisticCtx/* , films*/) => {
  // график по датам
  const BAR_HEIGHT = 50;
  // const statisticCtx = document.querySelector(`.statistic__chart`);
  // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
  statisticCtx.height = BAR_HEIGHT * 5;
  // const myChart =
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
      datasets: [{
        data: [11, 8, 7, 4, 3],
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

const createStatsTemplate = (data) => {
  const {films, dateFrom, dateTo} = data;
  // console.log(films, dateFrom, dateTo);
  const watchedFilmsCount = films.length !== 0 ?
    countWatchedFilmInDateRange(films, dateFrom, dateTo) :
    `0`;
  const totalDurationWatchedFilm = films.length !== 0 ?
    countTotalDurationWatchedFilm(films, dateFrom, dateTo) :
    `0`;
  const genresCountArray = getMostWatchedGenreFilm(films, dateFrom, dateTo);
  console.log(genresCountArray);
  const hoursDurationWatchedFilm = Math.trunc(+totalDurationWatchedFilm / MINUTS_OF_HOUR);
  const minutesDurationWatchedFilm = +totalDurationWatchedFilm % MINUTS_OF_HOUR;
  return (
    `<section class="statistic visually-hidden">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
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
          <p class="statistic__item-text">${genresCountArray[0][0]}</p>
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
    this._dateFrom = dayjs().subtract(45, `year`).toDate();
    this._dateTo = dayjs().toDate();
    // console.log(this._films);
    this._genreChart = null;
    // this._setChart();
    //  this._period =
    this._periodTypeChange = this._periodTypeChange.bind(this);
  }

  getTemplate() {
    this._data = {
      films: this._films.getFilms().slice(),
      dateFrom: this._dateFrom,
      dateTo: this._dateTo
    };
    return createStatsTemplate(this._data);
  }

  restoreHandlers() {
    this.updateChart();
  }

  setPeriodTypeChangeHandler() {
    //  console.log(this.getElement().querySelectorAll(`.statistic__filters-label`));
    // console.log(this._periodTypeChange);
    this.getElement().querySelectorAll(`.statistic__filters-label`).forEach((periodItem) => periodItem.addEventListener(`click`, this._periodTypeChange));
    // this.getElement().querySelector(`.statistic__filters`).addEventListener(`click`, this._periodTypeChange);
  }

  _periodTypeChange(evt) {
    evt.preventDefault();
    // вот тут вывод в консоль не выводится при нажатии на периоды
    // console.log(evt);

  }

  updateChart() {
    const statisticCtx = document.querySelector(`.statistic__chart`);
    this._setChart(statisticCtx);

  }

  _setChart(statisticCtx) {
    renderGenreChart(statisticCtx, this._films.getFilms());
  }
}


