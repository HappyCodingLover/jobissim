import {Platform} from 'react-native';
import {CachesDirectoryPath, DocumentDirectoryPath} from 'react-native-fs';

import {
  API_BASE,
  DEEPAR_ANDROID_KEY,
  DEEPAR_IOS_KEY,
  LINKEDIN_ACCESS_TOKEN_URL,
  LINKEDIN_AUTHORIZATION_URL,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_PROFILE_BASE_URL,
  LINKEDIN_PROFILE_EMAIL,
  LINKEDIN_PROFILE_BASIC,
  LINKEDIN_REDIRECT_URI,
  ML_BASE,
  PUSHER_CLIENT_KEY,
  S3_FILE_URL,
  UPLOAD_FILE_URL,
} from '@env';

const env = {
  apiBase: API_BASE,
  deepARAndroidKey: DEEPAR_ANDROID_KEY,
  deepARiOSKey: DEEPAR_IOS_KEY,
  linkedinAccessTokenUrl: LINKEDIN_ACCESS_TOKEN_URL,
  linkedinAuthorizationUrl: LINKEDIN_AUTHORIZATION_URL,
  linkedinClientID: LINKEDIN_CLIENT_ID,
  linkedinClientSecret: LINKEDIN_CLIENT_SECRET,
  linkedinProfileBaseUrl: LINKEDIN_PROFILE_BASE_URL,
  linkedinProfileBasic: LINKEDIN_PROFILE_BASIC,
  linkedinProfileEmail: LINKEDIN_PROFILE_EMAIL,
  linkedinRedirectUri: LINKEDIN_REDIRECT_URI,
  mlBase: ML_BASE,
  pusherClientKey: PUSHER_CLIENT_KEY,
  s3FileUrl: S3_FILE_URL,
  recordVideoFilePath:
    Platform.OS === 'ios'
      ? `${CachesDirectoryPath}/.jobissim`
      : `${DocumentDirectoryPath}/.jobissim`,
  uploadFileUrl: UPLOAD_FILE_URL,
};

export default env;
