import {HStack, IconButton, Image, Modal, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {createMessage} from 'api';
import {Input, Video} from 'components';
import {colors} from 'config';
import {TMessageAttachment} from 'types';
import {normalize} from 'utils';

type TProps = {
  attachment: TMessageAttachment | null;
  isOpen: boolean;
  messageId: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const AddCaptionModal: FC<TProps> = ({
  attachment,
  isOpen,
  messageId,
  setIsOpen,
}) => {
  const [content, setContent] = useState('');

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSend = useCallback(async () => {
    const formData = new FormData();
    formData.append('attachment', attachment);
    formData.append('content', content);
    formData.append('messagingId', messageId);

    await createMessage(formData);

    handleClose();
  }, [attachment, content]);

  return (
    <Modal isOpen={isOpen} px={normalize(20)} onClose={handleClose}>
      <Stack
        alignItems="center"
        bg={colors.shark}
        p={normalize(10)}
        rounded="xl"
        space={normalize(10)}
        w="full">
        <KeyboardAwareScrollView
          contentContainerStyle={{width: '100%'}}
          enableOnAndroid
          style={{width: '100%'}}>
          <Stack space="2">
            {attachment?.type.includes('image') && (
              <Image
                alt="attach"
                h="80"
                source={{uri: attachment?.uri}}
                w="full"
              />
            )}
            {attachment?.type.includes('video') && (
              <Video h="80" image="" isPlay={false} video={attachment.uri} />
            )}
            <HStack space="2" w="full">
              <Input flex={1} inputProps={{onChangeText: setContent}} />
              <IconButton
                p="0"
                variant="unstyled"
                _icon={{
                  as: MaterialIcons,
                  color: 'white',
                  name: 'send',
                  size: 30,
                }}
                _pressed={{
                  opacity: 0.5,
                }}
                onPress={handleSend}
              />
            </HStack>
          </Stack>
        </KeyboardAwareScrollView>
      </Stack>
    </Modal>
  );
};

export default AddCaptionModal;
