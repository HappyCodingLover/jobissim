import {Box, HStack, IPressableProps, Pressable} from 'native-base';
import React, {FC} from 'react';

import {Text} from 'components';
import {colors} from 'config';
import {normalize} from 'utils';

type TProps = IPressableProps & {
  icon: JSX.Element;
  title: string;
};

const SelectPictureModalButton: FC<TProps> = ({icon, title, ...rest}) => {
  return (
    <Pressable _pressed={{opacity: 0.5}} {...rest}>
      <HStack alignItems="center" space="4">
        <Box bgColor={colors.grayCharade} p="3" rounded="full">
          {icon}
        </Box>
        <Text fontSize={normalize(20)}>{title}</Text>
      </HStack>
    </Pressable>
  );
};

export default SelectPictureModalButton;
