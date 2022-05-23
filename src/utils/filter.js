import {FilterType} from '../const';

export const filter = {
  [FilterType.EVERYTHING]: (point) => point.filter(true),
  [FilterType.FUTURE]: (tasks) => tasks.filter((point) => new Date(point.dateFrom) > new Date()),
  [FilterType.PAST]: (tasks) => tasks.filter((point) => new Date(point.dateTo) > new Date()),
};
