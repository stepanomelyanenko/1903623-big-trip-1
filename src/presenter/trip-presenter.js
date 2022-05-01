import {render, RenderPosition, remove} from '../utils/render.js';
import PointsListView from '../view/points-list-view.js';
import NoTripPointsView from '../view/no-trip-points-view.js';
import TripSortView from '../view/trip-sort-view.js';
import PointPresenter from './point-presenter.js';
import {SortType, UpdateType, UserAction} from '../utils/const.js';
import {sortTaskByDay, sortTaskByDuration, sortTaskByPrice} from '../utils/point-sort.js';

export default class TripPresenter {
  #mainElement = null;
  #tripPointsElement = null;

  #pointsModel = null;

  #noTripPointsComponent = new NoTripPointsView();
  #tripPointsListElement = new PointsListView();
  #sortComponent = null;

  #pointPresenter = new Map();

  #currentSortType = SortType.SORT_DAY;

  constructor(mainElement, pointsModel) {
    this.#mainElement = mainElement;
    this.#tripPointsElement = this.#mainElement.querySelector('.trip-events');

    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.SORT_DAY:
        return [...this.#pointsModel.points].sort(sortTaskByDay);
      case SortType.SORT_TIME:
        return [...this.#pointsModel.points].sort(sortTaskByDuration);
      case SortType.SORT_PRICE:
        return [...this.#pointsModel.points].sort(sortTaskByPrice);
    }
    return this.#pointsModel.points;
  }

  init = () => {
    this.#renderMain();
  }

  #renderNoTasks = () => {
    render(this.#tripPointsElement, this.#noTripPointsComponent, RenderPosition.BEFOREEND);
  }

  #renderTripPointsListElement = () => {
    render(this.#tripPointsElement, this.#tripPointsListElement, RenderPosition.BEFOREEND);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMain();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        this.#clearMain({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderMain();
        break;
    }
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderTripPointsList(this.points);
    this.#clearMain({resetRenderedTaskCount: true});
    this.#renderMain();
  }

  #renderSort = () => {
    this.#sortComponent = new TripSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripPointsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripPointsListElement, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderTripPointsList = (points) => {
    points.forEach((point) => this.#renderTripPoint(point));
  }

  #clearMain = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noTripPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.SORT_DAY;
    }
  }

  #renderMain = () => {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoTasks();
      return;
    }

    this.#renderSort();
    this.#renderTripPointsListElement();
    this.#renderTripPointsList(points);
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}

