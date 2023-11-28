import {TBUser} from 'types';

import api from './api';

export const blockThisUser = (params: FormData) => {
  return api.post('/blockThisUser', params, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const getBlockUsers = () => {
  return api.get<TBUser[]>('/getBlockedUserList');
};

export const getUserById = (id: number) => {
  return api.get<TBUser>(`user/${id}`);
};

export const unblockUser = (params: FormData) => {
  return api.post('/unBlockThisUser', params, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};
