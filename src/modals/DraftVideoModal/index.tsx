import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HStack, Modal, Stack} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';

import {Button, Text} from 'components';
import {colors} from 'config';
import {useAppDispatch, useAppSelector} from 'hooks';
import {clearVideo, getAppState} from 'store';
import {TRootStackParamList} from 'types';
import {normalize} from 'utils';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DraftVideoModal: FC<TProps> = ({isOpen, setIsOpen}) => {
  const dispatch = useAppDispatch();
  const {video} = useAppSelector(getAppState);
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleGoAssemble = useCallback(() => {
    if (video) {
      navigate('main', {params: {url: video}, screen: 'assembleVideo'});
    } else {
      dispatch(clearVideo(video));
      handleClose();
    }
  }, [video, dispatch, navigate]);

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack
        alignItems="center"
        bg={colors.shark}
        p={normalize(10)}
        rounded="xl"
        space={normalize(10)}
        w="full">
        <Text bold color="white" fontSize={normalize(28)}>
          Your last video has been drafted
        </Text>
        <Text color="white" fontSize={normalize(20)} textAlign="center">
          You can publish again your last video, Do you want to publish again?
        </Text>
        <HStack space="2">
          <Button
            flex={1}
            title="Réessayer"
            type="outline"
            onPress={handleClose}
          />
          <Button flex={1} title="Publier" onPress={handleGoAssemble} />
        </HStack>
      </Stack>
    </Modal>
  );
};

export default DraftVideoModal;
