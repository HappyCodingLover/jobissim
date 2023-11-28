import {TTheme} from 'types';

import api from './api';

export const createTheme = (params: FormData) => {
  return api.post('/theme/create', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getThemes = () => {
  return api.get<TTheme[]>('/themes');
};
