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
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TFollowUser} from 'types';
import {normalize} from 'utils';

import {FollowerListItem} from '../components';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ContactsModal: FC<TProps> = ({isOpen, setIsOpen}) => {
  const {user} = useAppSelector(getAuthState);

  const [followers, setFollowers] = useState<TFollowUser[]>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getFollowers({id: user?.id || -1});

        setFollowers(res.data);
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
    };

    initData();
  }, [user]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TFollowUser; index: number}) => {
      return <FollowerListItem followUser={item} key={index} />;
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack
        bg={colors.shark}
        maxH={normalize(600)}
        p={normalize(10)}
        rounded="xl"
        space={normalize(10)}>
        <FlatList data={followers} renderItem={renderItem} />
      </Stack>
    </Modal>
  );
};

export default ContactsModal;
