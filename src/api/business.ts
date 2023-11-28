import {TBBusiness, TSubBusiness} from 'types';

import api from './api';

export const getBusinessById = (id: number) => {
  return api.get<TBBusiness>(`/business/${id}`);
};

export const getBusinessRandom = () => {
  return api.get<TSubBusiness[]>('/businesses/random');
};
