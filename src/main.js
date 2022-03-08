import {renderTemplate, renderElement, RenderPosition} from './render.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripSortView from './view/trip-sort-view.js';
import EventsListView from './view/events-list-view.js';
import EventItemAddView from './view/event-item-add-view.js';
import EventItemEditView from './view/event-item-edit-view';
import TripEventItemView, {createTripEventsItemTemplate} from './view/trip-event-item-view.js';
import {generateTripEvent} from './mock/trip-event';

const TRIP_EVENTS_COUNT = 15;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNT}, generateTripEvent);

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripEventsListElement = new EventsListView();

renderElement(tripEventsElement, tripEventsListElement.element, RenderPosition.BEFOREEND);
renderElement(tripControlsNavigationElement, new TripTabsView().element, RenderPosition.BEFOREEND);
renderElement(tripControlsFiltersElement, new TripFiltersView().element, RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new TripSortView().element, RenderPosition.AFTERBEGIN);
renderElement(tripEventsListElement.element, new EventItemAddView(tripEvents[1]).element, RenderPosition.BEFOREEND);
renderElement(tripEventsListElement.element, new EventItemEditView(tripEvents[0]).element, RenderPosition.BEFOREEND);


for (let i = 2; i < TRIP_EVENTS_COUNT; i++) {
  //renderTemplate(tripEventsListElement.element, createTripEventsItemTemplate(tripEvents[i]), RenderPosition.BEFOREEND);
  renderElement(tripEventsListElement.element, new TripEventItemView(tripEvents[i]).element, RenderPosition.BEFOREEND);
}

