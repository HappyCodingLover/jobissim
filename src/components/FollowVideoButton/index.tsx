import {Icon} from 'native-base';
import {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {follow, isFollowed} from 'api';
import {colors} from 'config';
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TVideo} from 'types';
import {normalize} from 'utils';

import Link from '../Link';

type TProps = {
  video: TVideo;
};

const FollowVideoButton: FC<TProps> = ({video}) => {
  const {user} = useAppSelector(getAuthState);

  const [isVideoFollowed, setIsVideoFollowed] = useState(false);

  useEffect(() => {
    const initialFollowCheck = async () => {
      try {
        const res = await isFollowed({id: video.user.id});
        setIsVideoFollowed(res.data.isFollowed);
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initialFollowCheck();
  }, [video]);

  const handleFollow = useCallback(async () => {
    try {
      await follow({id: video.user.id});
      setIsVideoFollowed(_isVideoFollowed => !_isVideoFollowed);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, [video]);

  return (
    <>
      {video.user.id !== user?.id &&
        (!isVideoFollowed ? (
          <Link
            fontSize={normalize(18)}
            leftIcon={
              <Icon
                as={AntDesign}
                color={colors.blueCornFlower}
                name="pluscircleo"
                size="xs"
              />
            }
            title="S'abonner"
            onPress={handleFollow}
          />
        ) : (
          <Link
            color={colors.grayDusty}
            fontSize={normalize(18)}
            leftIcon={
              <Icon
                as={AntDesign}
                color={colors.grayDusty}
                name="minuscircleo"
                size="xs"
              />
            }
            title="Se désabonner"
            onPress={handleFollow}
          />
        ))}
    </>
  );
};

export default FollowVideoButton;
