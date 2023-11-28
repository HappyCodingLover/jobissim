import {IInputProps, IconButton} from 'native-base';
import React, {FC, MutableRefObject, RefCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Input from '../Input';

type TProps = {
  error?: string | boolean;
  placeholder?: string;
  inputProps?: IInputProps;
  inputRef?: MutableRefObject<any> | RefCallback<any>;
  onChange: (text: string) => void;
};

const PasswordInput: FC<TProps> = ({
  error,
  placeholder,
  inputProps,
  inputRef,
  onChange,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(_isShowPassword => !_isShowPassword);
  };

  return (
    <Input
      error={error}
      placeholder={placeholder}
      type={isShowPassword ? 'text' : 'password'}
      inputProps={{
        InputRightElement: (
          <IconButton
            variant="unstyled"
            _icon={{
              as: Ionicons,
              color: 'white',
              name: isShowPassword ? 'eye' : 'eye-off',
            }}
            _pressed={{
              opacity: 0.5,
            }}
            onPress={handleShowPassword}
          />
        ),
        onChangeText: onChange,
        ...inputProps,
      }}
      inputRef={inputRef}
    />
  );
};

export default PasswordInput;
