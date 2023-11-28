import {
  HStack,
  IPressableProps,
  IStackProps,
  ITextProps,
  Pressable,
  Text,
} from 'native-base';
import React, {FC} from 'react';

import {colors} from 'config';
import {normalize} from 'utils';

type TProps = IPressableProps & {
  leftIcon?: JSX.Element;
  title: string;
  linkProps?: IStackProps;
  titleProps?: ITextProps;
};

const Link: FC<TProps> = ({
  color = colors.blueCornFlower,
  fontSize = normalize(20),
  title,
  leftIcon,
  linkProps,
  titleProps,
  ...rest
}) => {
  return (
    <HStack {...linkProps}>
      <Pressable _pressed={{opacity: 0.5}} {...rest}>
        <HStack alignItems="center" space="1">
          {leftIcon && leftIcon}
          <Text color={color} fontSize={fontSize} {...titleProps}>
            {title}
          </Text>
        </HStack>
      </Pressable>
    </HStack>
  );
};

export default Link;
