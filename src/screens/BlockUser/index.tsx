import {Box, FlatList, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';

import {getBlockUsers} from 'api';
import {HeaderBar} from 'components';
import {colors} from 'config';
import {TUser} from 'types';
import {userF} from 'utils';

import {BlockUserItem} from './atoms';

const BlockUser: FC = () => {
  const [blockedUsers, setBlockedUsers] = useState<TUser[]>([]);
  const [isRefresh, setIsRefresh] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const res = await getBlockUsers();

      setBlockedUsers(res.data.map(userF));
      setIsRefresh(false);
    };

    if (isRefresh) initData();
  }, [isRefresh]);

  const renderItem = useCallback(
    ({item, index}: {item: TUser; index: number}) => {
      return (
        <BlockUserItem key={index} user={item} setIsRefresh={setIsRefresh} />
      );
    },
    [],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <Stack px="5" py="5">
        <FlatList data={blockedUsers} renderItem={renderItem} />
      </Stack>
    </Box>
  );
};

export default BlockUser;
