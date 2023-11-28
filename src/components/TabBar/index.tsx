import MaskedView from '@react-native-masked-view/masked-view';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Box, HStack, Pressable, Stack} from 'native-base';
import React, {FC} from 'react';
import {Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from 'config';

import {
  CreateRecordIcon,
  SmartHomeHouseActiveIcon,
  SmartHomeHouseInActiveIcon,
  SmartHomeMessageActiveIcon,
  SmartHomeMessageInActiveIcon,
  SmartHomeSearchActiveIcon,
  SmartHomeSearchInActiveIcon,
  UserCircleActiveIcon,
  UserCircleInActiveIcon,
} from '../Icons';
import Text from '../Text';

type TProps = BottomTabBarProps & {};

const TabBar: FC<TProps> = ({state, navigation}) => {
  const {navigate} = navigation;

  const handlePressCreateVideo = () => {
    navigate('selectVideoPublishType');
  };

  const handlePressHome = () => {
    navigate('home');
  };

  const handlePressMessage = () => {
    navigate('message');
  };

  const handlePressProfile = () => {
    navigate('profile');
  };

  const handlePressSearch = () => {
    navigate('search');
  };

  return (
    <Stack bgColor={colors.shark}>
      <HStack
        alignItems="center"
        bgColor={colors.grayCharade}
        h="20"
        justifyContent="space-around"
        px="3">
        <Pressable onPress={handlePressHome}>
          <Stack alignItems="center">
            {state.index === 0 ? (
              <SmartHomeHouseActiveIcon h={30} w={30} />
            ) : (
              <SmartHomeHouseInActiveIcon
                color={colors.grayDusty}
                h={30}
                w={30}
              />
            )}
            <Text
              color={
                state.index === 0 ? colors.blueCornFlower : colors.grayDusty
              }>
              Accueil
            </Text>
          </Stack>
        </Pressable>
        <Pressable onPress={handlePressSearch}>
          <Stack alignItems="center">
            {state.index === 3 ? (
              <SmartHomeSearchActiveIcon h={30} w={30} />
            ) : (
              <SmartHomeSearchInActiveIcon
                color={colors.grayDusty}
                h={30}
                w={30}
              />
            )}
            <Text
              color={
                state.index === 3 ? colors.blueCornFlower : colors.grayDusty
              }>
              Rechercher
            </Text>
          </Stack>
        </Pressable>
        <Pressable onPress={handlePressCreateVideo}>
          <MaskedView
            maskElement={
              <Box
                alignItems="center"
                bgColor="transparent"
                height="55px"
                justifyContent="center">
                <CreateRecordIcon />
              </Box>
            }
            style={{flexDirection: 'row', height: 55, width: 55}}>
            <LinearGradient
              colors={[colors.blueCornFlower, colors.purple]}
              end={{x: 1, y: 0}}
              start={{x: 0, y: 0}}
              style={{flex: 1}}
            />
          </MaskedView>
        </Pressable>
        <Pressable onPress={handlePressMessage}>
          <Stack alignItems="center">
            {state.index === 1 ? (
              <SmartHomeMessageActiveIcon h={30} w={30} />
            ) : (
              <SmartHomeMessageInActiveIcon
                color={colors.grayDusty}
                h={30}
                w={30}
              />
            )}
            <Text
              color={
                state.index === 1 ? colors.blueCornFlower : colors.grayDusty
              }>
              Message
            </Text>
          </Stack>
        </Pressable>
        <Pressable onPress={handlePressProfile}>
          <Stack alignItems="center">
            {state.index === 2 ? (
              <UserCircleActiveIcon h={30} w={30} />
            ) : (
              <UserCircleInActiveIcon color={colors.grayDusty} h={30} w={30} />
            )}
            <Text
              color={
                state.index === 2 ? colors.blueCornFlower : colors.grayDusty
              }>
              Compte
            </Text>
          </Stack>
        </Pressable>
      </HStack>
    </Stack>
  );
};

export default TabBar;
