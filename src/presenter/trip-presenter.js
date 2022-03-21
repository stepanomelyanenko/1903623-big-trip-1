import EventsListView from '../view/events-list-view';
import NoTripEventsView from '../view/no-trip-events-view';
import TripFiltersView from '../view/trip-filters-view';
import TripSortView from '../view/trip-sort-view';
import TripTabsView from '../view/trip-tabs-view';
import {render, RenderPosition} from '../utils/render';
import EventAddView from '../view/event-add-view';
import EventItemView from '../view/event-item-view';
import EventEditView from '../view/event-edit-view';

export default class TripPresenter {
  #pageBody = null;

  #tripControlsNavigationElement = null;
  #tripControlsFiltersElement = null;
  #tripEventsElement = null;

  #tripTabsComponent = new TripTabsView();
  #tripFiltersComponent = new TripFiltersView();
  #tripSortComponent = new TripSortView();
  #noTripEventsComponent = new NoTripEventsView();
  #tripEventsListElement = new EventsListView();

  #tripEvents = [];

  constructor(pageBody) {
    this.#pageBody = pageBody;

    this.#tripControlsNavigationElement = this.#pageBody.querySelector('.trip-controls__navigation');
    this.#tripControlsFiltersElement = this.#pageBody.querySelector('.trip-controls__filters');
    this.#tripEventsElement = this.#pageBody.querySelector('.trip-events');
  }

  init = (tripEvents) => {
    this.#tripEvents = [...tripEvents];
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this.#renderBoard();
  }

  #renderTabs = () => {
    render(this.#tripControlsNavigationElement, this.#tripTabsComponent, RenderPosition.BEFOREEND);
  }

  #renderFilters = () => {
    render(this.#tripControlsFiltersElement, this.#tripFiltersComponent, RenderPosition.BEFOREEND);
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
    for (let i = 0; i < this.#tripEvents[i].length; i++) {
      this.#renderTripEvent(this.#tripEventsListElement.element, this.#tripEvents[i]);
    }
  }

  #renderBoard = () => {
    this.#renderTabs();
    this.#renderFilters();

    if (this.#tripEvents.length === 0) {
      this.#renderNoTasks();
    } else {
      this.#renderSort();
      this.#renderTripEventsListElement();
      //render(tripEventsListElement.element, new EventAddView(tripEvents[0]), RenderPosition.BEFOREEND);
    }

    this.#renderTripEventsList();
  }
}

