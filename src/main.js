import {render, RenderPosition} from './utils/render.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripPresenter from './presenter/trip-presenter';
import {generatePoint} from './mock/point';

const TRIP_POINTS_COUNT = 10;
const tripPoints = Array.from({length: TRIP_POINTS_COUNT}, generatePoint);
const pageMainElement = document.querySelector('.page-body');

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, new TripTabsView(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFiltersView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pageMainElement);
tripPresenter.init(tripPoints);

