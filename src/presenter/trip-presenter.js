import {render, RenderPosition} from '../utils/render';
import EventsListView from '../view/events-list-view';
import NoTripEventsView from '../view/no-trip-events-view';
import TripSortView from '../view/trip-sort-view';
import EventItemView from '../view/event-item-view';
import EventEditView from '../view/event-edit-view';

export default class TripPresenter {
  #mainElement = null;
  #tripEventsElement = null;

  #tripSortComponent = new TripSortView();
  #noTripEventsComponent = new NoTripEventsView();
  #tripEventsListElement = new EventsListView();

  #tripEvents = [];

  constructor(mainElement) {
    this.#mainElement = mainElement;

    this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
  }

  init = (tripEvents) => {
    this.#tripEvents = [...tripEvents];
    this.#renderMain();
  }

  #renderNoTasks = () => {
    render(this.#tripEventsElement, this.#noTripEventsComponent, RenderPosition.BEFOREEND);
  }

  #renderTripEventsListElement = () => {
    render(this.#tripEventsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
  }

  #renderSort = () => {
    render(this.#tripEventsElement, this.#tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripEvent = (tripEvent) => {
    const eventItemComponent = new EventItemView(tripEvent);
    const eventEditComponent = new EventEditView(tripEvent);

    const replaceItemToForm = () => {
      this.#tripEventsListElement.replaceChild(eventEditComponent.element, eventItemComponent.element);
    };
    const replaceFormToItem = () => {
      this.#tripEventsListElement.replaceChild(eventItemComponent.element, eventEditComponent.element);
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

    render(this.#tripEventsListElement, eventItemComponent, RenderPosition.BEFOREEND);
  };

  #renderTripEventsList = () => {
    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderTripEvent(this.#tripEvents[i]);
    }
  }

  #renderMain = () => {
    if (this.#tripEvents.length === 0) {
      this.#renderNoTasks();
    } else {
      this.#renderSort();
      this.#renderTripEventsListElement();
      this.#renderTripEventsList();
    }
  }
}

