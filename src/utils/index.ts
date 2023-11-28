import {Dimensions, PixelRatio} from 'react-native';

const {width} = Dimensions.get('window');
const scale = width / 480;

export const normalize = (size: number) => {
  const realSize = size * scale;

  return `${Math.round(PixelRatio.roundToNearestPixel(realSize))}px`;
};

export const withoutExtension = new RegExp(/^(.+)\.[^.]+$/i);

export * from './api-convert';
export * from './ffmpeg';
export * from './firebase';
export * from './initialize';
export * from './message';
export * from './path';
export * from './rnfs';
export * from './string';
export * from './time';
export * from './url';
