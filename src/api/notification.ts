import {TBNotification} from 'types';

import api from './api';

type TGetNotificationParams = {
  page?: number;
};

type TGetUnreadNotificationCountResponse = {
  count: number;
};

export const getNotifications = (params: TGetNotificationParams) => {
  return api.get<TBNotification[]>(
    `/getUserNotifications?page=${params?.page || 1}`,
  );
};

export const getUnreadNotificationCount = () => {
  return api.get<TGetUnreadNotificationCountResponse>('countNotif');
};
