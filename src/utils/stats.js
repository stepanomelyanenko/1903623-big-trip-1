import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const TYPES = ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'DRIVE', 'FLIGHT', 'CHECK-IN', 'SIGHTSEEING', 'RESTAURANT'];

const countPricesByType = (points, types) => {
  const pricesByTypes = {
    'TAXI': 0,
    'BUS': 0,
    'TRAIN': 0,
    'SHIP': 0,
    'DRIVE': 0,
    'FLIGHT': 0,
    'CHECK-IN': 0,
    'SIGHTSEEING': 0,
    'RESTAURANT': 0,
  };
  for (const type of types) {
    points.map((trip) => {
      if (trip.type.toUpperCase() === type) {
        pricesByTypes[type] += trip.basePrice;
      }
    });
  }
  return pricesByTypes;
};

const countTypes = (points, types) => {
  const countTypesNumber = {
    'TAXI': 0,
    'BUS': 0,
    'TRAIN': 0,
    'SHIP': 0,
    'DRIVE': 0,
    'FLIGHT': 0,
    'CHECK-IN': 0,
    'SIGHTSEEING': 0,
    'RESTAURANT': 0,
  };
  for (const type of types) {
    points.map((trip) => {
      if (trip.type.toUpperCase() === type) {
        countTypesNumber[type] += 1;
      }
    });
  }
  return countTypesNumber;
};

const countTimeSpend = (countTypesInMs) => {
  let differenceInDays = parseInt((countTypesInMs) / 86400000, 10);
  let differenceInHours = parseInt((countTypesInMs) / 3600000, 10);
  let differenceInMinutes = parseInt((countTypesInMs) / 60000, 10) - differenceInHours * 60;
  let timeSpend = '';

  if (differenceInDays > 0) {
    differenceInHours = differenceInHours - differenceInDays * 24;
  }

  if (differenceInDays === 0 && differenceInHours === 0) {
    differenceInDays.toString().length === 1 ? differenceInDays = `0${differenceInDays}` : '';
    differenceInHours.toString().length === 1 ? differenceInHours = `0${differenceInHours}` : '';
    differenceInMinutes.toString().length === 1 ? differenceInMinutes = `0${differenceInMinutes}` : '';
    timeSpend = `${differenceInMinutes}M`;
  } else if (differenceInDays === 0) {
    differenceInDays.toString().length === 1 ? differenceInDays = `0${differenceInDays}` : '';
    differenceInHours.toString().length === 1 ? differenceInHours = `0${differenceInHours}` : '';
    differenceInMinutes.toString().length === 1 ? differenceInMinutes = `0${differenceInMinutes}` : '';
    timeSpend = `${differenceInHours}H ${differenceInMinutes}M`;
  } else {
    differenceInDays.toString().length === 1 ? differenceInDays = `0${differenceInDays}` : '';
    differenceInHours.toString().length === 1 ? differenceInHours = `0${differenceInHours}` : '';
    differenceInMinutes.toString().length === 1 ? differenceInMinutes = `0${differenceInMinutes}` : '';
    timeSpend = `${differenceInDays}D ${differenceInHours}H ${differenceInMinutes}M`;
  }
  return timeSpend;
};

const countTimeSpendInMs = (trips, types) => {
  const countTypesInMs = {
    'TAXI': 0,
    'BUS': 0,
    'TRAIN': 0,
    'SHIP': 0,
    'DRIVE': 0,
    'FLIGHT': 0,
    'CHECK-IN': 0,
    'SIGHTSEEING': 0,
    'RESTAURANT': 0,
  };
  for (const type of types) {
    trips.map((trip) => {
      if (trip.type.toUpperCase() === type) {
        countTypesInMs[type] += dayjs(trip.dateTo).diff(dayjs(trip.dateFrom));
      }
    });
  }
  return countTypesInMs;
};

export {countPricesByType, countTypes, countTimeSpend, countTimeSpendInMs, TYPES};
