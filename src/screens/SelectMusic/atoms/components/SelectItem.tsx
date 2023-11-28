import {HStack, Icon, Image, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';
import SoundPlayer from 'react-native-sound-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Text} from 'components';
import {colors} from 'config';
import {useAppDispatch} from 'hooks';
import {setMusic} from 'store';
import {TMusic} from 'types';
import {normalize} from 'utils';

type TProps = {
  isSelected: boolean;
  music: TMusic;
};

const SelectItem: FC<TProps> = ({isSelected, music}) => {
  const dispatch = useAppDispatch();

  const handleSelectItem = useCallback(() => {
    // SoundPlayer.stop();
    SoundPlayer.playUrl(music.music);
    dispatch(setMusic(music));
  }, [dispatch]);

  return (
    <Pressable my="1" _pressed={{opacity: 0.5}} onPress={handleSelectItem}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space="3">
          <Image
            alt="music-logo"
            h={75}
            source={require('assets/images/mp3.png')}
            w={75}
          />
          <Text fontSize={normalize(18)}>{music.title}</Text>
        </HStack>
        <Icon
          as={Ionicons}
          color={isSelected ? colors.blueCornFlower : colors.grayDusty}
          name={isSelected ? 'radio-button-on' : 'radio-button-off'}
          size={normalize(22)}
        />
      </HStack>
    </Pressable>
  );
};

export default SelectItem;
