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

import {getQuestions} from 'api';
import {Button, HeaderBar, Text} from 'components';
import {colors} from 'config';
import {useAppDispatch, useAppSelector, useModal} from 'hooks';
import {getVideoState, setIsLoading} from 'store';
import {TQuestion, TRootStackParamList} from 'types';
import {normalize} from 'utils';

import {AddQuestionModal, SelectItem} from './atoms';

const SelectQuestion: FC = () => {
  const dispatch = useAppDispatch();
  const {questionList} = useAppSelector(getVideoState);
  const addQuestionModal = useModal();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const [isRefresh, setIsRefresh] = useState(true);
  const [questions, setQuestions] = useState<TQuestion[]>([]);

  useEffect(() => {
    const initialData = async () => {
      dispatch(setIsLoading(true));
      try {
        const res = await getQuestions();
        setQuestions(res.data);
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

  const handleGoSelectTheme = useCallback(() => {
    if (questionList.length > 0) {
      navigate('main', {screen: 'selectTheme'});
    } else {
      Toast.show({
        text1: 'You should select at least one question',
        type: 'error',
      });
    }
  }, [questionList, navigate]);

  const handleShowAddQuestionModal = useCallback(() => {
    addQuestionModal.setIsOpen(true);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TQuestion; index: number}) => {
      return (
        <SelectItem
          isSelected={
            questionList.filter((que: TQuestion) => que.id === item.id).length >
            0
          }
          key={index}
          question={item}
        />
      );
    },
    [questionList],
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
          Sélectionnez les questions auxquelles vous souhaitez répondre.
        </Text>
        <Text fontSize={normalize(20)}>Liste des questions</Text>
        <Pressable
          _pressed={{opacity: 0.5}}
          onPress={handleShowAddQuestionModal}>
          <HStack alignItems="center" space="1">
            <Icon
              as={Ionicons}
              color={colors.blueCornFlower}
              name="add-circle"
              size={normalize(30)}
            />
            <Text color={colors.blueCornFlower}>Ajouter une questionList</Text>
          </HStack>
        </Pressable>
        <FlatList data={questions} renderItem={renderItem} />
        <Button title="Suivant" onPress={handleGoSelectTheme} />
      </Stack>
      <AddQuestionModal setIsRefresh={setIsRefresh} {...addQuestionModal} />
    </Box>
  );
};

export default SelectQuestion;
