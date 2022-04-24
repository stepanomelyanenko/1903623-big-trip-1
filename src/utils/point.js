import dayjs from 'dayjs';

export const sortTaskByDay = (taskA, taskB) => dayjs(taskA.startDate).diff(dayjs(taskB.startDate));

export const sortTaskByDuration = (taskA, taskB) => {
  const durationPointA = dayjs(taskA.endDate).diff(dayjs(taskA.startDate));
  const durationPointB = dayjs(taskB.endDate).diff(dayjs(taskB.startDate));

  if (durationPointB - durationPointA !== 0) {
    return durationPointB - durationPointA;
  } else {
    return dayjs(taskA.startDate).diff(dayjs(taskB.startDate));
  }
};

export const sortTaskByPrice = (taskA, taskB) => {
  if (taskB.price - taskA.price !== 0) {
    return taskB.price - taskA.price;
  } else {
    return dayjs(taskA.startDate).diff(dayjs(taskB.startDate));
  }
};

