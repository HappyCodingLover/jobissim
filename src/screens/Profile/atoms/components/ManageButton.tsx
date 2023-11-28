import {HStack, IPressableProps, Icon, Pressable} from 'native-base';
import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {Text} from 'components';
import {colors} from 'config';
import {normalize} from 'utils';

type TProps = IPressableProps & {
  icon: JSX.Element;
  title: string;
};

const ManageButton: FC<TProps> = ({icon, title, ...rest}) => {
  return (
    <Pressable _pressed={{opacity: 0.5}} {...rest}>
      <HStack
        alignItems="center"
        bgColor={colors.sharkDark}
        justifyContent="space-between"
        px="3"
        py="2"
        rounded="md">
        <HStack alignItems="center" space="2">
          {icon}
          <Text fontSize={normalize(20)}>{title}</Text>
        </HStack>
        <Icon
          as={Feather}
          color="white"
          name="chevron-right"
          size={normalize(20)}
        />
      </HStack>
    </Pressable>
  );
};

export default ManageButton;
