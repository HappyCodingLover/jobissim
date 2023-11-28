import {
  TBPredictSearchUser,
  TPredictSearchBusiness,
  TPredictSearchVideo,
} from 'types';

import api from './api';

export const getAutoComplete = (value: string) => {
  return api.get<
    [
      {[key: string]: TBPredictSearchUser},
      {[key: string]: TPredictSearchVideo},
      {[key: string]: TPredictSearchVideo},
      {[key: string]: TPredictSearchBusiness},
    ]
  >(`/autocomplete/${value}`);
};
