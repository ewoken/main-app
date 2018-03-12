import { getLocation } from 'react-router-redux';
import queryString from 'qs';

// eslint-disable-next-line import/prefer-default-export
export function queryObjectSelector(state) {
  const location = getLocation(state);
  const query = location.search.substr(1);
  return queryString.parse(query);
}
