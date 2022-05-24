import {FilterType} from './const';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => new Date(point.dateFrom) > new Date()),
  [FilterType.PAST]: (points) => points.filter((point) => new Date(point.dateTo) < new Date()),
};
