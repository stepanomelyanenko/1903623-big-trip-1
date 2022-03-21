import AbstractView from './abstract-view';

const createNoTripPointsTemplate = () => (
  `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`
);

export default class NoTripPointsView extends AbstractView {
  get template() {
    return createNoTripPointsTemplate();
  }
}

