import {NavigatorScreenParams} from '@react-navigation/native';

export type TAuthStackParamList = {
  enterPassword: undefined;
  forgotPassword: undefined;
  setPassword: {from: string; token?: string};
  signIn: undefined;
  signUp: undefined;
  signUpStep: undefined;
};

export type TMainStackParamList = {
  assembleVideo: {name?: string; type?: string; uri?: string; url?: string};
  blockUser: undefined;
  businessProfile: {id: number};
  changePassword: undefined;
  chatRoom: {avatar: string; fullName: string; id: number};
  checkRecordVideo: undefined;
  notification: undefined;
  personalInfo: undefined;
  playVideo: {url: string};
  recordVideo: {id: number} | undefined;
  search: {filterValue: string};
  selectMusic: undefined;
  selectQuestion: undefined;
  selectTheme: undefined;
  selectVideoPublishType: undefined;
  settings: undefined;
  tab: NavigatorScreenParams<TTabStackParamList> | undefined;
  terms: {url: string};
  tendencyView: {id: number};
  userProfile: {id: number};
  videoView: {id: number};
};

export type TRootStackParamList = {
  auth: NavigatorScreenParams<TAuthStackParamList> | undefined;
  main: NavigatorScreenParams<TMainStackParamList> | undefined;
};

export type TTabStackParamList = {
  home: undefined;
  message: undefined;
  profile: undefined;
  search: undefined;
};
