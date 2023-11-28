import {FFmpegKit} from 'ffmpeg-kit-react-native';
import {Dimensions} from 'react-native';

import {env} from 'config';

const scale = Dimensions.get('screen').scale;
const xResolution = Dimensions.get('screen').width * scale;

export const addMark = (from: string, to: string) => {
  return FFmpegKit.execute(
    `-i ${from} -i https://jobissim.com/assets/images/logo-alt.png -filter_complex "[1:v]scale=300:100[mark];[0:v][mark]overlay=10:10" -codec:a copy ${to}`,
  );
};

export const addMusic = (from: string, to: string) => {
  return FFmpegKit.execute(
    `-i ${from} -i ${env.recordVideoFilePath}/background.mp3 -filter_complex "[0:a]volume=1:enable='between(t,0,2)'[va]; [1:a]volume=0.1:enable='between(t,2,99999)'[vb]; [va][vb]amix=inputs=2[a]" -map: 0:v -map "[a]" -c:v copy -shortest ${to}`,
  );
};

export const addSubTitle = (from: string, subtitle: string, to: string) => {
  return FFmpegKit.execute(`-i ${from} -vf subtitles=${subtitle} ${to}`);
};

export const convertMovToMp4 = (from: string, to: string) => {
  return FFmpegKit.execute(
    `-i ${from} -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k ${to}`,
  );
};

export const generateVideoFromImageAndMusic = (
  image: string,
  videoName: string,
) => {
  return FFmpegKit.execute(
    `-loop 1 -i ${image} -f lavfi -i anullsrc=channel_layout=stereo -c:v libx264 -t 2 -pix_fmt yuv420p -vf "setsar=0:1,scale=${getXResolution()}:${getYResolution()}" ${videoName}`,
  );
};

export const getAmrFromMov = (from?: string, to?: string) => {
  return FFmpegKit.execute(
    `-i ${from} -vn -acodec libopencore_amrnb -ar 8000 -ac 1 -f 3gp ${to}`,
  );
};

export const getXResolution = () => {
  if (xResolution >= 2160) {
    return 2160;
  } else if (xResolution < 2160 && xResolution >= 1080) {
    return 1080;
  } else if (xResolution < 1080 && xResolution >= 720) {
    return 720;
  } else if (xResolution < 720 && xResolution >= 480) {
    return 480;
  } else {
    return 1080;
  }
};

export const getYResolution = () => {
  if (xResolution >= 2160) {
    return 3840;
  } else if (xResolution < 2160 && xResolution >= 1080) {
    return 1920;
  } else if (xResolution < 1080 && xResolution >= 720) {
    return 1280;
  } else if (xResolution < 720 && xResolution >= 480) {
    return 640;
  } else {
    return 1920;
  }
};

export const mergeVideo = (paths: string[], videoName: string) => {
  return FFmpegKit.execute(
    `-i ${paths.join(' -i ')} -filter_complex "${paths.reduce(
      (_prev, current, index) => `${_prev} [${index}:v] [${index}:a]`,
      '',
    )} concat=n=${
      paths.length
    }:v=1:a=1 [v] [a]" -map "[v]" -map "[a]" -r 23.967 ${videoName}`,
  );
};
