export const createPointTypesMarkup = (offers, chosenPointType) => {

  const createTypeMarkup = (offer) => {
    const isChecked = offer.type === chosenPointType ? 'checked=""' : '';
    const label = offer.type.charAt(0).toUpperCase() + offer.type.slice(1);

    return `<div class="event__type-item">
                          <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${label}</label>
                        </div>`;
  };

  return offers.map(createTypeMarkup).join('');
};

export const createOffersSectionMarkup = (offersByTypes, pointType) => {
  const createOfferMarkup = (offer) => `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${pointType}-1" type="checkbox" name="event-offer-${pointType}">
                        <label class="event__offer-label" for="event-offer-name-1">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                      </div>`;

  let offersByCurrentType = [];

  for (let i = 0; i < offersByTypes.length; i++) {
    if (offersByTypes[i].type === pointType) {
      offersByCurrentType = offersByTypes[i].offers;
    }
  }
  const offersMarkup = offersByCurrentType.map(createOfferMarkup).join('');

  if (offersByCurrentType.length !== 0){
    return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${offersMarkup}</section>`;
  }
  return '';
};

