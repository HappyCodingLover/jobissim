import axios from 'axios';

import {env} from 'config';
import {TBLinkedinToken, TBSignUpForm, TBUser, TSignInForm} from 'types';

import api from './api';

type TChangePasswordResponse = {
  message: string;
};

type TResetPasswordParams = {
  token: string;
  password: string;
};

type TResetPasswordResponse = {
  error?: string;
};

type TSignInResponse = {
  error?: string;
  token?: string;
};

type TSignUpResponse = {
  error?: string;
  token?: string;
};

type TUpdateUserParams = {
  biography: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
};

type TUpdateUserResponse = {
  error?: string;
};

type TUploadAvatarParams = {
  data: FormData;
  id: number;
};

type TUploadAvatarResponse = {
  error?: string;
};

type TUploadCoverParams = {
  data: FormData;
  id: number;
};

type TUploadCoverResponse = {
  error?: string;
};

type TUploadVideoParams = {
  data: FormData;
  id: number;
};

type TUploadVideoResponse = {
  error?: string;
};

type TUserExistedParams = {
  email: string;
};

type TUserExistedResponse = {
  error?: string;
  isExisted?: boolean;
};

type TVerifyEmailParams = {
  email: string;
};

type TVerifyEmailResponse = {
  error?: string;
  token: string;
};

const linkedinApi = axios.create({
  baseURL: env.linkedinProfileBaseUrl,
  timeout: 15000,
});

export const changePassword = (params: FormData) => {
  return api.post<TChangePasswordResponse>('/updatePassword', params, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const deleteAccount = () => {
  return api.post('/deleteMyAccompte');
};

export const getLinkedinAccessToken = (params: string) => {
  return axios.post<TBLinkedinToken>(env.linkedinAccessTokenUrl, params);
};

export const getLinkedinProfileBasic = (params: TBLinkedinToken) => {
  return linkedinApi.get(env.linkedinProfileBasic, {
    headers: {Authorization: `Bearer ${params.access_token}`},
  });
};

export const getLinkedinProfileEmail = (params: TBLinkedinToken) => {
  return linkedinApi.get(env.linkedinProfileEmail, {
    headers: {Authorization: `Bearer ${params.access_token}`},
  });
};

export const getProfile = () => {
  return api.get<TBUser>('/profile');
};

export const isUserExisted = (params: TUserExistedParams) => {
  return api.post<TUserExistedResponse>('/user_existed', params);
};

export const resetPassword = (params: TResetPasswordParams) => {
  return api.post<TResetPasswordResponse>(
    `/resetMyPassword/${params.token}`,
    {newPassword: params.password},
    {headers: {'Content-Type': 'multipart/form-data'}},
  );
};

export const signIn = (params: TSignInForm) => {
  return api.post<TSignInResponse>('/signin', params);
};

export const signUp = (params: TBSignUpForm) => {
  return api.post<TSignUpResponse>('/signup', params);
};

export const updateUser = (params: TUpdateUserParams) => {
  return api.put<TUpdateUserResponse>(`/users/${params.id}`, {...params});
};

export const uploadAvatar = (params: TUploadAvatarParams) => {
  return api.post<TUploadAvatarResponse>(
    `/users/${params.id}/avatar`,
    params.data,
    {headers: {'Content-Type': 'multipart/form-data'}},
  );
};

export const uploadCover = (params: TUploadCoverParams) => {
  return api.post<TUploadCoverResponse>(
    `/users/${params.id}/cover`,
    params.data,
    {headers: {'Content-Type': 'multipart/form-data'}},
  );
};

export const uploadVideo = (params: TUploadVideoParams) => {
  return api.post<TUploadVideoResponse>(
    `/users/${params.id}/video`,
    params.data,
    {headers: {'Content-Type': 'multipart/form-data'}},
  );
};

export const verifyEmail = (params: TVerifyEmailParams) => {
  return api.post<TVerifyEmailResponse>('/resetPassword', params);
};
