import moment from 'moment';
import {Avatar, HStack, IPressableProps, Pressable, Stack} from 'native-base';
import {FC} from 'react';

import {Text} from 'components';
import {colors, env} from 'config';
import {TNotification} from 'types';
import {getInitial, normalize} from 'utils';

type TProps = IPressableProps & {
  notification: TNotification;
};

const Notificationitem: FC<TProps> = ({notification, ...rest}) => {
  return (
    <Pressable my="2" _pressed={{opacity: 0.5}} {...rest}>
      <HStack alignItems="center" space="4">
        <Avatar
          bgColor="transparent"
          borderColor="white"
          borderWidth="2"
          source={{
            uri: `${env.uploadFileUrl}/avatars/${notification.sender.avatar}`,
          }}>
          {getInitial(
            `${notification.sender.firstName} ${notification.sender.lastName}`,
          )}
        </Avatar>
        <Stack>
          <Text>
            {`${notification.sender.firstName} ${notification.sender.lastName}`}
          </Text>
          <Text color={colors.grayFrench} fontSize={normalize(14)}>
            {moment(notification.createdAt).fromNow()}
          </Text>
        </Stack>
      </HStack>
      <Text>{notification.content}</Text>
    </Pressable>
  );
};

export default Notificationitem;
