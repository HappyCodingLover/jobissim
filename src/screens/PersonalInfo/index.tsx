import {useFormik} from 'formik';
import {Box, Icon, Pressable, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {moveFile} from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';

import {Button, HeaderBar, Input, Text, Video} from 'components';
import {colors, env} from 'config';
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TFile} from 'types';
import {
  convertMovToMp4,
  makeDirectory,
  normalize,
  withoutExtension,
} from 'utils';
import {updateUser, uploadVideo} from 'api';

const initialValues = {
  biography: '',
  email: '',
  firstName: '',
  lastName: '',
};

const validationSchema = Yup.object().shape({
  biography: Yup.string().required('Ce champ ne doit être pas vide.'),
  email: Yup.string().email('Invalid Email').required('Required'),
  firstName: Yup.string().required('Ce champ ne doit être pas vide.'),
  lastName: Yup.string().required('Ce champ ne doit être pas vide.'),
});

const PersonalInfo: FC = () => {
  const {user} = useAppSelector(getAuthState);

  const lastNameInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const biographyInput = useRef<TextInput>(null);

  const [video, setVideo] = useState<TFile | null>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        await updateUser({
          ...values,
          id: user?.id || -1,
          firstname: values.firstName,
          lastname: values.lastName,
        });

        if (video) {
          const formData = new FormData();
          formData.append('file', video);

          await uploadVideo({data: formData, id: user?.id || -1});
        }
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    },
  });

  useEffect(() => {
    if (!user) return;

    formik.setFieldValue('biography', user.biography);
    formik.setFieldValue('email', user.email);
    formik.setFieldValue('firstName', user.firstName);
    formik.setFieldValue('lastName', user.lastName);
  }, [user]);

  const handleImportVideo = useCallback(async () => {
    if (video) {
      setVideo(null);
      return;
    }
    try {
      const res = await launchImageLibrary({
        includeBase64: true,
        mediaType: 'video',
      });

      if (res && res.assets) {
        await makeDirectory(env.recordVideoFilePath);

        const video = res.assets[0];
        const videoNameList = (video.fileName || '').split('/');
        const fileName = videoNameList[videoNameList.length - 1];
        const match = withoutExtension.exec(fileName);

        let videoName = '';

        if (match) {
          videoName = `.${match[1]}.mp4`;
          const extension = match[0].substring(match[1].length + 1);
          if (extension === 'mov') {
            await convertMovToMp4(
              fileName,
              `${env.recordVideoFilePath}/${videoName}`,
            );
          }
        } else {
          videoName = `.${fileName}.mp4`;
          await moveFile(fileName, `${env.recordVideoFilePath}/${videoName}`);
        }

        setVideo({
          name: videoName,
          type: 'video/mp4',
          uri: `file://${env.recordVideoFilePath}/${videoName}`,
        });
      }
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [video]);

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <KeyboardAwareScrollView enableOnAndroid>
        <Stack px="5" py="5" space="5">
          <Input
            error={formik.touched.firstName && formik.errors.firstName}
            placeholder="Prénom"
            inputProps={{
              returnKeyType: 'next',
              value: formik.values.firstName,
              onChangeText: formik.handleChange('firstName'),
              onSubmitEditing: () => {
                lastNameInput.current?.focus();
              },
            }}
          />
          <Input
            error={formik.touched.lastName && formik.errors.lastName}
            inputRef={lastNameInput}
            placeholder="Nom"
            inputProps={{
              returnKeyType: 'next',
              value: formik.values.lastName,
              onChangeText: formik.handleChange('lastName'),
              onSubmitEditing: () => {
                emailInput.current?.focus();
              },
            }}
          />
          <Input
            error={formik.touched.email && formik.errors.email}
            inputRef={emailInput}
            placeholder="Adresse e-mail"
            inputProps={{
              returnKeyType: 'next',
              value: formik.values.email,
              onChangeText: formik.handleChange('email'),
              onSubmitEditing: () => {
                biographyInput.current?.focus();
              },
            }}
          />
          <Input
            error={formik.touched.biography && formik.errors.biography}
            h={normalize(200)}
            placeholder="Biographie"
            inputProps={{
              multiline: true,
              numberOfLines: 4,
              textAlignVertical: 'top',
              value: formik.values.biography,
              onChangeText: formik.handleChange('biography'),
              onSubmitEditing: () => {},
            }}
          />
          <Pressable
            alignItems="center"
            borderColor={colors.grayFrench}
            borderStyle="dashed"
            borderWidth="1"
            h={normalize(200)}
            justifyContent="center"
            rounded="md"
            w="full"
            _pressed={{opacity: 0.5}}
            onPress={handleImportVideo}>
            {video ? (
              <Video h="full" image="" video={video.uri} />
            ) : (
              <>
                <Icon
                  as={AntDesign}
                  color={colors.grayCharade}
                  name="pluscircle"
                  size={normalize(24)}
                />
                <Text>Ajouter une video</Text>
              </>
            )}
          </Pressable>
          <Button title="Sauvegarder" onPress={handleSubmit} />
        </Stack>
      </KeyboardAwareScrollView>
    </Box>
  );
};

export default PersonalInfo;
