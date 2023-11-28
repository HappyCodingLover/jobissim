import {Box, HStack, IconButton, Image, Modal, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {createTheme} from 'api';
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

const AddThemeModal: FC<TProps> = ({isOpen, setIsOpen, setIsRefresh}) => {
  const dispatch = useAppDispatch();

  const [image, setImage] = useState<TFile | null>(null);
  const [title, setTitle] = useState('');

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handlePickerImage = useCallback(async () => {
    const res = await launchImageLibrary({mediaType: 'photo', quality: 0.1});

    if (res && res.assets) {
      const image = res.assets[0];

      setImage({
        name: image?.fileName || '',
        type: image?.type || '',
        uri: image?.uri || '',
      });
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!image) {
      Toast.show({
        text1: 'You should select image',
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
      formData.append('file', image);
      formData.append('title', title);
      await createTheme(formData);
      handleClose();
      setIsRefresh(true);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
    dispatch(setIsLoading(false));
  }, [image, title, dispatch, setIsRefresh]);

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack bgColor={colors.shark} borderRadius="xl" p="4" space="4" w="full">
        <Box
          alignItems="center"
          borderColor={colors.grayCharade}
          borderRadius="md"
          borderStyle="dashed"
          borderWidth="1"
          h={normalize(250)}
          justifyContent="center"
          w="full">
          {!image?.uri ? (
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
                onPress={handlePickerImage}
              />
              <Text>Ajouter une image</Text>
            </>
          ) : (
            <Image alt="logo" h="full" source={{uri: image.uri}} w="full" />
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

export default AddThemeModal;
