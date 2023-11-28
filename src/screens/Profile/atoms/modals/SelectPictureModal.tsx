import {Modal, Stack} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

import {ImportPictureIcon, TakePictureIcon} from 'components';
import {colors} from 'config';
import {normalize} from 'utils';

import {SelectPictureModalButton} from '../components';

type TProps = {
  isOpen: boolean;
  onChange: (image: Asset) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SelectPictureModal: FC<TProps> = ({isOpen, onChange, setIsOpen}) => {
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleImportPicture = useCallback(async () => {
    try {
      const res = await launchImageLibrary({mediaType: 'photo', quality: 0.1});

      if (res && res.assets) {
        const image = res.assets[0];

        onChange(image);
      }

      setIsOpen(false);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, []);

  const handleTakePicture = useCallback(async () => {
    try {
      const res = await launchCamera({
        cameraType: 'front',
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true,
      });

      if (res && res.assets) {
        const image = res.assets[0];

        onChange(image);
      }

      setIsOpen(false);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, []);

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack bg={colors.shark} px="2" py="5" rounded="xl" space="3" w="full">
        <SelectPictureModalButton
          icon={<TakePictureIcon />}
          title="Prendre une photo"
          onPress={handleTakePicture}
        />
        <SelectPictureModalButton
          icon={<ImportPictureIcon />}
          title="Importer une photo"
          onPress={handleImportPicture}
        />
      </Stack>
    </Modal>
  );
};

export default SelectPictureModal;
