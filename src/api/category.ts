import {TCategory, TSubCategory} from 'types';

import api from './api';

export const getCategories = () => {
  return api.get<TCategory[]>('/categories?pagination=false');
};

export const getSubCategories = () => {
  return api.get<TSubCategory[]>('/subCategories');
};

export const getSubCategoryByIdentifier = (identifier: string | number) => {
  return api.get<TSubCategory>(`/subCategory/${identifier}`);
};
