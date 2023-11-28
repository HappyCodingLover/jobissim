import {Text} from 'components';
import {HStack, Image, Pressable} from 'native-base';
import {Dispatch, FC, SetStateAction, useCallback} from 'react';

import {TTendencyPost} from 'types';
import {getS3ImageUrl, similarity} from 'utils';

type TProps = {
  tag: string;
  tendency: TTendencyPost;
  handleClose: () => void;
  setDescription: Dispatch<SetStateAction<string>>;
};

const TagItem: FC<TProps> = ({tag, tendency, handleClose, setDescription}) => {
  const handleChangeDescription = useCallback(() => {
    const hashtags = (tendency.hashtag || '').split(' ');
    const simi = hashtags.map(hash => similarity(hash, tag));
    const maxValue = Math.max(...simi);
    const maxIndex = simi.findIndex(sim => sim === maxValue);
    setDescription(
      _prevDescription => `${_prevDescription}${hashtags[maxIndex]} `,
    );
    handleClose();
  }, [tag, tendency, handleClose, setDescription]);

  return (
    <Pressable
      my="1"
      _pressed={{opacity: 0.5}}
      onPress={handleChangeDescription}>
      <HStack alignItems="center" space="2">
        <Image
          alt="image"
          h="12"
          rounded="lg"
          source={{uri: getS3ImageUrl(tendency.image)}}
          w="12"
        />
        <Text>{tendency.title}</Text>
      </HStack>
    </Pressable>
  );
};

export default TagItem;
