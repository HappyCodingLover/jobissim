import {useFormik} from 'formik';
import {Avatar, FlatList, HStack, IconButton, Modal, Stack} from 'native-base';
import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {useWindowDimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';

import {commentVideo} from 'api';
import {Input, Text} from 'components';
import {colors, env} from 'config';
import {useAppSelector} from 'hooks';
import {getAuthState} from 'store';
import {TComment, TVideo} from 'types';
import {getInitial, normalize} from 'utils';

import {CommentItem} from './atoms';

const initialValues = {
  content: '',
};

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Required'),
});

type TProps = {
  comments: TComment[];
  isOpen: boolean;
  video: TVideo;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
};

const CommentVideoModal: FC<TProps> = ({
  comments,
  isOpen,
  video,
  setIsOpen,
  setIsRefresh,
}) => {
  const {user} = useAppSelector(getAuthState);
  const {width} = useWindowDimensions();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        await commentVideo({content: values.content, postId: video.id});

        setIsRefresh(true);
        formik.resetForm();
      } catch (error) {
        Toast.show({text1: JSON.stringify(error), type: 'error'});
      }
    },
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(() => {
    formik.handleSubmit();
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TComment; index: number}) => {
      return <CommentItem comment={item} key={index} />;
    },
    [],
  );

  return (
    <Modal isOpen={isOpen} justifyContent="flex-end" onClose={handleClose}>
      <Stack
        alignItems="center"
        bg={colors.shark}
        p={normalize(10)}
        rounded="2xl"
        w="full">
        <KeyboardAwareScrollView enableOnAndroid>
          <Stack space={normalize(10)}>
            <Stack alignItems="center" space="1">
              <Text color="white" fontSize={normalize(22)}>
                Commentaire
              </Text>
              <Text color="white" fontSize={normalize(16)}>
                Ajouter un commentaire en tant que{' '}
                {`${user?.firstName || ''} ${user?.lastName || ''}` || ''}
              </Text>
            </Stack>
            <FlatList
              data={comments}
              inverted
              maxH={normalize(500)}
              nestedScrollEnabled
              renderItem={renderItem}
            />
            <HStack space="2">
              <Avatar
                bgColor="transparent"
                source={{
                  uri: `${env.uploadFileUrl}/avatars/${user?.avatar || ''}`,
                }}>
                {getInitial(`${user?.firstName || ''} ${user?.lastName || ''}`)}
              </Avatar>
              <Input
                error={formik.touched.content && formik.errors.content}
                fontSize="sm"
                placeholder="Ajouter votre commentaire..."
                px={0}
                w={width - 130}
                inputProps={{
                  borderWidth: 0,
                  value: formik.values.content,
                  onChangeText: formik.handleChange('content'),
                }}
              />
              <IconButton
                p="0"
                variant="unstyled"
                _icon={{
                  as: Ionicons,
                  color: colors.blueCornFlower,
                  name: 'send-sharp',
                  size: 'xl',
                }}
                _pressed={{
                  opacity: 0.5,
                }}
                onPress={handleSubmit}
              />
            </HStack>
          </Stack>
        </KeyboardAwareScrollView>
      </Stack>
    </Modal>
  );
};

export default CommentVideoModal;
