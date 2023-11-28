import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';

import {
  AssembleVideo,
  BlockUser,
  BusinessProfile,
  ChangePassword,
  ChatRoom,
  CheckRecordVideo,
  Notification,
  PersonalInfo,
  PlayVideo,
  RecordVideo,
  Search,
  SelectMusic,
  SelectQuestion,
  SelectTheme,
  SelectVideoPublishType,
  Settings,
  TendencyView,
  TermsAndPolicy,
  UserProfile,
  VideoView,
} from 'screens';
import {TMainStackParamList} from 'types';

import TabStack from './TabStack';

const Stack = createStackNavigator<TMainStackParamList>();

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="tab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={AssembleVideo} name="assembleVideo" />
      <Stack.Screen component={BlockUser} name="blockUser" />
      <Stack.Screen component={BusinessProfile} name="businessProfile" />
      <Stack.Screen component={ChangePassword} name="changePassword" />
      <Stack.Screen component={ChatRoom} name="chatRoom" />
      <Stack.Screen component={CheckRecordVideo} name="checkRecordVideo" />
      <Stack.Screen component={Notification} name="notification" />
      <Stack.Screen component={PersonalInfo} name="personalInfo" />
      <Stack.Screen component={PlayVideo} name="playVideo" />
      <Stack.Screen component={RecordVideo} name="recordVideo" />
      <Stack.Screen component={Search} name="search" />
      <Stack.Screen component={SelectMusic} name="selectMusic" />
      <Stack.Screen component={SelectQuestion} name="selectQuestion" />
      <Stack.Screen component={SelectTheme} name="selectTheme" />
      <Stack.Screen
        component={SelectVideoPublishType}
        name="selectVideoPublishType"
      />
      <Stack.Screen component={Settings} name="settings" />
      <Stack.Screen component={TabStack} name="tab" />
      <Stack.Screen component={TendencyView} name="tendencyView" />
      <Stack.Screen component={TermsAndPolicy} name="terms" />
      <Stack.Screen component={UserProfile} name="userProfile" />
      <Stack.Screen component={VideoView} name="videoView" />
    </Stack.Navigator>
  );
};

export default MainStack;
