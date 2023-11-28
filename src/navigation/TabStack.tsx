import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';

import {TabBar} from 'components';
import {Home, Message, Profile, SearchPage} from 'screens';
import {TTabStackParamList} from 'types';

const Tab = createBottomTabNavigator<TTabStackParamList>();

const TabStack: FC = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} tabBar={TabBar}>
      <Tab.Screen component={Home} name="home" />
      <Tab.Screen component={Message} name="message" />
      <Tab.Screen component={Profile} name="profile" />
      <Tab.Screen component={SearchPage} name="search" />
    </Tab.Navigator>
  );
};

export default TabStack;
