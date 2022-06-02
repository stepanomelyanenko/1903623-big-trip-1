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
  const diffDays = parseInt(String((countTypesInMs) / 86400000), 10);
  let diffHours = parseInt(String((countTypesInMs) / 3600000), 10);
  const diffMinutes = parseInt(String((countTypesInMs) / 60000), 10) - diffHours * 60;
  let timeSpend = '';

  if (diffDays > 0) {
    diffHours = diffHours - diffDays * 24;
  }

  const spentDays = `${diffDays.toString().padStart(2,'0')}D`;
  const spentHours = `${diffHours.toString().padStart(2,'0')}H`;
  const spentMinutes = `${diffMinutes.toString().padStart(2,'0')}M`;

  if (diffDays === 0 && diffHours === 0) {
    timeSpend = `${spentDays}`;
  } else if (diffDays === 0) {
    timeSpend = `${spentHours} ${spentMinutes}`;
  } else {
    timeSpend = `${spentDays} ${spentHours} ${spentMinutes}`;
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

