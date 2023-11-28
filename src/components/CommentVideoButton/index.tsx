import {HStack, Pressable, Stack} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {getAllComments} from 'api';
import {useModal} from 'hooks';
import {CommentVideoModal} from 'modals';
import {TComment, TVideo} from 'types';
import {commentF} from 'utils';

import {CommentAltSolidIcon} from '../Icons';
import Text from '../Text';

type TProps = {
  direction?: 'column' | 'row';
  video: TVideo;
};

const CommentVideoButton: FC<TProps> = ({direction, video}) => {
  const commentVideoModal = useModal();

  const [comments, setComments] = useState<TComment[]>([]);
  const [isRefresh, setIsRefresh] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getAllComments(video.id);

        setComments(res.data.map(commentF));
        setIsRefresh(false);
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
    };

    isRefresh && initData();
  }, [isRefresh, video]);

  const handleComment = useCallback(() => {
    commentVideoModal.setIsOpen(true);
  }, []);

  return (
    <>
      <Pressable _pressed={{opacity: 70}} onPress={handleComment}>
        {direction === 'row' ? (
          <HStack alignItems="center" justifyContent="center" space="2">
            <CommentAltSolidIcon />
            <Text color="white">{comments.length}</Text>
          </HStack>
        ) : (
          <Stack alignItems="center" justifyContent="center" space="1">
            <CommentAltSolidIcon />
            <Text color="white">{comments.length}</Text>
          </Stack>
        )}
      </Pressable>
      <CommentVideoModal
        comments={comments}
        video={video}
        setIsRefresh={setIsRefresh}
        {...commentVideoModal}
      />
    </>
  );
};

export default CommentVideoButton;
