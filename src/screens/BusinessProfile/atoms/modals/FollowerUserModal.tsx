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

import {getFollowers} from 'api';
import {colors} from 'config';
import {TFollowUser} from 'types';
import {normalize} from 'utils';

import {FollowerItem} from '../components';

type TProps = {
  userId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const FollowerUserModal: FC<TProps> = ({userId, isOpen, setIsOpen}) => {
  const [followers, setFollowers] = useState<TFollowUser[]>([]);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getFollowers({id: userId});

        setFollowers(res.data);
        setIsRefresh(false);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    if (isRefresh) initData();
  }, [isRefresh]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TFollowUser; index: number}) => {
      return (
        <FollowerItem key={index} user={item} setIsRefresh={setIsRefresh} />
      );
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
        <FlatList data={followers} renderItem={renderItem} />
      </Stack>
    </Modal>
  );
};

export default FollowerUserModal;
