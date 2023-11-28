import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Box, HStack, Image, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Platform, useWindowDimensions} from 'react-native';
import DeepAR, {
  Camera,
  CameraPositions,
  IDeepARHandle,
  TextureSourceTypes,
} from 'react-native-deepar';
import {downloadFile, moveFile, writeFile} from 'react-native-fs';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';

import {HeaderBar, QuestionIcon, Text} from 'components';
import {colors, env} from 'config';
import {useAppDispatch, useAppSelector} from 'hooks';
import {addSubTitle, addSubVideo, getVideoState, setIsLoading} from 'store';
import {TMainStackParamList, TQuestion, TRootStackParamList} from 'types';
import {getXResolution, getYResolution, makeDirectory, normalize} from 'utils';

import {CameraToolBar} from './atoms';

const RecordVideo: FC = () => {
  const dispatch = useAppDispatch();
  const {music, questionList, theme} = useAppSelector(getVideoState);
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();
  const deepAR = useRef<IDeepARHandle>(null);
  const questionViewShot = useRef<ViewShot>(null);
  const timer = useRef(-1);
  const {params} = useRoute<RouteProp<TMainStackParamList, 'recordVideo'>>();
  const {height} = useWindowDimensions();

  const [cameraType, setCameraType] = useState(CameraPositions.FRONT);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [isFilter, setIsFilter] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [recordSeconds, setRecordSeconds] = useState(0);

  useEffect(() => {
    const initData = async () => {
      await Camera.getCameraPermissionStatus();
      await Camera.getMicrophonePermissionStatus();
    };

    initData();
  }, []);

  useEffect(() => {
    if (!params?.id) return;

    setCurrentQuestionIndex(
      questionList.findIndex(
        (question: TQuestion) => question.id === params.id,
      ),
    );
    setIsShowQuestion(true);
  }, [params?.id, questionList]);

  useEffect(() => {
    deepAR.current?.switchEffect({
      mask: isFilter ? 'background_segmentation' : 'default',
      slot: 'effect',
    });
  }, [isFilter]);

  useEffect(() => {
    const initData = async () => {
      const res = await RNFetchBlob.config({}).fetch('GET', imageUrl);
      deepAR.current?.changeParameterTexture({
        component: 'MeshRenderer',
        gameObject: 'Background',
        parameter: 's_texColor',
        type: TextureSourceTypes.BASE64,
        value: res.base64(),
      });
    };

    initData();
  }, [imageUrl]);

  const handleCaptureTitle = useCallback(async () => {
    if (!questionViewShot.current) return;

    try {
      const uri =
        (questionViewShot.current?.capture &&
          (await questionViewShot.current?.capture())) ||
        '';

      await makeDirectory(env.recordVideoFilePath);

      await writeFile(`${env.recordVideoFilePath}/background.mp3`, '', 'utf8');

      await downloadFile({
        fromUrl: `${env.uploadFileUrl}/musics/${music?.music || ''}`,
        toFile: `${env.recordVideoFilePath}/background.mp3`,
      });

      dispatch(
        addSubTitle({
          id: questionList[currentQuestionIndex].id,
          needTranspose: questionList[currentQuestionIndex].needTranspose,
          path: questionList[currentQuestionIndex].path,
          title: questionList[currentQuestionIndex].title,
          transitionImagePath: uri,
          transitionMusicPath: music?.music || '',
          transitionPath: '',
        }),
      );
      setIsShowQuestion(false);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [currentQuestionIndex, music, questionList, questionViewShot, dispatch]);

  const handleCloseFilter = useCallback(() => {
    setIsFilter(false);
  }, []);

  const handleEndRecord = useCallback(async () => {
    if (!deepAR.current) return;
    deepAR.current.finishRecording();
  }, [deepAR.current]);

  const handleStartRecord = useCallback(async () => {
    if (!deepAR.current) return;

    setIsRecording(true);
    setRecordSeconds(0);

    timer.current = setInterval(() => {
      setRecordSeconds(_recordSeconds => _recordSeconds + 1);
    }, 1000);

    try {
      await requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);

      deepAR.current.startRecording({
        height: getYResolution(),
        width: getXResolution(),
      });
    } catch (error) {
      setIsRecording(false);
      setRecordSeconds(0);

      clearInterval(timer.current);

      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [
    cameraType,
    currentQuestionIndex,
    deepAR.current,
    questionList,
    dispatch,
  ]);

  const handleToogleCamera = useCallback(() => {
    setCameraType(_cameraType =>
      _cameraType === CameraPositions.FRONT
        ? CameraPositions.BACK
        : CameraPositions.FRONT,
    );
  }, []);

  const handleUseFilter = useCallback(() => {
    setIsFilter(true);
  }, []);

  const onVideoRecordingFinished = useCallback(
    async (path: string) => {
      dispatch(setIsLoading(true));
      clearInterval(timer.current);
      setIsRecording(false);
      setRecordSeconds(0);
      try {
        await requestMultiple([
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]);
        await makeDirectory(env.recordVideoFilePath);

        const videoName = new Date().getTime();
        const videoPath =
          Platform.OS === 'ios'
            ? `${env.recordVideoFilePath}/.uniformized-record-${videoName}.mov`
            : `${env.recordVideoFilePath}/.${videoName}.mov`;

        await moveFile(path, videoPath);

        dispatch(
          addSubVideo({
            id: questionList[currentQuestionIndex].id,
            needTranspose: cameraType === 'front' ? true : false,
            path: videoPath,
            title: questionList[currentQuestionIndex].title,
            transposePath: '',
          }),
        );
        if (currentQuestionIndex === questionList.length - 1 || params?.id) {
          navigate('main', {screen: 'checkRecordVideo'});
        } else {
          setCurrentQuestionIndex(
            _currentQuestionIndex => _currentQuestionIndex + 1,
          );
          setIsShowQuestion(true);
        }
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
      dispatch(setIsLoading(false));
    },
    [cameraType, currentQuestionIndex, questionList, timer, dispatch, navigate],
  );

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      {isShowQuestion && (
        <ViewShot
          ref={questionViewShot}
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
          }}>
          <Image
            alt="theme-logo"
            h="full"
            position="absolute"
            resizeMode="stretch"
            source={{uri: `${env.uploadFileUrl}/themes/${theme?.image}`}}
            w="full"
            onLoadEnd={handleCaptureTitle}
          />
          <Text fontSize={normalize(25)}>
            {questionList[currentQuestionIndex].title}
          </Text>
        </ViewShot>
      )}
      <Stack display={isShowQuestion ? 'none' : 'flex'}>
        <HeaderBar />
        <Stack px="2" space="2">
          <Text textAlign="center">
            {currentQuestionIndex + 1}/{questionList.length}
          </Text>
          <HStack alignItems="center" justifyContent="center" space="3">
            <QuestionIcon />
            <Text fontSize={normalize(18)}>
              {questionList[currentQuestionIndex].title}
            </Text>
          </HStack>
          <DeepAR
            apiKey={
              Platform.OS === 'android'
                ? env.deepARAndroidKey
                : env.deepARiOSKey
            }
            position={cameraType}
            ref={deepAR}
            style={{height: height - 250, left: -4}}
            onVideoRecordingFinished={onVideoRecordingFinished}
          />
          <CameraToolBar
            isRecording={isRecording}
            recordSeconds={recordSeconds}
            theme={theme}
            handleCloseFilter={handleCloseFilter}
            handleEndRecord={handleEndRecord}
            handleStartRecord={handleStartRecord}
            handleToogleCamera={handleToogleCamera}
            handleUseFilter={handleUseFilter}
            setImageUrl={setImageUrl}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default RecordVideo;
