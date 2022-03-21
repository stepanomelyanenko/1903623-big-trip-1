import {render, RenderPosition} from '../utils/render';
import PointsListView from '../view/points-list-view';
import NoTripPointsView from '../view/no-trip-points-view';
import TripSortView from '../view/trip-sort-view';
import PointItemView from '../view/point-item-view';
import PointEditView from '../view/point-edit-view';

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

  #renderTripEvent = (tripPoint) => {
    const eventItemComponent = new PointItemView(tripPoint);
    const eventEditComponent = new PointEditView(tripPoint);

    const replaceItemToForm = () => {
      this.#tripPointsListElement.replaceChild(eventEditComponent.element, eventItemComponent.element);
    };
    const replaceFormToItem = () => {
      this.#tripPointsListElement.replaceChild(eventItemComponent.element, eventEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventItemComponent.setEditClickHandler(() => {
      replaceItemToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setRollupClickHandler(() => {
      replaceFormToItem();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setFormSubmit(() => {
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#tripPointsListElement, eventItemComponent, RenderPosition.BEFOREEND);
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

