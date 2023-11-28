import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Box, Icon, Image, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import {colors, env} from 'config';
import {useAppDispatch} from 'hooks';
import {setTheme} from 'store';
import {TRootStackParamList, TTheme} from 'types';
import {normalize} from 'utils';

type TProps = {
  index: number;
  length: number;
  theme: TTheme;
  handleShowAddThemeModal: () => void;
};

const ThemeItem: FC<TProps> = ({
  index,
  length,
  theme,
  handleShowAddThemeModal,
}) => {
  const dispatch = useAppDispatch();
  const {navigate} = useNavigation<NavigationProp<TRootStackParamList>>();

  const handleSelectItem = useCallback(() => {
    if (index === 0) {
      handleShowAddThemeModal();
    } else {
      dispatch(setTheme(theme));
    }
  }, [index, length, dispatch, handleShowAddThemeModal, navigate]);

  return (
    <Pressable my="1" _pressed={{opacity: 0.5}} onPress={handleSelectItem}>
      {index === 0 ? (
        <Box
          alignItems="center"
          borderColor={colors.grayFrench}
          borderStyle="dashed"
          borderWidth="1"
          h={normalize(120)}
          justifyContent="center"
          rounded="md"
          w={normalize(100)}>
          <Icon as={Entypo} color={colors.grayFrench} name="image" size="lg" />
        </Box>
      ) : (
        <Image
          alt="theme-logo"
          h={normalize(120)}
          resizeMode="stretch"
          source={{uri: `${env.uploadFileUrl}/themes/${theme.image}`}}
          w={normalize(100)}
        />
      )}
    </Pressable>
  );
};

export default ThemeItem;
