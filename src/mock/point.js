import dayjs from 'dayjs';
import {offers} from './offers';
import {destinations} from './destinations';
import {nanoid} from 'nanoid';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePrice = () => getRandomInteger(1, 100) * 10;

const generateFromToDates = () => {
  const maxGap = 14;
  const fromDate = dayjs()
    .add(getRandomInteger(-maxGap, maxGap), 'day')
    .add(getRandomInteger(-maxGap, maxGap), 'hour')
    .add(getRandomInteger(-maxGap, maxGap), 'minute');
  const toDate = fromDate
    .clone()
    .add(getRandomInteger(0, 14), 'day')
    .add(getRandomInteger(0, 59), 'hour')
    .add(getRandomInteger(0, 59), 'minute');
  return {
    from: fromDate.toISOString(),
    to: toDate.toISOString()
  };
};

// const countDuration = (start, end) => {
//   const interval = new Date(end - start);
//
//   return {
//     days: interval.getUTCDate() - 1,
//     hours: interval.getUTCHours(),
//     minutes: interval.getUTCMinutes(),
//   };
// };

export const generatePoint = () => {
  const dates = generateFromToDates();
  const destinationArray = destinations();

  // return {
  //   id: nanoid(),
  //   pointType: generatePointType(),
  //   location: generateLocation(),
  //   startDate: dates.start,
  //   endDate: dates.end,
  //   duration: countDuration(dates.start, dates.end),
  //   description: generateDescription(),
  //   photos: generatePhotos(),
  //   price: generatePrice(),
  //   offers: generateOffers(),
  //   isFavorite: Boolean(getRandomInteger(0,1)),
  //   isBeingEdited: false
  // };

  return {
    'base_price': generatePrice(),
    'date_from': dates.from,
    'date_to': dates.to,
    'destination': destinationArray[getRandomInteger(0,destinationArray.length-1)],
    'id': nanoid(),
    'is_favorite': Boolean(getRandomInteger(0,1)),
    'offers': offers(),
    'type': 'bus'
  };
};

