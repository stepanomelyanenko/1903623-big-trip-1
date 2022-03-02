import {renderTemplate, RenderPosition} from './render.js';
import {createTripTabsTemplate} from './view/trip-tabs-view.js';
import {createTripFiltersTemplate} from './view/trip-filters-view.js';
import {createTripSortTemplate} from './view/trip-sort-view.js';
import {createEventEditItemTemplate} from './view/event-edit-item-view.js';
import {createTripEventsItemTemplate} from './view/trip-events-item-view.js';
import {createEventsListTemplate} from './view/events-list-view.js';
import {generateTripEvent} from './mock/trip-event';

const TRIP_EVENTS_COUNT = 15;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNT}, generateTripEvent);


const TripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const TripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const TripEventsElement = document.querySelector('.trip-events');

renderTemplate(TripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);

const TripEventsListElement = TripEventsElement.querySelector('.trip-events__list');

renderTemplate(TripControlsNavigationElement, createTripTabsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripControlsFiltersElement, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsElement, createTripSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(TripEventsListElement, createEventEditItemTemplate(), RenderPosition.BEFOREEND);
for (let i = 0; i < TRIP_EVENTS_COUNT; i++) {
  renderTemplate(TripEventsListElement, createTripEventsItemTemplate(tripEvents[i]), RenderPosition.BEFOREEND);
}
