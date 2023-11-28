import {
  Box,
  HStack,
  IPressableProps,
  ITextProps,
  Pressable,
  Spinner,
  Text,
} from 'native-base';
import React, {FC} from 'react';

import {colors} from 'config';
import {normalize} from 'utils';

type TProps = IPressableProps & {
  isLoading?: boolean;
  leftIcon?: JSX.Element;
  title?: string;
  type?: 'outline' | 'solid';
  titleProp?: ITextProps;
};

const Button: FC<TProps> = ({
  color,
  fontSize = normalize(20),
  isLoading = false,
  leftIcon,
  textAlign = 'left',
  title = '',
  type = 'solid',
  titleProp,
  ...props
}) => {
  return (
    <Pressable
      bg={type === 'outline' ? 'transparent' : colors.blueCornFlower}
      borderWidth={type === 'outline' ? 1 : 0}
      borderColor={colors.blueCornFlower}
      disabled={isLoading}
      h={normalize(60)}
      justifyContent="center"
      rounded={normalize(8)}
      _pressed={{opacity: 70}}
      {...props}>
      {isLoading ? (
        <Spinner color="white" />
      ) : (
        <HStack alignItems="center" justifyContent="center" space="1">
          {leftIcon && leftIcon}
          <Text
            color={color ? color : 'white'}
            fontSize={fontSize}
            lineHeight={fontSize}
            textAlign="center"
            {...titleProp}>
            {title}
          </Text>
        </HStack>
      )}
    </Pressable>
  );
};

export default Button;
