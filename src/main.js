import {render, RenderPosition} from './utils/render.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import {generateTripEvent} from './mock/trip-event';
import TripPresenter from './presenter/trip-presenter';

const TRIP_EVENTS_COUNT = 10;
const tripEvents = Array.from({length: TRIP_EVENTS_COUNT}, generateTripEvent);
const pageMainElement = document.querySelector('.page-body');

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, new TripTabsView(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFiltersView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pageMainElement);
tripPresenter.init(tripEvents);
