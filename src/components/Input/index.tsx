import {Box, IBoxProps, IInputProps, Input as NBInput, Text} from 'native-base';
import React, {FC, MutableRefObject, RefCallback} from 'react';

import {colors} from 'config';
import {normalize} from 'utils';

type TProps = IBoxProps & {
  error?: string | boolean;
  inputRef?: MutableRefObject<any> | RefCallback<any>;
  placeholder?: string;
  type?: 'text' | 'password';
  inputProps?: IInputProps;
};

const Input: FC<TProps> = ({
  color = colors.grayFrench,
  error,
  fontSize = normalize(20),
  h = normalize(60),
  inputRef,
  placeholder = '',
  px = normalize(16),
  rounded = normalize(8),
  type = 'text',
  inputProps,
  ...props
}) => {
  return (
    <Box {...props}>
      <NBInput
        autoCapitalize="none"
        borderColor={error ? colors.redMonza : colors.grayFrench}
        color={color}
        fontSize={fontSize}
        h={h}
        placeholder={placeholder}
        px={px}
        ref={inputRef}
        rounded={rounded}
        textContentType="none"
        type={type}
        _focus={{
          bg: 'transparent',
          borderColor: colors.grayFrench,
        }}
        {...inputProps}
      />
      {error && (
        <Text color="red.500" fontSize={normalize(18)} mx="1">
          {error}
        </Text>
      )}
    </Box>
  );
};

export default Input;
