import EventsListView from '../view/events-list-view';
import NoTripEventsView from '../view/no-trip-events-view';
import TripFiltersView from '../view/trip-filters-view';
import TripSortView from '../view/trip-sort-view';
import TripTabsView from '../view/trip-tabs-view';

export default class TripPresenter {
  #boardContainer = null;

  #tripTabsComponent = new TripTabsView();
  #tripFiltersComponent = new TripFiltersView();
  #tripSortComponent = new TripSortView();
  #noTripEventsComponent = new NoTripEventsView();
  #eventsListComponent = new EventsListView();

  #tripEvents = [];

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (tripEvents) => {
    this.#tripEvents = [...tripEvents];
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  #renderSort = () => {
    // Метод для рендеринга сортировки
  }

  #renderTripEvent = () => {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  #renderTripEvents = () => {
    // Метод для рендеринга N-задач за раз
  }

  #renderNoTasks = () => {
    // Метод для рендеринга заглушки
  }

  #renderFilters = () => {

  }

  #renderTabs = () => {

  }

  #renderBoard = () => {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}

