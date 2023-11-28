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

import {getFollowings} from 'api';
import {colors} from 'config';
import {TFollowUser} from 'types';
import {normalize} from 'utils';

import {FollowingItem} from '../components';

type TProps = {
  userId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FollowingUserModal: FC<TProps> = ({userId, isOpen, setIsOpen}) => {
  const [followings, setFollowings] = useState<TFollowUser[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getFollowings({id: userId});

        setFollowings(res.data);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TFollowUser; index: number}) => {
      return <FollowingItem key={index} user={item} />;
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack
        bg={colors.shark}
        maxH={normalize(600)}
        px="2"
        py="5"
        rounded="xl"
        space="3"
        w="full">
        <FlatList data={followings} renderItem={renderItem} />
      </Stack>
    </Modal>
  );
};

export default FollowingUserModal;
