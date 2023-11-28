import {Icon, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import {useModal} from 'hooks';
import {BlockVideoModal} from 'modals';
import {TVideo} from 'types';

type TProps = {
  video: TVideo;
};

const BlockVideoButton: FC<TProps> = ({video}) => {
  const blockVideoModal = useModal();

  const handleOpenBlockModal = useCallback(() => {
    blockVideoModal.setIsOpen(true);
  }, []);

  return (
    <>
      <Pressable
        alignItems="center"
        _pressed={{opacity: 70}}
        onPress={handleOpenBlockModal}>
        <Icon as={Entypo} color="white" name="dots-three-vertical" />
      </Pressable>
      <BlockVideoModal video={video} {...blockVideoModal} />
    </>
  );
};

export default BlockVideoButton;
