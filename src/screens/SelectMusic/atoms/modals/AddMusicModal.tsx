import {Box, HStack, IconButton, Image, Modal, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {pick, types} from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {createMusic} from 'api';
import {Button, Input, Text} from 'components';
import {colors} from 'config';
import {useAppDispatch} from 'hooks';
import {setIsLoading} from 'store';
import {TFile} from 'types';
import {normalize} from 'utils';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
};

const AddMusicModal: FC<TProps> = ({isOpen, setIsOpen, setIsRefresh}) => {
  const dispatch = useAppDispatch();

  const [music, setMusic] = useState<TFile | null>(null);
  const [title, setTitle] = useState('');

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handlePickerAudio = useCallback(async () => {
    const res = await pick({type: [types.audio]});

    if (res) {
      const music = res[0];

      setMusic({
        name: music?.name || '',
        type: music?.type || '',
        uri: music?.uri || '',
      });
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!music) {
      Toast.show({
        text1: 'You should select music',
        type: 'error',
      });
      return;
    }
    if (!title) {
      Toast.show({
        text1: 'Please add title',
        type: 'error',
      });
      return;
    }
    dispatch(setIsLoading(true));
    try {
      const formData = new FormData();
      formData.append('file', music);
      formData.append('title', title);
      await createMusic(formData);
      handleClose();
      setIsRefresh(true);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
    dispatch(setIsLoading(false));
  }, [music, title, dispatch, setIsRefresh]);

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack bgColor={colors.shark} borderRadius="xl" p="4" space="4" w="full">
        <Box
          alignItems="center"
          borderColor={colors.grayCharade}
          borderRadius="md"
          borderStyle="dashed"
          borderWidth="1"
          h={normalize(150)}
          justifyContent="center"
          w="full">
          {!music?.uri ? (
            <>
              <IconButton
                p="0"
                variant="unstyled"
                _icon={{
                  as: AntDesign,
                  color: colors.grayCharade,
                  name: 'pluscircle',
                }}
                _pressed={{
                  opacity: 0.5,
                }}
                onPress={handlePickerAudio}
              />
              <Text>Ajouter une image</Text>
            </>
          ) : (
            <Image
              alt="music-logo"
              h={75}
              source={require('assets/images/mp3.png')}
              w={75}
            />
          )}
        </Box>
        <Input
          placeholder="Theme name"
          inputProps={{value: title, onChangeText: setTitle}}
        />
        <HStack space="2">
          <Button
            flex={1}
            title="Réessayer"
            type="outline"
            onPress={handleClose}
          />
          <Button flex={1} title="Publier" onPress={handleSubmit} />
        </HStack>
      </Stack>
    </Modal>
  );
};

export default AddMusicModal;
