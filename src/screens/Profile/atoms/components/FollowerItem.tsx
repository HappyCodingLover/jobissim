import {Avatar, HStack} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import Toast from 'react-native-toast-message';

import {follow} from 'api';
import {Button, Text} from 'components';
import {env} from 'config';
import {TFollowUser} from 'types';
import {getInitial, reduceString} from 'utils';

type TProps = {
  user: TFollowUser;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
};

const FollowerItem: FC<TProps> = ({user, setIsRefresh}) => {
  const handleFollow = useCallback(async () => {
    try {
      await follow({id: user.id});

      setIsRefresh(true);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [user, setIsRefresh]);

  return (
    <HStack alignItems="center" justifyContent="space-between" my="2">
      <HStack alignItems="center" space="3">
        <Avatar
          bgColor="transparent"
          borderColor="white"
          borderWidth="2"
          source={{
            uri: `${env.uploadFileUrl}/avatars/${user.avatar}`,
          }}>
          {getInitial(user?.username || '')}
        </Avatar>
        <Text>{reduceString(user?.username || '', 15)}</Text>
      </HStack>
      <Button px="3" title="Se désabonner" onPress={handleFollow} />
    </HStack>
  );
};

export default FollowerItem;
