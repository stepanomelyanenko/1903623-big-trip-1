import {render, RenderPosition} from './utils/render.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import {generatePoint} from './mock/point.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model';

const TRIP_POINTS_COUNT = 10;

const tripPoints = Array.from({length: TRIP_POINTS_COUNT}, generatePoint);
const pageMainElement = document.querySelector('.page-body');

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
pointsModel.points = tripPoints;

const filterModel = new FilterModel();

render(tripControlsNavigationElement, new TripTabsView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pageMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFiltersElement, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

