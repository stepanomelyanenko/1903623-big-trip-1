export const createOffersSectionMarkup = (editedOffers) => {
  const createOfferMarkup = (offer) => {
    const offerName = offer.name;
    const offerPrice = offer.price;
    const offerType = offer.type;

    return `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerType}-1" type="checkbox" name="event-offer-${offerType}" >
                        <label class="event__offer-label" for="event-offer-name-1">
                          <span class="event__offer-title">${offerName}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offerPrice}</span>
                        </label>
                      </div>`;
  };
  const offersMarkup = editedOffers.map(createOfferMarkup).join('');

  if (editedOffers.length !== 0){
    return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${offersMarkup}</section>`;
  }
  return '';
};

export const createEventTypesMarkup = (types, chosenEventType) => {
  const createTypeMarkup = (type) => {
    const isChecked = type === chosenEventType ? 'checked=""' : '';
    const label = type.charAt(0).toUpperCase() + type.slice(1);

    return `<div class="event__type-item">
                          <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${label}</label>
                        </div>`;
  };

  return types.map(createTypeMarkup).join('');
};

