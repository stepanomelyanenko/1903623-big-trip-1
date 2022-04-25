import dayjs from 'dayjs';

export const sortTaskByDay = (pointA, pointB) => dayjs(pointA.date_from).diff(dayjs(pointB.date_from));

export const sortTaskByDuration = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.date_to).diff(dayjs(pointA.date_from));
  const durationPointB = dayjs(pointB.date_to).diff(dayjs(pointB.date_from));

  if (durationPointB - durationPointA !== 0) {
    return durationPointB - durationPointA;
  } else {
    return dayjs(pointA.date_from).diff(dayjs(pointB.date_from));
  }
};

export const sortTaskByPrice = (pointA, pointB) => {
  if (pointB.base_price - pointA.base_price !== 0) {
    return pointB.base_price - pointA.base_price;
  } else {
    return dayjs(pointA.date_from).diff(dayjs(pointB.date_from));
  }
};

