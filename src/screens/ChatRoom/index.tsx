import {Pusher} from '@pusher/pusher-websocket-react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {Box, HStack, Icon, Image, Stack, StatusBar} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {pick, types} from 'react-native-document-picker';
import {
  Actions,
  ActionsProps,
  GiftedChat,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  MessageImageProps,
  MessageVideoProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmojiPicker from 'rn-emoji-keyboard';
import {EmojiType} from 'rn-emoji-keyboard/lib/typescript/src/types';

import {createMessage, getMessagesById} from 'api';
import {HeaderBar, Video} from 'components';
import {colors, env} from 'config';
import {useAppSelector, useModal} from 'hooks';
import {getAuthState} from 'store';
import {TMainStackParamList, TMessageAttachment} from 'types';
import {messageF, normalizeMessagesData} from 'utils';

import {AddCaptionModal} from './atoms';

const pusher = Pusher.getInstance();

const ChatRoom: FC = () => {
  const {user} = useAppSelector(getAuthState);
  const addCaptionModal = useModal();
  const {params} = useRoute<RouteProp<TMainStackParamList, 'chatRoom'>>();

  const [attachment, setAttachment] = useState<TMessageAttachment | null>(null);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isShowBoard, setIsShowBoard] = useState<boolean>(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const initData = async () => {
      try {
        const res = await getMessagesById({id: params.id, page: page});

        const message = res.data
          .map(messageF)
          .map(normalizeMessagesData)
          .filter(
            message =>
              message.text !==
              '$2y$10$LnC33zuG3.LO29n7z7xsa.nUsZgP4OsQIQGJWb4nsmXaGiwxLFrcK',
          );

        if (message.length === 0) {
          setIsLastPage(true);
        }

        if (page > 1) {
          setMessages(_messages => [_messages, message].flat());
        } else {
          setMessages(message);
        }
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    const initSettings = async () => {
      try {
        await pusher.init({
          apiKey: env.pusherClientKey,
          cluster: 'eu',
        });

        await pusher.connect();

        await pusher.subscribe({
          channelName: `my-channel-${params.id}`,
          onEvent: event => {
            const data = JSON.parse(event.data);
            if ((user?.id || -1) === data.author) {
              setMessages(_prevMessages => [
                {
                  audio: data.attachmentType?.includes('audio')
                    ? `${env.uploadFileUrl}/messageries/${data.attachment}`
                    : undefined,
                  createdAt: moment().toDate(),
                  image: data.attachmentType?.includes('image')
                    ? `${env.uploadFileUrl}/messageries/${data.attachment}`
                    : undefined,
                  text: data.content,
                  user: {
                    avatar: `${env.uploadFileUrl}/avatars/${data.image}`,
                    name: data.user,
                    _id: data.author,
                  },
                  video: data.attachmentType?.includes('video')
                    ? `${env.uploadFileUrl}/messageries/${data.attachment}`
                    : undefined,
                  _id: data.id,
                },
                ..._prevMessages,
              ]);
            }
          },
        });
      } catch (error) {
        Toast.show({
          text1: JSON.stringify(error),
          type: 'error',
        });
      }
    };

    initData();
    initSettings();
  }, [page, params.id, user]);

  const handleCloseBoard = useCallback(() => {
    setIsShowBoard(false);
  }, []);

  const handlePick = useCallback((emoji: EmojiType) => {
    setMessage(_prevMessage => `${_prevMessage}${emoji.emoji}`);
  }, []);

  const handlePressActionButton = useCallback(async () => {
    try {
      const res = await pick({
        type: [
          types.audio,
          types.doc,
          types.docx,
          types.images,
          types.pdf,
          types.video,
        ],
      });

      const attachment = {
        name: res[0].name || '',
        type: res[0].type || '',
        uri: res[0].uri || '',
      };

      setAttachment(attachment);

      addCaptionModal.setIsOpen(true);
    } catch (error) {
      Toast.show({
        text1: JSON.stringify(error),
        type: 'error',
      });
    }
  }, []);

  const handleShowEmojiBoard = useCallback(() => {
    setIsShowBoard(true);
  }, []);

  const onLoadEarlier = useCallback(() => {
    setPage(_page => _page + 1);
  }, []);

  const onSend = useCallback(
    async (messages: IMessage[]) => {
      const formData = new FormData();
      formData.append('attachment', null);
      formData.append('content', messages[0].text);
      formData.append('messagingId', params.id);

      await createMessage(formData);
    },
    [params.id],
  );

  const renderActions = useCallback((props: ActionsProps) => {
    return (
      <HStack>
        <Actions
          {...props}
          containerStyle={{marginBottom: 10, marginLeft: 0, marginRight: 10}}
          icon={() => (
            <Icon as={Ionicons} color="white" name="attach" size={30} />
          )}
          onPressActionButton={handlePressActionButton}
        />
        <Actions
          {...props}
          containerStyle={{marginBottom: 10, marginLeft: 0, marginRight: 10}}
          icon={() => (
            <Icon as={Entypo} color="white" name="emoji-happy" size={30} />
          )}
          onPressActionButton={handleShowEmojiBoard}
        />
      </HStack>
    );
  }, []);

  const renderInputToolbar = useCallback(
    (props: InputToolbarProps<IMessage>) => {
      return (
        <InputToolbar
          {...props}
          containerStyle={{backgroundColor: colors.shark, padding: 10}}
        />
      );
    },
    [],
  );

  const renderMessageImage = useCallback(
    (props: MessageImageProps<IMessage>) => {
      return (
        <Image
          alt="attach"
          h="32"
          source={{
            uri: props.currentMessage?.image,
          }}
          w="40"
        />
      );
    },
    [],
  );

  const renderMessageVideo = useCallback(
    (props: MessageVideoProps<IMessage>) => {
      return (
        <Video
          h="32"
          image=""
          isPlay={false}
          w="40"
          video={props.currentMessage?.video || ''}
        />
      );
    },
    [],
  );

  const renderSend = useCallback((props: SendProps<IMessage>) => {
    return (
      <Send
        {...props}
        containerStyle={{
          padding: 0,
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        <Icon as={MaterialIcons} color="white" name="send" size={30} />
      </Send>
    );
  }, []);

  return (
    <Box bg={colors.shark} h="full" safeAreaTop w="full">
      <StatusBar backgroundColor="transparent" translucent />
      <HeaderBar />
      <Stack flex={1}>
        <GiftedChat
          alwaysShowSend
          infiniteScroll
          loadEarlier={!isLastPage}
          messages={messages}
          messagesContainerStyle={{paddingBottom: 20}}
          placeholder="Votre message..."
          text={message}
          textInputProps={{
            alignItems: 'center',
            borderColor: colors.grayFrench,
            borderRadius: 8,
            borderWidth: 1,
            color: 'white',
            marginBottom: 0,
            marginLeft: 0,
            marginTop: 0,
            paddingHorizontal: 10,
          }}
          user={{_id: user?.id || -1}}
          onInputTextChanged={setMessage}
          onLoadEarlier={onLoadEarlier}
          onSend={onSend}
          renderActions={renderActions}
          renderInputToolbar={renderInputToolbar}
          renderMessageImage={renderMessageImage}
          renderMessageVideo={renderMessageVideo}
          renderSend={renderSend}
        />
        <EmojiPicker
          open={isShowBoard}
          onClose={handleCloseBoard}
          onEmojiSelected={handlePick}
        />
      </Stack>
      <AddCaptionModal
        attachment={attachment}
        messageId={params.id}
        {...addCaptionModal}
      />
    </Box>
  );
};

export default ChatRoom;
