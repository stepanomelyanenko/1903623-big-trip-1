import {createElement} from '../render.js';

const createNoTripEventsTemplate = () => (
  `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`
);

export default class NoTripEventsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoTripEventsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
