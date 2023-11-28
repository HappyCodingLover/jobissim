import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, IconButton, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {Button, QuestionVideoIcon, Text, UploadVideoIcon} from 'components';
import {colors} from 'config';
import {TRootStackParamList} from 'types';
import {normalize} from 'utils';

const SelectVideoPublishType: FC = () => {
  const {goBack, navigate} =
    useNavigation<NavigationProp<TRootStackParamList>>();

  const handleGoSelectQuestion = useCallback(() => {
    navigate('main', {screen: 'selectQuestion'});
  }, [navigate]);

  const handleImportVideo = useCallback(async () => {
    try {
      await requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);

      const res = await launchImageLibrary({
        includeBase64: true,
        mediaType: 'video',
      });

      if (res && res.assets) {
        navigate('main', {
          params: {
            name: res.assets[0].fileName,
            type: res.assets[0].type,
            uri: res.assets[0].uri,
          },
          screen: 'assembleVideo',
        });
      }
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [navigate]);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <Stack
        alignItems="center"
        h="full"
        justifyContent="center"
        px="5"
        space="4"
        w="full">
        <IconButton
          p="0"
          position="absolute"
          right="5"
          top="5"
          variant="unstyled"
          _icon={{
            as: AntDesign,
            color: 'white',
            name: 'close',
            size: 'xl',
          }}
          _pressed={{
            opacity: 0.5,
          }}
          onPress={goBack}
        />
        <Text fontSize={normalize(22)} fontWeight="bold">
          Nouvelle publication
        </Text>
        <Text fontSize={normalize(18)} textAlign="center">
          Choisissez une méthode parmi les boutons ci-dessous pour publier une
          vidéo.
        </Text>
        <Button
          fontSize={normalize(16)}
          leftIcon={<QuestionVideoIcon h={20} w={20} />}
          title="Créer une vidéo"
          w="full"
          onPress={handleGoSelectQuestion}
        />
        <Button
          fontSize={normalize(16)}
          leftIcon={<UploadVideoIcon h={16} w={16} />}
          title="Importer une vidéo"
          w="full"
          onPress={handleImportVideo}
        />
      </Stack>
    </Box>
  );
};

export default SelectVideoPublishType;
