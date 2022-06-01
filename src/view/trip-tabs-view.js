import AbstractView from './abstract-view';
import {MenuItem} from '../utils/const';

const createTripTabsTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn" href="#" data-menu-item="${MenuItem.TABLE}">Table</a>
                <a class="trip-tabs__btn" href="#" data-menu-item="${MenuItem.STATS}">Stats</a>
              </nav>`
);

export default class TripTabsView extends AbstractView {
  get template() {
    return createTripTabsTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }
}

