import TripTabsView from './view/trip-tabs-view.js';
import {render, RenderPosition} from './utils/render.js';
import {generatePoint} from './mock/point.js';
import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model';
//import {MenuItem} from './utils/const';

const TRIP_POINTS_COUNT = 10;

const points = Array.from({length: TRIP_POINTS_COUNT}, generatePoint);

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const pageMainElement = document.querySelector('.page-body');
const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, new TripTabsView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pageMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFiltersElement, filterModel, pointsModel);

// const handleSiteMenuClick = (menuItem) => {
//   switch (menuItem) {
//     case MenuItem.ADD_NEW_EVENT:
//       // Скрыть статистику
//       // Показать фильтры
//       // Показать доску
//       // Показать форму добавления новой задачи
//       // Убрать выделение с ADD NEW TASK после сохранения
//       break;
//     case MenuItem.TABLE:
//       // Показать фильтры
//       // Показать доску
//       // Скрыть статистику
//       break;
//     case MenuItem.STATS:
//       // Скрыть фильтры
//       // Скрыть доску
//       // Показать статистику
//       break;
//   }
// };

filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

