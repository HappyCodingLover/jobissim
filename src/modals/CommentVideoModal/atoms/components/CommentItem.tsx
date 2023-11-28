import {Avatar, HStack, Stack} from 'native-base';
import {FC} from 'react';

import {Text} from 'components';
import {env} from 'config';
import {TComment} from 'types';
import {getInitial} from 'utils';

type TProps = {
  comment: TComment;
};

const CommentItem: FC<TProps> = ({comment}) => {
  return (
    <HStack alignItems="center" my="3" space="2">
      <Avatar
        bgColor="transparent"
        source={{
          uri: `${env.uploadFileUrl}/avatars/${comment.author.avatar || ''}`,
        }}>
        {getInitial(comment.author.fullName)}
      </Avatar>
      <Stack>
        <Text>{comment.author.fullName}</Text>
        <Text>{comment.content}</Text>
      </Stack>
    </HStack>
  );
};

export default CommentItem;
