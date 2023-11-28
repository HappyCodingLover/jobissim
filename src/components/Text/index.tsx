import {ITextProps, Text as NBText, ScrollView, Stack} from 'native-base';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {NativeSyntheticEvent, TextLayoutEventData} from 'react-native';

import {normalize} from 'utils';

import Link from '../Link';

type TProps = ITextProps & {
  setShowMoreDescription?: Dispatch<SetStateAction<boolean>>;
};

const Text: FC<TProps> = ({
  children,
  numberOfLines,
  setShowMoreDescription,
  ...props
}) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowMoreButton, setIsShowMoreButton] = useState(false);

  const toggleShowMore = useCallback(() => {
    setIsShowMore(_isShowMore => !_isShowMore);
    setShowMoreDescription &&
      setShowMoreDescription(_showMoreDescription => !_showMoreDescription);
  }, []);

  const handleTextLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (numberOfLines && event.nativeEvent.lines.length > numberOfLines) {
        setIsShowMoreButton(true);
      }
    },
    [],
  );

  return (
    <Stack>
      {isShowMoreButton ? (
        <ScrollView
          nestedScrollEnabled
          maxH={isShowMore ? normalize(300) : 'auto'}>
          <NBText
            color="white"
            numberOfLines={isShowMore ? undefined : numberOfLines}
            onTextLayout={handleTextLayout}
            {...props}>
            {children}
          </NBText>
        </ScrollView>
      ) : (
        <NBText
          color="white"
          numberOfLines={isShowMore ? undefined : numberOfLines}
          onTextLayout={handleTextLayout}
          {...props}>
          {children}
        </NBText>
      )}

      {isShowMoreButton && (
        <Link
          fontSize={normalize(15)}
          title={isShowMore ? 'less' : 'more'}
          onPress={toggleShowMore}
        />
      )}
    </Stack>
  );
};

export default Text;
