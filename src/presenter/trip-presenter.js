import {render, RenderPosition} from '../utils/render';
import PointsListView from '../view/points-list-view';
import NoTripPointsView from '../view/no-trip-points-view';
import TripSortView from '../view/trip-sort-view';
import PointPresenter from './point-presenter';
import {SortType} from '../utils/const';
import {sortTaskByDay, sortTaskByDuration, sortTaskByPrice} from '../utils/point-sort';

export default class TripPresenter {
  #mainElement = null;
  #tripPointsElement = null;

  #pointsModel = null;

  #tripSortComponent = new TripSortView();
  #noTripPointsComponent = new NoTripPointsView();
  #tripPointsListElement = new PointsListView();

  #pointPresenter = new Map();

  #currentSortType = SortType.SORT_DAY;

  constructor(mainElement, pointsModel) {
    this.#mainElement = mainElement;
    this.#tripPointsElement = this.#mainElement.querySelector('.trip-events');

    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get tasks() {
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

  // #handlePointChange = (updatedPoint) => {
  //   // Здесь будем вызывать обновление модели
  //   this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  // }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderTripPointsList();
  }

  #renderSort = () => {
    render(this.#tripPointsElement, this.#tripSortComponent, RenderPosition.AFTERBEGIN);
    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderTripPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripPointsListElement, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderTripPointsList = (points) => {
    points.forEach((point) => this.#renderTripPoint(point));
  }

  #renderMain = () => {
    if (this.tasks.length === 0) {
      this.#renderNoTasks();
    } else {
      this.#renderSort();
      this.#renderTripPointsListElement();
      this.#renderTripPointsList();
    }
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}

