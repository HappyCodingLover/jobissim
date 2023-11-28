import {RouteProp, useRoute} from '@react-navigation/native';
import {Box, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';

import {SearchInput} from 'components';
import {colors} from 'config';
import {TMainStackParamList} from 'types';

import {HeaderBar, TabView} from './atoms';

const Search: FC = () => {
  const {params} = useRoute<RouteProp<TMainStackParamList, 'search'>>();

  const [currentTab, setCurrentTab] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    setFilterValue(params.filterValue);
  }, [params.filterValue]);

  const handleTabChange = useCallback((value: string) => {
    setCurrentTab(value);
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <Stack flex={1} px="5">
        <HeaderBar currentTab={currentTab} />
        <SearchInput value={filterValue} onChangeText={setFilterValue} />
        <TabView
          currentTab={currentTab}
          filterValue={filterValue}
          onChange={handleTabChange}
        />
      </Stack>
    </Box>
  );
};

export default Search;
