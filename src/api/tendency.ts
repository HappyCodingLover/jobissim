import {TTendency} from 'types';

import api from './api';

export const getTendencies = (query: string) => {
  return api.get<TTendency[]>(`/tendencies?search=${query}`);
};

export const getTendencyById = (id: number) => {
  return api.get<TTendency>(`/tendency/${id}`);
};

export const getTendencyRandom = () => {
  return api.get<TTendency[]>('/tendencies/random');
};
