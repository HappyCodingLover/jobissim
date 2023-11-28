import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Avatar, HStack, Pressable, Stack} from 'native-base';
import React, {FC, useCallback, useMemo} from 'react';

import {Text} from 'components';
import {env} from 'config';
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TMessageByUser, TRootStackParamList} from 'types';
import {
  formatMessage,
  formatTime,
  getInitial,
  normalizeMessagingData,
} from 'utils';

type TProps = {
  messageUser: TMessageByUser;
};

const MessageListItem: FC<TProps> = ({messageUser}) => {
  const {user} = useAppSelector(getAuthState);
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const partner = useMemo(
    () => normalizeMessagingData(messageUser, user?.id || -1),
    [messageUser, user],
  );

  const handleGoRoom = useCallback(() => {
    navigate('main', {
      params: {
        avatar: partner.contact.avatar,
        id: partner.id,
        fullName: partner.contact.fullName,
      },
      screen: 'chatRoom',
    });
  }, [navigate]);

  return (
    <Pressable my="2" _pressed={{opacity: 0.5}} onPress={handleGoRoom}>
      <HStack justifyContent="space-between">
        <HStack alignItems="center" space="2">
          <Avatar
            bgColor="transparent"
            borderColor="white"
            borderWidth="2"
            source={{
              uri: `${env.uploadFileUrl}/avatars/${
                partner.contact.avatar || ''
              }`,
            }}>
            {getInitial(partner.contact.fullName || '')}
          </Avatar>
          <Stack justifyContent="space-between">
            <Text>{partner.contact.fullName}</Text>
            <Text>
              {formatMessage(partner.lastMessage.content, partner.isAuthor)}
            </Text>
          </Stack>
        </HStack>
        <Text>{formatTime(partner.lastMessage.createdAt)}</Text>
      </HStack>
    </Pressable>
  );
};

export default MessageListItem;
