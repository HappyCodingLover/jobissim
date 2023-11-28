import {HStack, Modal, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';

import {createQuestion} from 'api';
import {Button, Input} from 'components';
import {colors} from 'config';
import {useAppDispatch, useAppSelector} from 'hooks';
import {getAuthState, setIsLoading} from 'store';
import {normalize} from 'utils';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
};

const AddQuestionModal: FC<TProps> = ({isOpen, setIsOpen, setIsRefresh}) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(getAuthState);

  const [question, setQuestion] = useState('');

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    dispatch(setIsLoading(true));
    try {
      await createQuestion({
        businessId: 0,
        title: question,
        userId: user?.id || 0,
      });
      handleClose();
      setIsRefresh(true);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
    dispatch(setIsLoading(false));
  }, [question, user, dispatch, setIsRefresh]);

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack bgColor={colors.shark} borderRadius="xl" p="4" space="4" w="full">
        <Input
          placeholder="Question"
          inputProps={{value: question, onChangeText: setQuestion}}
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

export default AddQuestionModal;
