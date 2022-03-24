import {render, RenderPosition} from '../utils/render';
import PointsListView from '../view/points-list-view';
import NoTripPointsView from '../view/no-trip-points-view';
import TripSortView from '../view/trip-sort-view';
import PointPresenter from './point-presenter';

export default class TripPresenter {
  #mainElement = null;
  #tripPointsElement = null;

  #tripSortComponent = new TripSortView();
  #noTripPointsComponent = new NoTripPointsView();
  #tripPointsListElement = new PointsListView();

  #tripPoints = [];

  constructor(mainElement) {
    this.#mainElement = mainElement;

    this.#tripPointsElement = this.#mainElement.querySelector('.trip-events');
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];
    this.#renderMain();
  }

  #renderNoTasks = () => {
    render(this.#tripPointsElement, this.#noTripPointsComponent, RenderPosition.BEFOREEND);
  }

  #renderTripPointsListElement = () => {
    render(this.#tripPointsElement, this.#tripPointsListElement, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(this.#tripPointsElement, this.#tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripEvent = (point) => {
    const pointPresenter = new PointPresenter(this.#tripPointsListElement);
    pointPresenter.init(point);
  };

  #renderTripPointsList = () => {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripEvent(this.#tripPoints[i]);
    }
  }

  #renderMain = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoTasks();
    } else {
      this.#renderSort();
      this.#renderTripPointsListElement();
      this.#renderTripPointsList();
    }
  }
}

