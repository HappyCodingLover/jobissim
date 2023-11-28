import {Box, FlatList, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getAllMessages} from 'api';
import {AddUserIcon, Button, SearchInput, Text} from 'components';
import {colors} from 'config';
import {useModal} from 'hooks';
import {TMessageByUser} from 'types';
import {messageByUserF, normalize} from 'utils';

import {ContactsModal, MessageListItem} from './atoms';

const Message: FC = () => {
  const contactsModal = useModal();

  const [messageByUsers, setMessageByUsers] = useState<TMessageByUser[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getAllMessages();

        setMessageByUsers(res.data.map(messageByUserF));
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
    };

    initData();
  }, []);

  const handleOpenContactsModal = useCallback(() => {
    contactsModal.setIsOpen(true);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TMessageByUser; index: number}) => {
      return <MessageListItem key={index} messageUser={item} />;
    },
    [],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <Stack flex={1} px="5" py="5" space="5">
        <Stack space="1">
          <Text fontSize={normalize(20)}>Messages</Text>
          <Text color={colors.grayFrench}>Discuter avec vos contacts</Text>
        </Stack>
        <SearchInput placeholder="Filtrer les conversations" />
        <Button
          leftIcon={<AddUserIcon w={20} />}
          px="10"
          title="Nouvelle conversation"
          onPress={handleOpenContactsModal}
        />
        <FlatList
          data={messageByUsers}
          flex={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </Stack>
      <ContactsModal {...contactsModal} />
    </Box>
  );
};

export default Message;
