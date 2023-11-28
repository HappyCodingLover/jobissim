import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useFormik} from 'formik';
import moment from 'moment';
import {
  Box,
  Checkbox,
  HStack,
  IconButton,
  Image,
  Stack,
  StatusBar,
  Switch,
} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {writeFile} from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Yup from 'yup';

import {createVideo, getSubTitle} from 'api';
import {
  Button,
  DatePicker,
  HeaderBar,
  Input,
  MultiSelect,
  Select,
  Text,
  Video,
} from 'components';
import {colors, env} from 'config';
import {useAppDispatch, useAppSelector, useModal} from 'hooks';
import {addVideo, clearVideo, getAppState, setIsLoading} from 'store';
import {
  TCategory,
  TFile,
  TMainStackParamList,
  TRootStackParamList,
  TSubCategory,
} from 'types';
import {addSubTitle, getAmrFromMov, normalize, subtitleF} from 'utils';

import {HashTagModal} from './atoms';

const initialValues = {
  active: false,
  category: '',
  city: '',
  contacts: [],
  date: '',
  salary: '',
  salaryType: '',
  subCategory: '',
  terms: false,
  title: '',
};

const validationSchema = Yup.object().shape({
  active: Yup.boolean(),
  category: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  contacts: Yup.array(Yup.string()),
  date: Yup.string(),
  salary: Yup.string(),
  salaryType: Yup.string(),
  subCategory: Yup.string().required('Required'),
  terms: Yup.boolean(),
  title: Yup.string().required('Required'),
});

const AssembleVideo: FC = () => {
  const dispatch = useAppDispatch();
  const {categories, subCategories} = useAppSelector(getAppState);
  const hashTagModal = useModal();
  const {goBack} = useNavigation<NavigationProp<TRootStackParamList>>();
  const {params} = useRoute<RouteProp<TMainStackParamList, 'assembleVideo'>>();

  const [description, setDescription] = useState('');
  const [image, setImage] = useState<TFile | null>(null);
  const [video, setVideo] = useState<TFile | null>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      dispatch(setIsLoading(true));
      try {
        const formData = new FormData();
        formData.append('activateComments', values.active);
        formData.append(
          'category',
          categories.find(
            (category: TCategory) => category.id === parseInt(values.category),
          )?.name,
        );
        formData.append('city', values.city);
        formData.append('contracts', values.contacts);
        formData.append('cpf', '');
        formData.append('description', description);
        formData.append('date', values.date);
        formData.append('hmy', values.salaryType);
        image && formData.append('image', image);
        formData.append('remote', false);
        formData.append('salary', values.salary);
        formData.append(
          'subCategory',
          subCategories.find(
            (category: TSubCategory) =>
              category.id === parseInt(values.subCategory),
          )?.name,
        );
        formData.append('title', values.title);
        formData.append('video', video);

        await createVideo(formData);
        dispatch(clearVideo(params.url));

        Toast.show({text1: 'Your video is published!', type: 'success'});
      } catch (error) {
        console.log(JSON.stringify(error));
        dispatch(addVideo(params.url));
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
      dispatch(setIsLoading(false));
    },
  });

  useEffect(() => {
    setVideo({
      name: params.url ? `${params.url.split('/').pop()}` : params.name || '',
      type: params.url ? 'video/mov' : params.type || '',
      uri: params.url ? `file://${params.url}` : params.uri || '',
    });
  }, [params]);

  const handleChangeContacts = useCallback((value: string[]) => {
    formik.setFieldValue('contacts', value);
  }, []);

  const handleChangeDescription = useCallback((value: string) => {
    if (value[value.length - 1] === '#') {
      hashTagModal.setIsOpen(true);
    } else {
      setDescription(value);
    }
  }, []);

  const handleGetSubTitle = useCallback(async () => {
    dispatch(setIsLoading(true));
    try {
      const fileName = `${new Date().getTime()}.mp4`;
      const filePath = `${env.recordVideoFilePath}/${fileName}`;
      await getAmrFromMov(params.url, filePath);

      const formData = new FormData();
      formData.append('file', {
        name: fileName,
        type: 'audio/amr',
        uri: `file://${filePath}`,
      });

      const res = await getSubTitle(formData);
      const subtitles = res.data.transcriptions.map(subtitleF);

      const srtData = subtitles.reduce<string>(
        (_prev, subtitle, index) =>
          `${_prev}${index + 1}\n${subtitle.startTime},000 --> ${
            subtitle.endTime
          },000\n${subtitle.phrase}\n\n`,
        '',
      );
      const srtFilePath = `${
        env.recordVideoFilePath
      }/${new Date().getTime()}.srt`;
      await writeFile(srtFilePath, srtData);

      const totalName = `${new Date().getTime()}.mov`;
      const totalPath = `${env.recordVideoFilePath}/${totalName}`;
      await addSubTitle(params.url || '', srtFilePath, totalPath);

      setVideo({
        name: totalName,
        type: 'video/mov',
        uri: `file://${totalPath}`,
      });
    } catch (error) {
      Toast.show({text1: JSON.stringify(error), type: 'error'});
    }
    dispatch(setIsLoading(false));
  }, [params, dispatch]);

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

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar title="Assemblage" />
      <Stack flex={1} pb="10" pt="3" px="5" space="4">
        <Text
          fontSize={normalize(37)}
          fontWeight="bold"
          lineHeight={normalize(37)}
          textAlign="center">
          Assemblage
        </Text>
        <Text
          color="white"
          fontSize={normalize(18)}
          lineHeight={normalize(22)}
          textAlign="center">
          Veuillez renseigner un titre, indiquer une ville, ou sélectionner
          l'option télétravail
        </Text>
        <KeyboardAwareScrollView
          enableOnAndroid
          showsVerticalScrollIndicator={false}>
          <Stack space="3">
            <Video
              h={normalize(250)}
              image=""
              isPlay={true}
              video={`${env.recordVideoFilePath}/${video?.name}`}
            />
            <Button title="SubTitle" onPress={handleGetSubTitle} />
            <Box
              alignItems="center"
              borderColor={colors.grayFrench}
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
                      color: colors.grayDusty,
                      name: 'pluscircle',
                    }}
                    _pressed={{opacity: 0.5}}
                    onPress={handlePickerImage}
                  />
                  <Text>Ajouter une image</Text>
                </>
              ) : (
                <Image alt="logo" h="full" source={{uri: image.uri}} w="full" />
              )}
            </Box>
            <Input
              error={formik.touched.title && formik.errors.title}
              placeholder="Titre"
              inputProps={{onChangeText: formik.handleChange('title')}}
            />
            <Input
              error={formik.touched.city && formik.errors.city}
              placeholder="Ville"
              inputProps={{onChangeText: formik.handleChange('city')}}
            />
            <Checkbox
              borderWidth="0"
              isChecked={formik.values.terms}
              value="terms"
              _text={{color: 'white'}}
              onChange={e => formik.setFieldValue('terms', e)}>
              Télétravail
            </Checkbox>
            <Select
              data={categories.map((category: TCategory) => ({
                label: category.name,
                value: category.id.toString(),
              }))}
              error={formik.touched.category && formik.errors.category}
              placeholder="Categorie"
              selectProps={{onValueChange: formik.handleChange('category')}}
            />
            <Select
              data={subCategories.map((subCategory: TSubCategory) => ({
                label: subCategory.name,
                value: subCategory.id.toString(),
              }))}
              error={formik.touched.subCategory && formik.errors.subCategory}
              placeholder="Contenu"
              selectProps={{onValueChange: formik.handleChange('subCategory')}}
            />
            <Input
              h={normalize(200)}
              placeholder="Ville"
              inputProps={{
                multiline: true,
                numberOfLines: 4,
                textAlignVertical: 'top',
                value: description,
                onChangeText: handleChangeDescription,
              }}
            />
            <Stack>
              <Text>Autoriser les commentaires ?</Text>
              <HStack space="2">
                <Switch
                  isChecked={formik.values.active}
                  onToggle={() =>
                    formik.setFieldValue('active', !formik.values.active)
                  }
                />
                <Text>{formik.values.active ? 'Oui' : 'Non'}</Text>
              </HStack>
            </Stack>
            <HStack space="2">
              <Input
                error={formik.touched.salary && formik.errors.salary}
                flex={5}
                placeholder="Salaire"
                inputProps={{
                  keyboardType: 'numeric',
                  onChangeText: formik.handleChange('salary'),
                }}
              />
              <Select
                data={[
                  {label: 'Heure', value: 'heure'},
                  {label: 'Mois', value: 'mois'},
                  {label: 'Année', value: 'année'},
                ]}
                flex={3}
                error={formik.touched.salaryType && formik.errors.salaryType}
                selectProps={{onValueChange: formik.handleChange('salaryType')}}
              />
            </HStack>
            <MultiSelect
              data={[
                {label: 'CDI', value: 'CDI'},
                {label: 'CDD', value: 'CDD'},
                {label: 'Alternance', value: 'Alternance'},
                {label: 'Stage', value: 'Stage'},
                {label: 'Freelance', value: 'Freelance'},
                {label: 'Intérim', value: 'Intérim'},
                {label: 'VIE', value: 'VIE'},
                {label: 'Statuaire', value: 'Statuaire'},
                {label: 'Franchise', value: 'Franchise'},
                {label: 'Saisonnier', value: 'Saisonnier'},
                {label: 'Volontaire', value: 'Volontaire'},
              ]}
              error={formik.touched.contacts && formik.errors.contacts}
              placeholder="Type de contrat"
              onValueChange={handleChangeContacts}
            />
            <DatePicker
              placeholder="Date de début"
              value={formik.values.date}
              onChange={date =>
                formik.setFieldValue('date', moment(date).format('YYYY/MM/DD'))
              }
            />
          </Stack>
        </KeyboardAwareScrollView>
        <HStack space="2">
          <Button flex={1} title="Réessayer" type="outline" onPress={goBack} />
          <Button flex={1} title="Publier" onPress={handleSubmit} />
        </HStack>
      </Stack>
      <HashTagModal setDescription={setDescription} {...hashTagModal} />
    </Box>
  );
};

export default AssembleVideo;
