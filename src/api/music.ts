import {TMusic} from 'types';

import api from './api';

export const createMusic = (params: FormData) => {
  return api.post('/music/create', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getMusics = () => {
  return api.get<TMusic[]>('/musics');
};
