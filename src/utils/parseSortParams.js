import { SORT_ORDER } from '../constants/contacts.js';

function parseSortBy(value) {
  const isString = typeof value === 'string';

  if (isString !== true) {
    return '_id';
  }

  const keysOfContacts = ['name'];

  if (!keysOfContacts.includes(value)) {
    return '_id';
  }

  return value;
}

function parseOrderBy(value) {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(value);

  if (!isKnownOrder) {
    return SORT_ORDER.ASC;
  }

  return value;
}

export function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedOrderBy = parseOrderBy(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedOrderBy,
  };
}
