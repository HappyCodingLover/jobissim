import {env} from 'config';

export const getS3ImageUrl = (name?: string) => {
  return `${env.s3FileUrl}/images/${name}`;
};

export const getS3VideoUrl = (name?: string) => {
  return `${env.s3FileUrl}/videos/${name}`;
};

export const getUploadThemeUrl = (name?: string) => {
  return `${env.uploadFileUrl}/themes/${name}`;
};
