export const createPointTypesMarkup = (offers, chosenPointType) => {

  const createTypeMarkup = (offer) => {
    const isChecked = offer.type === chosenPointType ? 'checked=""' : '';
    const label = offer.type.charAt(0).toUpperCase() + offer.type.slice(1);

    return `<div class="event__type-item">
                          <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden"
                          type="radio" name="event-type" value="${offer.type}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${offer.type}"
                          for="event-type-${offer.type}-1">${label}</label>
                        </div>`;
  };

  return offers.map(createTypeMarkup).join('');
};

