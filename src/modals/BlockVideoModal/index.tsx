import {Box, HStack, Icon, Modal, Pressable, Stack} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {blockThisUser, reportVideo} from 'api';
import {SignalingIcon, Text} from 'components';
import {colors} from 'config';
import {TVideo} from 'types';
import {normalize} from 'utils';

type TProps = {
  isOpen: boolean;
  video: TVideo;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const BlockVideoModal: FC<TProps> = ({isOpen, video, setIsOpen}) => {
  const handleBlock = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('id', video.user.id);

      await blockThisUser(formData);
      handleClose();
    } catch (error) {
      Toast.show({text1: JSON.stringify(error), type: 'error'});
    }
  }, [video]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleReport = useCallback(async () => {
    try {
      await reportVideo({
        content: 'Signalement pour non respect',
        id: video.id,
      });
      handleClose();
    } catch (error) {
      Toast.show({text1: JSON.stringify(error), type: 'error'});
    }
  }, [video]);

  return (
    <Modal isOpen={isOpen} justifyContent="flex-end" onClose={handleClose}>
      <Stack bg={colors.shark} p="4" rounded="2xl" space="2" w="full">
        <Pressable _pressed={{opacity: 0.5}} onPress={handleReport}>
          <HStack alignItems="center" space="2">
            <Box
              alignItems="center"
              borderColor={colors.grayFrench}
              borderWidth={1}
              h="10"
              justifyContent="center"
              rounded="full"
              w="10">
              <SignalingIcon color={colors.grayFrench} />
            </Box>
            <Text fontSize={normalize(22)}>Signaler</Text>
          </HStack>
        </Pressable>
        <Pressable _pressed={{opacity: 0.5}} onPress={handleBlock}>
          <HStack alignItems="center" space="2">
            <Box
              alignItems="center"
              borderColor={colors.grayFrench}
              borderWidth={1}
              h="10"
              justifyContent="center"
              rounded="full"
              w="10">
              <Icon
                as={FontAwesome5}
                color={colors.grayFrench}
                left={-1}
                name="user-slash"
                onPress={handleBlock}
              />
            </Box>
            <Text fontSize={normalize(22)}>Bloquer</Text>
          </HStack>
        </Pressable>
      </Stack>
    </Modal>
  );
};

export default BlockVideoModal;
