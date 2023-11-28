import {FlatList, Modal, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';

import {getTendencies} from 'api';
import {Input} from 'components';
import {colors} from 'config';
import {TTendency, TTendencyPost} from 'types';
import {normalize} from 'utils';

import {TagItem} from '../components';

type TProps = {
  isOpen: boolean;
  setDescription: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const HashTagModal: FC<TProps> = ({isOpen, setDescription, setIsOpen}) => {
  const [tag, setTag] = useState('');
  const [tendencies, setTendencies] = useState<TTendency[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getTendencies(tag);

        setTendencies(res.data);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
  }, [tag]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TTendencyPost; index: number}) => {
      return (
        <TagItem
          key={index}
          tag={tag}
          tendency={item}
          handleClose={handleClose}
          setDescription={setDescription}
        />
      );
    },
    [tag, setDescription, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack flex={1} py={normalize(64)} w="full">
        <Input
          bgColor={colors.shark}
          placeholder="Rechercher"
          inputProps={{
            onChangeText: setTag,
          }}
        />
        <FlatList
          bgColor={colors.shark}
          data={tendencies.map(tendency => tendency.posts).flat()}
          px="2"
          renderItem={renderItem}
        />
      </Stack>
    </Modal>
  );
};

export default HashTagModal;
