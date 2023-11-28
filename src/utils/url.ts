import queryString from 'query-string';
import {applySpec, evolve, pipe, propOr, propSatisfies} from 'ramda';

const cleanUrlString = (state: string) => state.replace('#!', '');

export const getCodeAndStateFromUrl = pipe(
  queryString.extract,
  queryString.parse,
  evolve({state: cleanUrlString}),
);

export const getErrorFromUrl = pipe(
  queryString.extract,
  queryString.parse,
  evolve({error_description: cleanUrlString}),
);

export const isErrorUrl = pipe(
  queryString.extract,
  queryString.parse,
  propSatisfies((error: any) => typeof error !== 'undefined', 'error'),
);

export const transformError = applySpec<{type: string; text1: string}>({
  text1: propOr('', 'error_description'),
  type: propOr('', 'error'),
});
