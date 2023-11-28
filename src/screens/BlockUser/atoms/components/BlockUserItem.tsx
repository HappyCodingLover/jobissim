import {Avatar, HStack, Pressable} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import Toast from 'react-native-toast-message';

import {unblockUser} from 'api';
import {Text} from 'components';
import {env} from 'config';
import {TUser} from 'types';
import {getInitial} from 'utils';

type TProps = {
  user: TUser;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
};

const BlockUserItem: FC<TProps> = ({user, setIsRefresh}) => {
  const handleUnblockUser = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('id', user.id);

      await unblockUser(formData);

      setIsRefresh(true);
    } catch (error) {
      Toast.show({text1: JSON.stringify(error), type: 'error'});
    }
  }, [user, setIsRefresh]);

  return (
    <HStack alignItems="center" justifyContent="space-between" my="2">
      <HStack alignItems="center" space="4">
        <Avatar
          bgColor="transparent"
          borderColor="white"
          borderWidth="2"
          source={{
            uri: `${env.uploadFileUrl}/avatars/${user.avatar}`,
          }}>
          {getInitial(`${user.firstName} ${user.lastName}`)}
        </Avatar>
        <Text>{`${user.firstName} ${user.lastName}`}</Text>
      </HStack>
      <Pressable
        bgColor="white"
        rounded="full"
        px="2"
        py="1"
        _pressed={{opacity: 0.5}}
        onPress={handleUnblockUser}>
        <Text color="black">Débloquer</Text>
      </Pressable>
    </HStack>
  );
};

export default BlockUserItem;
