import {HStack, Modal, Stack} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import Toast from 'react-native-toast-message';

import {deleteAccount} from 'api';
import {Button, Text} from 'components';
import {colors} from 'config';
import {useAuth} from 'hooks';
import {normalize} from 'utils';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteUserModal: FC<TProps> = ({isOpen, setIsOpen}) => {
  const {handleSignOut} = useAuth();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDeleteAccount = useCallback(async () => {
    try {
      await deleteAccount();
      await handleSignOut();
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
      <Stack
        alignItems="center"
        bg={colors.shark}
        p="3"
        rounded="xl"
        space={normalize(10)}
        w="full">
        <Text bold color="white" fontSize={normalize(28)}>
          Supprimer mon compte
        </Text>
        <Text color="white" fontSize={normalize(20)} textAlign="center">
          Voulez-vous vraiment supprimer votre compte ? (Cette action est
          définitive)
        </Text>
        <HStack space="2">
          <Button flex={1} title="Non" type="outline" onPress={handleClose} />
          <Button flex={1} title="Oui" onPress={handleDeleteAccount} />
        </HStack>
      </Stack>
    </Modal>
  );
};

export default DeleteUserModal;
