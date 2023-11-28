import {IInputProps, Icon, IconButton} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from 'config';
import {normalize} from 'utils';

import Input from '../Input';

type TProps = IInputProps & {};

const SearchInput: FC<TProps> = ({value, onChangeText, ...props}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChangeText = useCallback(
    (value: string) => {
      setInputValue(value);

      onChangeText && onChangeText(value);
    },
    [onChangeText],
  );

  const handleClear = useCallback(() => {
    setInputValue('');

    onChangeText && onChangeText('');
  }, [onChangeText]);

  return (
    <Input
      placeholder="Rechercher une personne"
      rounded="full"
      w="full"
      inputProps={{
        bgColor: colors.grayCharade,
        value: inputValue,
        InputLeftElement: (
          <Icon
            as={MaterialIcons}
            color="white"
            ml={normalize(10)}
            name="search"
            size="lg"
          />
        ),
        InputRightElement: inputValue ? (
          <IconButton
            variant="unstyled"
            _icon={{
              as: AntDesign,
              color: 'white',
              name: 'closecircle',
            }}
            _pressed={{
              opacity: 0.5,
            }}
            onPress={handleClear}
          />
        ) : (
          <></>
        ),
        onChangeText: handleChangeText,
        ...props,
      }}
    />
  );
};

export default SearchInput;
