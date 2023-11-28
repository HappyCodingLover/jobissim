import {ScrollView, Stack} from 'native-base';
import React, {FC} from 'react';

import AllRoute from './AllRoute';
import CVRoute from './CVRoute';
import EnterpriseRoute from './EnterpriseRoute';
import JobRoute from './JobRoute';
import TabBar from './TabBar';
import UserRoute from './UserRoute';

type TProps = {
  currentTab: string;
  filterValue: string;
  onChange: (value: string) => void;
};

const TabView: FC<TProps> = ({currentTab, filterValue, onChange}) => {
  const handleTabChange = (value: string) => {
    onChange(value);
  };

  return (
    <Stack flex={1} space="2">
      <TabBar currentTab={currentTab} onChange={handleTabChange} />
      <ScrollView flex={1}>
        {currentTab === 'all' && <AllRoute filterValue={filterValue} />}
        {currentTab === 'cv' && <CVRoute filterValue={filterValue} />}
        {currentTab === 'enterprise' && (
          <EnterpriseRoute filterValue={filterValue} />
        )}
        {currentTab === 'job' && <JobRoute filterValue={filterValue} />}
        {currentTab === 'user' && <UserRoute filterValue={filterValue} />}
      </ScrollView>
    </Stack>
  );
};

export default TabView;
