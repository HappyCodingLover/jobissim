import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, HStack, Icon, Image, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {getThemes} from 'api';
import {Button, HeaderBar, Text} from 'components';
import {colors, env} from 'config';
import {useAppDispatch, useAppSelector, useModal} from 'hooks';
import {getVideoState, setIsLoading, setTheme} from 'store';
import {TRootStackParamList, TTheme} from 'types';
import {normalize} from 'utils';

import {AddThemeModal, ThemeItem} from './atoms';

const SelectTheme: FC = () => {
  const dispatch = useAppDispatch();
  const {questionList, theme} = useAppSelector(getVideoState);
  const addThemeModal = useModal();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const {width} = useWindowDimensions();

  const [isRefresh, setIsRefresh] = useState(true);
  const [key, setKey] = useState(0);
  const [themes, setThemes] = useState<TTheme[]>([]);

  useEffect(() => {
    if (!theme) return;

    setKey(_key => _key + 1);
  }, [theme]);

  useEffect(() => {
    if (!themes.length) return;

    if (!theme) {
      dispatch(setTheme(themes[0]));
    }
  }, [theme, themes, dispatch]);

  useEffect(() => {
    const initialData = async () => {
      dispatch(setIsLoading(true));
      try {
        const res = await getThemes();
        setThemes(res.data);
        dispatch(setTheme(res.data[0]));
        setIsRefresh(false);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    };

    isRefresh && initialData();
  }, [isRefresh, dispatch]);

  const handleAddMusic = useCallback(() => {
    navigate('main', {screen: 'selectMusic'});
  }, [navigate]);

  const handleGoRecordVideo = useCallback(() => {
    navigate('main', {screen: 'recordVideo'});
  }, [navigate]);

  const handleShowAddThemeModal = useCallback(() => {
    addThemeModal.setIsOpen(true);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TTheme; index: number}) => {
      return (
        <ThemeItem
          index={index}
          key={index}
          length={themes.length}
          theme={item}
          handleShowAddThemeModal={handleShowAddThemeModal}
        />
      );
    },
    [themes, handleShowAddThemeModal],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar title="Sélectionner le thème à utiliser" />
      <Stack alignItems="center" flex={1} justifyContent="center">
        <Image
          alt="logo"
          h="full"
          key={key}
          position="absolute"
          resizeMode="stretch"
          source={{uri: `${env.uploadFileUrl}/themes/${theme?.image}`}}
          w="full"
        />
        <Text fontSize={normalize(25)}>{questionList[0].title}</Text>
        <Stack bottom={normalize(40)} position="absolute" px="5" space="1">
          <Carousel
            activeSlideAlignment="start"
            data={[{}, ...themes]}
            inactiveSlideScale={1}
            itemWidth={100}
            sliderWidth={width - 40}
            renderItem={renderItem}
          />
          <HStack justifyContent="space-between">
            <Button
              leftIcon={<Icon as={Fontisto} color="white" name="music-note" />}
              px={5}
              title="Add Music"
              onPress={handleAddMusic}
            />
            <Button px={5} title="Next" onPress={handleGoRecordVideo} />
          </HStack>
        </Stack>
      </Stack>
      <AddThemeModal setIsRefresh={setIsRefresh} {...addThemeModal} />
    </Box>
  );
};

export default SelectTheme;
