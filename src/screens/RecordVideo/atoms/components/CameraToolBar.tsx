import {HStack, Icon, IconButton, Pressable, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {useWindowDimensions} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ColorEffectIcon, Text} from 'components';
import {colors, env} from 'config';
import {normalize} from 'utils';
import {TTheme} from 'types';

type TProps = {
  isRecording: boolean;
  recordSeconds: number;
  theme: TTheme | null;
  handleCloseFilter: () => void;
  handleEndRecord: () => void;
  handleStartRecord: () => void;
  handleToogleCamera: () => void;
  handleUseFilter: () => void;
  setImageUrl: Dispatch<SetStateAction<string>>;
};

const CameraToolBar: FC<TProps> = ({
  isRecording,
  recordSeconds,
  theme,
  handleCloseFilter,
  handleEndRecord,
  handleStartRecord,
  handleToogleCamera,
  handleUseFilter,
  setImageUrl,
}) => {
  const {width} = useWindowDimensions();

  const [isShowMagicBar, setIsShowMagicBar] = useState(false);

  const getTimeFromSeconds = useCallback((recordSeconds: number) => {
    const minutes = Math.floor((recordSeconds / 60) % 60);
    const seconds = Math.floor(recordSeconds % 60);
    const hours = Math.floor(recordSeconds / 60 / 60);

    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formatHours = hours < 10 ? `0${hours}` : `${hours}`;

    let timers = '';

    if (recordSeconds >= 3600) {
      timers = `${formatHours} : `;
    }

    return `${timers}${formatMinutes} : ${formatSeconds}`;
  }, []);

  const handleCloseTheme = useCallback(() => {
    setIsShowMagicBar(false);
    handleCloseFilter();
  }, [handleCloseFilter]);

  const handleMagicBar = useCallback(() => {
    setIsShowMagicBar(true);
  }, []);

  const handleUseLibrary = useCallback(async () => {
    setIsShowMagicBar(false);
    handleUseFilter();
    const res = await launchImageLibrary({mediaType: 'photo', quality: 0.1});
    if (res && res.assets) {
      const image = res.assets[0];

      setImageUrl(image?.uri || '');
    }
  }, [handleUseFilter, setImageUrl]);

  const handleUseTheme = useCallback(async () => {
    setIsShowMagicBar(false);
    handleUseFilter();
    setImageUrl(`${env.uploadFileUrl}/themes/${theme?.image || ''}`);
  }, [theme, handleUseFilter, setImageUrl]);

  return (
    <Stack marginTop="-10">
      {!isShowMagicBar && (
        <HStack alignItems="center" justifyContent="center" space="2">
          <Icon
            as={MaterialIcons}
            color={colors.redMonza}
            name="stop-circle"
            size={normalize(12)}
          />
          <Text fontSize={normalize(20)} lineHeight={normalize(20)}>
            {getTimeFromSeconds(recordSeconds)}
          </Text>
        </HStack>
      )}
      {!isShowMagicBar && (
        <HStack alignItems="center" justifyContent="center" space="3">
          {isRecording ? (
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: Ionicons,
                color: 'white',
                name: 'pause-circle',
                size: normalize(50),
              }}
              _pressed={{
                opacity: 0.5,
              }}
            />
          ) : (
            <Pressable
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handleMagicBar}>
              <ColorEffectIcon h={50} w={50} />
            </Pressable>
          )}
          {isRecording ? (
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: MaterialCommunityIcons,
                color: 'white',
                name: 'record-circle',
                size: normalize(100),
              }}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handleEndRecord}
            />
          ) : (
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: MaterialCommunityIcons,
                color: colors.redMonza,
                name: 'record',
                size: normalize(100),
              }}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handleStartRecord}
            />
          )}
          {isRecording ? (
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: Ionicons,
                color: 'white',
                name: 'stop-circle-sharp',
                size: normalize(50),
              }}
              _pressed={{
                opacity: 0.5,
              }}
            />
          ) : (
            <IconButton
              p="0"
              variant="unstyled"
              _icon={{
                as: Ionicons,
                color: 'white',
                name: 'camera-reverse-outline',
                size: normalize(50),
              }}
              _pressed={{
                opacity: 0.5,
              }}
              onPress={handleToogleCamera}
            />
          )}
        </HStack>
      )}
      {isShowMagicBar && (
        <HStack alignItems="center" justifyContent="center">
          <IconButton
            p="0"
            variant="unstyled"
            _icon={{
              as: Entypo,
              color: 'white',
              name: 'circle',
              size: normalize(75),
            }}
            _pressed={{
              opacity: 0.5,
            }}
            onPress={handleUseTheme}
          />
          <IconButton
            left={(width + 50) / 2}
            p="0"
            position="absolute"
            variant="unstyled"
            _icon={{
              as: Ionicons,
              color: 'white',
              name: 'caret-forward-circle-outline',
              size: normalize(60),
            }}
            _pressed={{
              opacity: 0.5,
            }}
            onPress={handleUseLibrary}
          />
          <IconButton
            left={(width + 145) / 2}
            p="0"
            position="absolute"
            variant="unstyled"
            _icon={{
              as: Ionicons,
              color: 'white',
              name: 'close-circle-outline',
              size: normalize(60),
            }}
            _pressed={{
              opacity: 0.5,
            }}
            onPress={handleCloseTheme}
          />
        </HStack>
      )}
    </Stack>
  );
};

export default CameraToolBar;
