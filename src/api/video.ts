import {TBVideo} from 'types';

import api from './api';

type TGetCVVideosParams = {
  id: number;
};

type TGetUserVideosByID = {
  id: number;
  search: string;
};

type TGetVideosParams = {
  page: number;
  subCategoryId?: number;
};

type TLikedVideoResponse = {
  isLiked: boolean;
};

type TLikeVideoParams = {
  id: number;
};

type TLikeVideoResponse = {
  likes: number;
};

type TPublishVideoResponse = {
  likes: number;
};

type TReportVideoParams = {
  content: string;
  id: number;
};

type TSearchVideoParams = {
  search: string;
};

export const createVideo = (params: FormData) => {
  return api.post(`/post/create`, params, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const getCVVideos = (params: TGetCVVideosParams) => {
  return api.get<TBVideo[]>(`/posts/user/${params.id}/cv`);
};

export const getUserVideosById = (params: TGetUserVideosByID) => {
  return api.get<TBVideo[]>(
    `/posts/user/${params.id}/activities${
      params.search !== 'all' ? `?search=${params.search}` : ''
    }`,
  );
};

export const getVideoById = (id: number) => {
  return api.get<TBVideo>(`/post/${id}`);
};

export const getVideos = (params: TGetVideosParams) => {
  return api.get<TBVideo[]>(
    `/posts/subcategory/${params.subCategoryId || 4}?page=${params.page}`,
  );
};

export const isLikedVideo = (params: TLikeVideoParams) => {
  return api.get<TLikedVideoResponse>(`/post/${params.id}/isLiked`);
};

export const likeVideo = (params: TLikeVideoParams) => {
  return api.post<TLikeVideoResponse>(`/post/${params.id}/like`);
};

export const publishVideo = (params: FormData) => {
  return api.post<TPublishVideoResponse>(`/post/create`);
};

export const reportVideo = (params: TReportVideoParams) => {
  return api.post(`/report/post/${params.id}`, {content: params.content});
};

export const searchVideo = (params: TSearchVideoParams) => {
  return api.get<TBVideo[]>(`/posts?pagination=false&title=${params.search}`);
};
