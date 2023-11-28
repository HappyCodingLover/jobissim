import {FlatList, IconButton, Modal, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {getFollowers} from 'api';
import {SearchInput, Text} from 'components';
import {colors} from 'config';
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TFollowUser, TVideo} from 'types';
import {normalize} from 'utils';

import {FollowerList} from './atoms';

type TProps = {
  isOpen: boolean;
  video: TVideo;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const ShareVideoModal: FC<TProps> = ({isOpen, video, setIsOpen}) => {
  const {user} = useAppSelector(getAuthState);

  const [followerList, setFollowerList] = useState<TFollowUser[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const initial = async () => {
      try {
        const res = await getFollowers({id: user?.id || -1});
        setFollowerList(res.data);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initial();
  }, [user]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TFollowUser; index: number}) => {
      return <FollowerList follower={item} key={index} video={video} />;
    },
    [video],
  );

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack
        alignItems="center"
        bg={colors.shark}
        p={normalize(10)}
        rounded="2xl"
        space={normalize(10)}
        w="full">
        <Stack alignItems="flex-end" w="full">
          <IconButton
            p="0"
            variant="unstyled"
            _icon={{
              as: AntDesign,
              color: 'white',
              name: 'close',
              size: 'xl',
            }}
            _pressed={{
              opacity: 0.5,
            }}
            onPress={handleClose}
          />
        </Stack>
        <SearchInput onChangeText={handleSearch} />
        {followerList.filter(follow =>
          follow.username?.toLowerCase().includes(searchText.toLowerCase()),
        ).length > 0 ? (
          <FlatList
            data={followerList.filter(follow =>
              follow.username?.toLowerCase().includes(searchText.toLowerCase()),
            )}
            maxH={normalize(500)}
            renderItem={renderItem}
            w="full"
          />
        ) : (
          <Text color="white">Aucun résultat</Text>
        )}
      </Stack>
    </Modal>
  );
};

export default ShareVideoModal;
