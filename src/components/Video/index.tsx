import {Box, IBoxProps, IconButton} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNVideo from 'react-native-video';

import {normalize} from 'utils';

type TProps = IBoxProps & {
  image: string;
  isFullScreen?: boolean;
  isPlay?: boolean;
  video: string;
};

const Video: FC<TProps> = ({
  h = 'full',
  image,
  isFullScreen = false,
  isPlay = true,
  video,
  ...rest
}) => {
  const [isVideoPlay, setIsVideoPlay] = useState(false);

  useEffect(() => {
    setIsVideoPlay(isPlay);
  }, [isPlay]);

  const handleEnd = useCallback(() => {
    setIsVideoPlay(false);
  }, []);

  const handlePlay = useCallback(() => {
    setIsVideoPlay(_isVideoPlay => !_isVideoPlay);
  }, []);

  return (
    <Box alignItems="center" h={h} justifyContent="center" w="full" {...rest}>
      <RNVideo
        fullscreen={isFullScreen}
        paused={!isVideoPlay}
        poster={image}
        posterResizeMode="contain"
        rate={1.0}
        repeat={true}
        resizeMode="contain"
        source={{uri: video}}
        style={{backgroundColor: 'transparent', height: '100%', width: '100%'}}
        onEnd={handleEnd}
      />
      {!isVideoPlay && (
        <IconButton
          p="0"
          position="absolute"
          variant="unstyled"
          _icon={{
            as: AntDesign,
            color: 'white',
            name: 'play',
            size: normalize(48),
          }}
          _pressed={{
            opacity: 0.5,
          }}
          onPress={handlePlay}
        />
      )}
    </Box>
  );
};

export default Video;
