import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, FlatList, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useState} from 'react';
import Toast from 'react-native-toast-message';

import {Button, HeaderBar, Text} from 'components';
import {colors, env} from 'config';
import {useAppSelector} from 'hooks';
import {getVideoState} from 'store';
import {TRootStackParamList, TSubVideo} from 'types';
import {
  addMark,
  addMusic,
  generateVideoFromImageAndMusic,
  mergeVideo,
  normalize,
} from 'utils';

import {VideoItem} from './atoms';

const CheckRecordVideo: FC = () => {
  const {music, subVideos} = useAppSelector(getVideoState);
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);

  const handleGoAssemble = useCallback(async () => {
    setIsLoading(true);
    try {
      const videoPaths: string[] = [];
      for (let i = 0; i < subVideos.length; i++) {
        const videoName = `${
          env.recordVideoFilePath
        }/.${new Date().getTime()}.mov`;
        await generateVideoFromImageAndMusic(
          subVideos[i].transitionImagePath,
          videoName,
        );

        const mergedVideoName = `${
          env.recordVideoFilePath
        }/.${new Date().getTime()}.mov`;

        await mergeVideo([videoName, subVideos[i].path], mergedVideoName);

        const subVideoName = `${
          env.recordVideoFilePath
        }/.${new Date().getTime()}.mov`;

        if (music) {
          await addMusic(mergedVideoName, subVideoName);
        }

        videoPaths.push(music ? subVideoName : mergedVideoName);
      }

      const mergedVideoName = `${
        env.recordVideoFilePath
      }/.${new Date().getTime()}.mov`;
      await mergeVideo(videoPaths, mergedVideoName);

      const videoName = `${
        env.recordVideoFilePath
      }/.${new Date().getTime()}.mov`;
      await addMark(mergedVideoName, videoName);

      navigate('main', {params: {url: videoName}, screen: 'assembleVideo'});
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
    setIsLoading(false);
  }, [music, subVideos, navigate]);

  const renderItem = useCallback(
    ({item, index}: {item: TSubVideo; index: number}) => {
      return <VideoItem key={index} subVideo={item} />;
    },
    [],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <Stack flex={1} px="5" py="3" space="4">
        <Text
          color={colors.blueCornFlower}
          fontSize={normalize(37)}
          fontWeight="bold">
          Enregistrement
        </Text>
        <Text color="white" fontSize={normalize(20)}>
          Pour visionner une séquence, cliquez sur l’icône « oeil ».
        </Text>
        <Text color="white" fontSize={normalize(20)}>
          Pour la modifier, cliquez sur l’icône « crayon ».
        </Text>
        <Text color="white" fontSize={normalize(25)} fontWeight="bold">
          Mes questions
        </Text>
        <FlatList data={subVideos} renderItem={renderItem} />
        <Button
          isLoading={isLoading}
          title="Assembler"
          onPress={handleGoAssemble}
        />
      </Stack>
    </Box>
  );
};

export default CheckRecordVideo;
