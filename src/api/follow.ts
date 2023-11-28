import {TFollowUser} from 'types';

import api from './api';

type TFollowParams = {
  id: number;
};

type TGetFollowersParams = {
  id: number;
};

type TGetFollowingsParams = {
  id: number;
};

type TIsFollowedParams = {
  id: number;
};

type TIsFollowedResponse = {
  isFollowed: boolean;
};

export const follow = (params: TFollowParams) => {
  return api.post(`/follow/${params.id}`);
};

export const getFollowers = (params: TGetFollowersParams) => {
  return api.get<TFollowUser[]>(`/getFollowers/${params.id}`);
};

export const getFollowings = (params: TGetFollowingsParams) => {
  return api.get<TFollowUser[]>(`/getFollowings/${params.id}`);
};

export const isFollowed = (params: TIsFollowedParams) => {
  return api.get<TIsFollowedResponse>(`/isFollowed/${params.id}`);
};
