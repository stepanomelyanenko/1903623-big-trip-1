import dayjs from 'dayjs';
import {destinations} from '../mock/destinations';
import {offers} from '../mock/offers';
import AbstractView from './abstract-view';
import SmartView from './smart-view';
import {createPointTypesMarkup, createOffersSectionMarkup} from '../utils/forms';

const createPointEditTemplate = (point) => {

  const {base_price: price, date_from: ISOFrom, date_to: ISOTo, destination, type} = point;

  const DatetimeFrom = dayjs(ISOFrom).format('DD/MM/YY HH:mm ');
  const DatetimeTo = dayjs(ISOTo).format('DD/MM/YY HH:mm');

  const pointTypeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  const pointTypesMarkup = createPointTypesMarkup(offers(), type);
  const destinationOptions = destinations().map((x) => (`<option value="${x.name}"></option>`)).join('');

  const photosMarkup = destination.pictures.map((x) => (`<img className="event__photo" src="${x.src}" alt="${x.description}">`)).join('');

  //НАВЕЩШАТЬ ОБРАБОТЧИК
  const editedOffersMarkup = createOffersSectionMarkup(offers(), type);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointTypesMarkup}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${pointTypeLabel}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${destinationOptions}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time event__input-start-time" id="event-start-time-1" type="text" name="event-start-time" value="${DatetimeFrom}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time event__input-end-time" id="event-end-time-1" type="text" name="event-end-time" value="${DatetimeTo}">
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
                <section class="event__details">
                  ${editedOffersMarkup}
                  <section class="event__section  event__section--destination">
                    ${destination.description ? '<h3 class="event__section-title  event__section-title--destination">Destination</h3>': ''}
                    <p class="event__destination-description">${destination.description ? destination.description : ''}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosMarkup}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class PointEditView extends SmartView {

  constructor(point) {
    super();
    this._data = PointEditView.parsePointToData(point);

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
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeGroupClickHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input-start-time')
      .addEventListener('change', this.#startTimeChangeHandler);
    this.element.querySelector('.event__input-end-time')
      .addEventListener('change', this.#endTimeChangeHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#basePriceChangeHandler);
  }

  #typeGroupClickHandler = (evt) => {
    evt.preventDefault();
    
    this.updateData({
      type: evt.target.value
    }, false);
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination: this.#getChangedDestination(evt.target.value)
    }, false);
  }

  #startTimeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      date_from: evt.target.value //ИСПРАВИТЬ!!!!!!!!!!!!
    }, true);
    console.log(evt.target.value);
  }

  #endTimeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      date_to: evt.target.value //ИСПРАВИТЬ!!!!!!!!!!!!
    }, true);
    console.log(evt.target.value);
  }

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      base_price: evt.target.value
    }, true);
    console.log(evt.target.value);
  }

  //тут все хорошо
  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
    this._callback.formSubmit(this._data);
  }

  static parsePointToData = (task) => ({...task,
    // isDueDate: task.dueDate !== null,
    // isRepeating: isTaskRepeating(task.repeating),
  });

  //тут вспомогательные штуки
  #getChangedDestination = (destinationName) => {
    const allDestinations = destinations();

    for (let i = 0; i < allDestinations.length; i++) {
      if (allDestinations[i].name === destinationName) {
        return allDestinations[i];
      }
    }

    return {
      'description': null,
      'name': '',
      'pictures': []
    };
  };
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

