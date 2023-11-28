import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Stack,
  StatusBar,
} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {getMusics} from 'api';
import {Button, HeaderBar, Text} from 'components';
import {colors} from 'config';
import {useAppDispatch, useAppSelector, useModal} from 'hooks';
import {getVideoState, setIsLoading, setMusic} from 'store';
import {TMusic, TRootStackParamList} from 'types';
import {normalize} from 'utils';

import {AddMusicModal, SelectItem} from './atoms';

const SelectMusic: FC = () => {
  const dispatch = useAppDispatch();
  const {music} = useAppSelector(getVideoState);
  const addMusicModal = useModal();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const [isRefresh, setIsRefresh] = useState(true);
  const [musics, setMusics] = useState<TMusic[]>([]);

  useEffect(() => {
    const initialData = async () => {
      dispatch(setIsLoading(true));
      try {
        const res = await getMusics();
        setMusics(res.data);
        dispatch(setMusic(res.data[0]));
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

  const handleGoSelectTheme = useCallback(() => {
    navigate('main', {screen: 'selectTheme'});
  }, [navigate]);

  const handleShowAddMusicModal = useCallback(() => {
    addMusicModal.setIsOpen(true);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TMusic; index: number}) => {
      return (
        <SelectItem
          isSelected={music?.id === item.id}
          key={index}
          music={item}
        />
      );
    },
    [music],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <Stack flex={1} pb="5" px="5" space="3">
        <Text fontSize={normalize(28)} fontWeight="bold" textAlign="center">
          Création vidéo
        </Text>
        <Text fontSize={normalize(20)} textAlign="center">
          Sélectionnez la musique que vous souhaitez utiliser.
        </Text>
        <Text fontSize={normalize(20)}>Liste des musiques</Text>
        <Pressable _pressed={{opacity: 0.5}} onPress={handleShowAddMusicModal}>
          <HStack alignItems="center" space="1">
            <Icon
              as={Ionicons}
              color={colors.blueCornFlower}
              name="add-circle"
              size={normalize(30)}
            />
            <Text color={colors.blueCornFlower}>Ajouter une musicList</Text>
          </HStack>
        </Pressable>
        <FlatList data={musics} renderItem={renderItem} />
        <Button title="Suivant" onPress={handleGoSelectTheme} />
      </Stack>
      <AddMusicModal setIsRefresh={setIsRefresh} {...addMusicModal} />
    </Box>
  );
};

export default SelectMusic;
