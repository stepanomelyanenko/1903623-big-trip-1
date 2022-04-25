import dayjs from 'dayjs';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offers';
import AbstractView from './abstract-view';
import SmartView from './smart-view';
import {createEventTypesMarkup, createOffersSectionMarkup} from '../utils/forms';

const createPointEditTemplate = (tripPoint) => {
  const {pointType, price, location, startDate, endDate, offers, description, photos} = tripPoint;

  const startDatetime = dayjs(startDate).format('DD/MM/YY HH:mm ');
  const endDatetime = dayjs(endDate).format('DD/MM/YY HH:mm');

  const photosList = photos.map((x) => (`<img className="event__photo" src="${x}">`)).join('');

  const locationOptions = destinations().map((x) => (`<option value="${x}"></option>`)).join('');

  const pointTypeLabel = pointType.charAt(0).toUpperCase() + pointType.slice(1);

  const editedOffersMarkup = createOffersSectionMarkup(offers);

  const eventTypesMarkup = createEventTypesMarkup(offers(), pointType);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypesMarkup}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointTypeLabel}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${location}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${locationOptions}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDatetime}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDatetime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">${editedOffersMarkup}<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosList}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class PointEditView extends AbstractView {
  #tripPoint = null;

  constructor(tripPoint) {
    super();
    this.#tripPoint = tripPoint;
  }

  get template() {
    return createPointEditTemplate(this.#tripPoint);
  }


  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
    this._callback.formSubmit(this.#tripPoint);
  }

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  }
}

export class TaskEditView extends SmartView {
  constructor(tripPoint) {
    super();
    this._data = TaskEditView.parseTaskToData(tripPoint);

    this.#setInnerHandlers();
  }

  get template() {
    return createPointEditTemplate(this._data);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setRollupClickHandler(this._callback.rollupClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  #setInnerHandlers = () => {

    //Слушатель для предложений.

    const offers = this.element.querySelectorAll('.event__offer-selector');
    for (let i = 0; i < offers.length; i++) {
      offers[i].addEventListener('click', this.#offerToggleHandler);
    }


    this.element.querySelector('.card__date-deadline-toggle')
      .addEventListener('click', this.#dueDateToggleHandler);
    this.element.querySelector('.card__repeat-toggle')
      .addEventListener('click', this.#repeatingToggleHandler);
    this.element.querySelector('.card__text')
      .addEventListener('input', this.#descriptionInputHandler);

    if (this._data.isRepeating) {
      this.element.querySelector('.card__repeat-days-inner')
        .addEventListener('change', this.#repeatingChangeHandler);
    }

    this.element.querySelector('.card__colors-wrap')
      .addEventListener('change', this.#colorChangeHandler);

    this.element.querySelector('.card__date-deadline-toggle')
      .addEventListener('click', this.#dueDateToggleHandler);
  }

  #offerToggleHandler = (evt) => {
    evt.target.classList.contains('');

  }


  #dueDateToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      isDueDate: !this._data.isDueDate,
      // Логика следующая: если выбор даты нужно показать,
      // то есть когда "!this._data.isDueDate === true",
      // тогда isRepeating должно быть строго false.
      isRepeating: !this._data.isDueDate ? false : this._data.isRepeating,
    });
  }

  #repeatingToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      isRepeating: !this._data.isRepeating,
      // Аналогично, но наоборот, для повторения
      isDueDate: !this._data.isRepeating ? false : this._data.isDueDate,
    });
  }

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      description: evt.target.value,
    }, true);
  }

  #repeatingChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      repeating: {...this._data.repeating, [evt.target.value]: evt.target.checked},
    });
  }

  #colorChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      color: evt.target.value,
    });
  }


  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(TaskEditView.parseDataToTask(this._data));
  }

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  //WHAT IS IT

  static parseTaskToData = (task) => ({...task,
    isDueDate: task.dueDate !== null,
    isRepeating: isTaskRepeating(task.repeating),
  });

  static parseDataToTask = (data) => {
    const task = {...data};

    if (!task.isDueDate) {
      task.dueDate = null;
    }

    if (!task.isRepeating) {
      task.repeating = {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      };
    }

    delete task.isDueDate;
    delete task.isRepeating;

    return task;
  }
}

