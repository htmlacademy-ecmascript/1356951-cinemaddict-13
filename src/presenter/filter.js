// import FilterView from "../view/sort.js";
import FilterView from "../view/menu.js";
import {render, RenderPosition, replace, remove} from "../utils.js";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType} from "../const.js";

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent._setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: SortType.ALL,
        name: `All movies`,
        count: filter[SortType.ALL](films).length
      },
      {
        type: SortType.WATCHLIST,
        name: `Watchlist`,
        count: filter[SortType.WATCHLIST](films).length
      },
      {
        type: SortType.HISTORY,
        name: `History`,
        count: filter[SortType.HISTORY](films).length
      },
      {
        type: SortType.FAVORITES,
        name: `Favorites`,
        count: filter[SortType.FAVORITES](films).length
      }
    ];
  }
}
