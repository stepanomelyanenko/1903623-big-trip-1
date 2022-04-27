import dayjs from 'dayjs';

export const sortTaskByDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export const sortTaskByDuration = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  if (durationPointB - durationPointA !== 0) {
    return durationPointB - durationPointA;
  } else {
    return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
  }
};

export const sortTaskByPrice = (pointA, pointB) => {
  if (pointB.basePrice - pointA.basePrice !== 0) {
    return pointB.basePrice - pointA.basePrice;
  } else {
    return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
  }
};

