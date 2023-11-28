import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HStack, IconButton, Menu} from 'native-base';
import React, {FC, useCallback, useEffect} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {moveFile, unlink} from 'react-native-fs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {showEditor} from 'react-native-video-trim';

import {QuestionIcon, Text} from 'components';
import {colors} from 'config';
import {useAppDispatch} from 'hooks';
import {removeQuestion} from 'store';
import {TRootStackParamList, TSubVideo} from 'types';
import {normalize} from 'utils';

type TProps = {
  subVideo: TSubVideo;
};

const VideoItem: FC<TProps> = ({subVideo}) => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
    const subscription = eventEmitter.addListener('VideoTrim', async event => {
      try {
        switch (event.name) {
          case 'onFinishTrimming':
            await moveFile(event.outputPath, subVideo.path);
            await unlink(event.outputPath);
            break;
          default:
            return;
        }
      } catch (error) {}
    });

    return () => {
      subscription.remove();
    };
  }, [subVideo]);

  const handleEditVideo = useCallback(async () => {
    try {
      await showEditor(`file://${subVideo.path}`);
    } catch (error) {}
  }, [subVideo]);

  const handlePreviewVideo = useCallback(() => {
    navigate('main', {params: {url: subVideo.path}, screen: 'playVideo'});
  }, [subVideo, navigate]);

  const handleRemoveQuestion = useCallback(() => {
    dispatch(removeQuestion(subVideo.id));
  }, [subVideo, dispatch]);

  const handleReRecordVideo = useCallback(() => {
    navigate('main', {params: {id: subVideo.id}, screen: 'recordVideo'});
  }, [subVideo, navigate]);

  return (
    <HStack alignItems="center" justifyContent="space-between" my="1">
      <HStack alignItems="center" space="3" w="70%">
        <QuestionIcon />
        <Text fontSize={normalize(18)}>{subVideo.title}</Text>
      </HStack>
      <HStack alignItems="center" space="3" w="10%">
        <Menu
          bgColor={colors.sharkDark}
          placement="bottom"
          trigger={props => (
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: Entypo,
                color: colors.purple,
                name: 'dots-three-vertical',
                size: normalize(30),
              }}
              _pressed={{
                opacity: 0.5,
              }}
              {...props}
            />
          )}>
          <Menu.Item width="12">
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: AntDesign,
                color: colors.purple,
                name: 'eye',
                size: normalize(30),
              }}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handlePreviewVideo}
            />
          </Menu.Item>
          <Menu.Item width="12">
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: Entypo,
                color: colors.purple,
                name: 'edit',
                size: normalize(28),
              }}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handleEditVideo}
            />
          </Menu.Item>
          <Menu.Item width="12">
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: MaterialIcons,
                color: colors.purple,
                name: 'replay',
                size: normalize(28),
              }}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handleReRecordVideo}
            />
          </Menu.Item>
          <Menu.Item width="12">
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: FontAwesome5,
                color: colors.purple,
                name: 'trash-alt',
                size: normalize(28),
              }}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handleRemoveQuestion}
            />
          </Menu.Item>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default VideoItem;
