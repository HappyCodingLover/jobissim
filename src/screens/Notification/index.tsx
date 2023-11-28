import {Box, FlatList, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getNotifications} from 'api';
import {HeaderBar} from 'components';
import {colors} from 'config';
import {TNotification} from 'types';
import {notificationF} from 'utils';

import {Notificationitem} from './atoms';

const Notification: FC = () => {
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getNotifications({});

        setNotifications(res.data.map(notificationF));
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TNotification; index: number}) => {
      return <Notificationitem key={index} notification={item} />;
    },
    [],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <Stack flex={1} px="5">
        <FlatList data={notifications} flex={1} renderItem={renderItem} />
      </Stack>
    </Box>
  );
};

export default Notification;
