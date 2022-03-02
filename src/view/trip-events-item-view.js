import dayjs from 'dayjs';

export const createTripEventsItemTemplate = (tripEvent) => {

  const {eventType, location, cost, startDate, endDate, duration, offers, isFavorite} = tripEvent;
  const startDay = dayjs(startDate).format('MMM D');
  const startDatetime = dayjs(startDate).format('YYYY-MM-DD');
  const startTime = dayjs(startDate).format('HH:MM');
  const startDatetimeFull = dayjs(startDate).format('YYYY-MM-DDTHH:MM');
  const endTime = dayjs(endDate).format('HH:MM');
  const endDatetimeFull = dayjs(endDate).format('YYYY-MM-DDTHH:MM');

  const translateOfferToHTML = (offer) => {
    if (offer.isChosen) {
      const offerName = offer.name;
      const offerCost = offer.cost;
      return `<li class="event__offer">
                    <span class="event__offer-title">${offerName}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offerCost}</span>
                  </li>`;
    }
  };

  const offersHTML = offers.map(translateOfferToHTML).join('');
  const isFavoriteClass = isFavorite ? ' event__favorite-btn--active' : '';

  const buildDurationString = (interval) => {
    const resultString = interval.days.toString() + interval.hours.toString() + interval.minutes.toString();
    return resultString;
  };
  const durationString = buildDurationString(duration);

  return `<li class="trip-events__item">
              <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${startDatetime}">${startDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${eventType} ${location}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startDatetimeFull}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endDatetimeFull}">${endTime}</time>
                  </p>
                  <p class="event__duration">${durationString}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${cost}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">${offersHTML}</ul>
                <button class="event__favorite-btn${isFavoriteClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};
