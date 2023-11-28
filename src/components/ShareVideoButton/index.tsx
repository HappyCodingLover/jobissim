import {HStack, Pressable, Stack} from 'native-base';
import React, {FC} from 'react';

import {useModal} from 'hooks';
import {ShareVideoModal} from 'modals';
import {TVideo} from 'types';

import {ShareIcon} from '../Icons';
import Text from '../Text';

type TProps = {
  direction?: 'column' | 'row';
  video: TVideo;
};

const ShareVideoButton: FC<TProps> = ({direction, video}) => {
  const shareVideoModal = useModal();

  const handleShare = () => {
    shareVideoModal.setIsOpen(true);
  };

  return (
    <>
      <Pressable _pressed={{opacity: 70}} onPress={handleShare}>
        {direction === 'row' ? (
          <HStack alignItems="center" justifyContent="center" space="2">
            <ShareIcon />
            <Text color="white">Partager</Text>
          </HStack>
        ) : (
          <Stack alignItems="center" justifyContent="center" space="1">
            <ShareIcon />
            <Text color="white">Partager</Text>
          </Stack>
        )}
      </Pressable>
      <ShareVideoModal video={video} {...shareVideoModal} />
    </>
  );
};

export default ShareVideoButton;
