import {Box, Icon, Image, Pressable, ZStack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {colors} from 'config';
import {TVideo} from 'types';
import {getS3ImageUrl, normalize} from 'utils';

type TProps = {
  selectedVideoId: number;
  video: TVideo | null;
  navigate: any;
  setSelectedVideoId: Dispatch<SetStateAction<number>>;
};

const VideoItem: FC<TProps> = ({
  selectedVideoId,
  video,
  navigate,
  setSelectedVideoId,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (selectedVideoId === video?.id) {
      setIsSelected(true);
    }
  }, [selectedVideoId, video]);

  const handlePress = useCallback(() => {
    if (video) {
      setIsSelected(_isSelected => !_isSelected);
      if (selectedVideoId === video.id) {
        setSelectedVideoId(-1);
      } else {
        setSelectedVideoId(video.id);
      }
    } else {
      navigate('main', {screen: 'selectTheme'});
    }
  }, [selectedVideoId, video, navigate]);

  return (
    <Pressable _pressed={{opacity: 0.5}} onPress={handlePress}>
      {video ? (
        <ZStack
          alignItems="center"
          h={normalize(100)}
          justifyContent="center"
          w={normalize(100)}>
          <Image
            alt="video"
            h={normalize(100)}
            rounded="lg"
            source={{uri: getS3ImageUrl(video.image)}}
            w={normalize(100)}
          />
          {isSelected && (
            <Box bgColor="white" rounded="full">
              <Icon
                as={AntDesign}
                color={colors.blueCornFlower}
                name="checkcircle"
                size="2xl"
              />
            </Box>
          )}
        </ZStack>
      ) : (
        <Box
          alignItems="center"
          borderColor={colors.grayFrench}
          borderStyle="dashed"
          borderWidth="1"
          h={normalize(100)}
          justifyContent="center"
          rounded="lg"
          w={normalize(100)}>
          <Icon
            as={AntDesign}
            color={colors.grayFrench}
            name="pluscircleo"
            size="lg"
          />
        </Box>
      )}
    </Pressable>
  );
};

export default VideoItem;
