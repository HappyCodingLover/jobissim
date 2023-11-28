import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Checkbox, HStack, Icon, Modal, Pressable, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useWindowDimensions} from 'react-native';
import {moveFile} from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Carousel from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {createCandidacy, getCVVideos} from 'api';
import {Button, Input, Text, Video} from 'components';
import {colors, env} from 'config';
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TFile, TRootStackParamList, TVideo} from 'types';
import {
  convertMovToMp4,
  makeDirectory,
  normalize,
  videoF,
  withoutExtension,
} from 'utils';

import {VideoItem} from './atoms';

type TProps = {
  isOpen: boolean;
  videoId: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ApplyModal: FC<TProps> = ({isOpen, videoId, setIsOpen}) => {
  const {user} = useAppSelector(getAuthState);
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const {width} = useWindowDimensions();

  const [comment, setComment] = useState('');
  const [selectedCheck, setSelectedCheck] = useState('option1');
  const [selectedVideoId, setSelectedVideoId] = useState(-1);
  const [video, setVideo] = useState<TFile | null>(null);
  const [videos, setVideos] = useState<Array<TVideo | null>>([null]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getCVVideos({id: user?.id || -1});

        setVideos([res.data.map(videoF), null].flat());
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
    };

    initData();
  }, [user?.id]);

  const handleApply = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('comment', comment);
      if (video) {
        formData.append('file', video);
      }
      if (selectedVideoId) {
        formData.append('cvVideo', selectedVideoId);
      }

      await createCandidacy({data: formData, id: videoId});
      handleClose();
    } catch (error) {
      Toast.show({text1: JSON.stringify(error), type: 'error'});
    }
  }, [comment, selectedVideoId, video, videoId]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleImportVideo = useCallback(async () => {
    if (video) {
      setVideo(null);
      return;
    }
    try {
      const res = await launchImageLibrary({
        includeBase64: true,
        mediaType: 'video',
      });

      if (res && res.assets) {
        await makeDirectory(env.recordVideoFilePath);

        const video = res.assets[0];
        const videoNameList = (video.fileName || '').split('/');
        const fileName = videoNameList[videoNameList.length - 1];
        const match = withoutExtension.exec(fileName);

        let videoName = '';

        if (match) {
          videoName = `.${match[1]}.mp4`;
          const extension = match[0].substring(match[1].length + 1);
          if (extension === 'mov') {
            await convertMovToMp4(
              fileName,
              `${env.recordVideoFilePath}/${videoName}`,
            );
          }
        } else {
          videoName = `.${fileName}.mp4`;
          await moveFile(fileName, `${env.recordVideoFilePath}/${videoName}`);
        }

        setVideo({
          name: videoName,
          type: 'video/mp4',
          uri: `file://${env.recordVideoFilePath}/${videoName}`,
        });
      }
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [video]);

  const handleOption1 = useCallback(() => {
    setSelectedCheck('option1');
  }, []);

  const handleOption2 = useCallback(() => {
    setSelectedCheck('option2');
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TVideo | null; index: number}) => {
      return (
        <VideoItem
          key={index}
          selectedVideoId={selectedVideoId}
          video={item}
          navigate={navigate}
          setSelectedVideoId={setSelectedVideoId}
        />
      );
    },
    [selectedVideoId, navigate],
  );

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack
        bg={colors.shark}
        px={normalize(20)}
        py={normalize(10)}
        rounded="xl"
        w="full">
        <KeyboardAwareScrollView
          enableOnAndroid
          showsVerticalScrollIndicator={false}>
          <Stack flex={1} space={normalize(10)}>
            <Stack alignItems="center">
              <Text fontSize={normalize(22)} fontWeight="bold">
                Postuler
              </Text>
              <Text>Déposer sa candidature</Text>
            </Stack>
            <Stack space="2">
              <Checkbox
                borderWidth="0"
                isChecked={selectedCheck === 'option1'}
                value="option1"
                _text={{color: 'white'}}
                onChange={handleOption1}>
                Option 1
              </Checkbox>
              <Carousel
                activeSlideAlignment="start"
                data={videos}
                inactiveSlideScale={1}
                itemWidth={100}
                sliderWidth={width}
                renderItem={renderItem}
              />
            </Stack>
            <Stack space="2">
              <Checkbox
                borderWidth="0"
                isChecked={selectedCheck === 'option2'}
                value="option2"
                _text={{color: 'white'}}
                onChange={handleOption2}>
                Option 2
              </Checkbox>
              <Pressable
                alignItems="center"
                borderColor={colors.grayFrench}
                borderStyle="dashed"
                borderWidth="1"
                disabled={selectedCheck !== 'option2'}
                h={normalize(150)}
                justifyContent="center"
                rounded="md"
                w="full"
                _pressed={{opacity: 0.5}}
                onPress={handleImportVideo}>
                {video ? (
                  <Video h="full" image="" video={video.uri} />
                ) : (
                  <>
                    <Icon
                      as={AntDesign}
                      color={colors.grayCharade}
                      name="pluscircle"
                      size={normalize(24)}
                    />
                    <Text>Ajouter une video</Text>
                  </>
                )}
              </Pressable>
            </Stack>
            <Input
              h={normalize(150)}
              placeholder="Commentaire"
              inputProps={{
                multiline: true,
                numberOfLines: 4,
                textAlignVertical: 'top',
                onChangeText: setComment,
              }}
            />
            <HStack space="2" w="full">
              <Button
                flex={1}
                title="Annuler"
                type="outline"
                onPress={handleClose}
              />
              <Button flex={1} title="Envoyer" onPress={handleApply} />
            </HStack>
          </Stack>
        </KeyboardAwareScrollView>
      </Stack>
    </Modal>
  );
};

export default ApplyModal;
