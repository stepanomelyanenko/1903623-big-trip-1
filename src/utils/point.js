import dayjs from 'dayjs';

export const sortTaskByDay = (pointA, pointB) => dayjs(pointA.startDate).diff(dayjs(pointB.startDate));

export const sortTaskByDuration = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.endDate).diff(dayjs(pointA.startDate));
  const durationPointB = dayjs(pointB.endDate).diff(dayjs(pointB.startDate));

  if (durationPointB - durationPointA !== 0) {
    return durationPointB - durationPointA;
  } else {
    return dayjs(pointA.startDate).diff(dayjs(pointB.startDate));
  }
};

export const sortTaskByPrice = (pointA, pointB) => {
  if (pointB.price - pointA.price !== 0) {
    return pointB.price - pointA.price;
  } else {
    return dayjs(pointA.startDate).diff(dayjs(pointB.startDate));
  }
};

