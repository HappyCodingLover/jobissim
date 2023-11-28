import {HStack, Modal, Stack} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';

import {Button, Text} from 'components';
import {colors} from 'config';
import {useAuth} from 'hooks';
import {normalize} from 'utils';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SignOutModal: FC<TProps> = ({isOpen, setIsOpen}) => {
  const {handleSignOut} = useAuth();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSignOutUser = useCallback(() => {
    handleSignOut();
    setIsOpen(false);
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
          Déconnexion
        </Text>
        <Text color="white" fontSize={normalize(20)} textAlign="center">
          Êtes-vous sûr ?
        </Text>
        <HStack space="2">
          <Button flex={1} title="Non" type="outline" onPress={handleClose} />
          <Button flex={1} title="Oui" onPress={handleSignOutUser} />
        </HStack>
      </Stack>
    </Modal>
  );
};

export default SignOutModal;
