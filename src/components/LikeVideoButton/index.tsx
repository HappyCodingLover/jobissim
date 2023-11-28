import {HStack, Pressable, Stack} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {isLikedVideo, likeVideo} from 'api';
import {colors} from 'config';
import {TVideo} from 'types';

import {ThumbsUpSolidIcon} from '../Icons';
import Text from '../Text';

type TProps = {
  direction?: 'column' | 'row';
  video: TVideo;
};

const LikeVideoButton: FC<TProps> = ({direction = 'column', video}) => {
  const [countLikes, setCountLikes] = useState(0);
  const [isVideoLiked, setIsVideoLiked] = useState(false);

  useEffect(() => {
    setCountLikes(video.countLikes);
  }, [video]);

  useEffect(() => {
    const checkLikeVideo = async () => {
      try {
        const res = await isLikedVideo({id: video.id});
        setIsVideoLiked(res.data.isLiked);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    checkLikeVideo();
  }, [video, countLikes]);

  const handleLike = useCallback(async () => {
    try {
      const res = await likeVideo({id: video.id});
      setCountLikes(res.data.likes);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [video]);

  return (
    <Pressable _pressed={{opacity: 70}} onPress={handleLike}>
      {direction === 'row' ? (
        <HStack alignItems="center" justifyContent="center" space="2">
          <ThumbsUpSolidIcon
            color={isVideoLiked ? colors.blueCornFlower : 'white'}
          />
          <Text color={isVideoLiked ? colors.blueCornFlower : 'white'}>
            {countLikes}
          </Text>
        </HStack>
      ) : (
        <Stack alignItems="center" justifyContent="center" space="1">
          <ThumbsUpSolidIcon
            color={isVideoLiked ? colors.blueCornFlower : 'white'}
          />
          <Text color={isVideoLiked ? colors.blueCornFlower : 'white'}>
            {countLikes}
          </Text>
        </Stack>
      )}
    </Pressable>
  );
};

export default LikeVideoButton;
