import {TBMessage, TBMessageByUser} from 'types';

import api from './api';

type TConnectMessageResponse = {
  id: number;
};

type TFindMessageResponse = {
  id: number;
};

type TGetMessagesByIdParams = {
  id: number;
  page: number;
};

export const connectMessage = (params: FormData) => {
  return api.post<TConnectMessageResponse>('/messages', params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const createMessage = (params: FormData) => {
  return api.post<TBMessage>(`/message/create`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const findMessage = (params: FormData) => {
  return api.post<TFindMessageResponse>(`/messaging/find`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllMessages = () => {
  return api.get<TBMessageByUser[]>('/messagings');
};

export const getMessagesById = (params: TGetMessagesByIdParams) => {
  return api.get<TBMessage[]>(`/messaging/${params.id}?page=${params.page}`);
};
