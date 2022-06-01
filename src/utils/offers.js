export const getChangedByTypeOffers = (allOffers, currentType) => {
  let offersByType = {};

  for (let i = 0; i < allOffers.length; i++) {
    if (allOffers[i].type === currentType) {
      offersByType = allOffers[i];
    }
  }

  for (let i = 0; i < offersByType.offers.length; i++) {
    offersByType.offers[i].isChosen = false;
  }

  return offersByType.offers;
};

export const createOffersSectionMarkup = (offers, pointType) => {
  const createOfferMarkup = (offer) => `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${pointType}-1"
                        type="checkbox" name="event-offer-${pointType}" ${offer.isChosen ? 'checked' : ''}
                        value="${offer.title}">
                        <label class="event__offer-label" for="event-offer-name-1" data-title="${offer.title}">
                          <span class="event__offer-title" data-title="${offer.title}">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price" data-title="${offer.title}">${offer.price}</span>
                        </label>
                      </div>`;

  //const offersByCurrentType = getChangedByTypeOffers(allOffers, pointType);
  const offersMarkup = offers.map(createOfferMarkup).join('');

  if (offers.length !== 0){
    return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${offersMarkup}</section>`;
  }

  return '';
};

export const changeCheckedOffers = (offers, checkedOffer) => {
  const changedOffers = offers.map((offer) => ({
    'id': offer.id,
    'title': offer.title,
    'price': offer.price,
    'isChosen': offer.title === checkedOffer ? !offer.isChosen : offer.isChosen
  }));

  //console.log(changedOffers);
  return changedOffers;
};
