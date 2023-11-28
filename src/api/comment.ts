import {TBComment} from 'types';

import api from './api';

type TCommentVideoParams = {
  content: string;
  postId: number;
};

type TCommentVideoResponse = {
  comments: number;
};

export const commentVideo = (params: TCommentVideoParams) => {
  return api.post<TCommentVideoResponse>(`/comment/create`, params);
};

export const getAllComments = (id: number) => {
  return api.get<TBComment[]>(`/comments/post/${id}`);
};
