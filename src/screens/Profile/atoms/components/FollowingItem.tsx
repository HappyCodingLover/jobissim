import {Avatar, HStack} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {follow, isFollowed} from 'api';
import {Button, Text} from 'components';
import {env} from 'config';
import {TFollowUser} from 'types';
import {getInitial, reduceString} from 'utils';

type TProps = {user: TFollowUser};

const FollowingItem: FC<TProps> = ({user}) => {
  const [isFollowedByUser, setIsFollowedByUser] = useState(false);
  const [isRefresh, setIsRefresh] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await isFollowed({id: user.id});

        setIsFollowedByUser(res.data.isFollowed);
        setIsRefresh(false);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
  }, [isRefresh, user]);

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
  }, [user]);

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
      <Button
        px="3"
        title={isFollowedByUser ? 'Se désabonner' : "S'abonner"}
        onPress={handleFollow}
      />
    </HStack>
  );
};

export default FollowingItem;
