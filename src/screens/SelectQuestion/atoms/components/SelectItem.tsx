import {Checkbox, HStack, Pressable} from 'native-base';
import React, {FC, useCallback} from 'react';

import {QuestionIcon, Text} from 'components';
import {colors} from 'config';
import {useAppDispatch, useAppSelector} from 'hooks';
import {getVideoState, setQuestionList} from 'store';
import {TQuestion} from 'types';
import {normalize} from 'utils';

type TProps = {
  isSelected: boolean;
  question: TQuestion;
};

const SelectItem: FC<TProps> = ({isSelected, question}) => {
  const dispatch = useAppDispatch();
  const {questionList} = useAppSelector(getVideoState);

  const handleSelectItem = useCallback(() => {
    dispatch(
      setQuestionList(
        !isSelected
          ? [...questionList, question]
          : questionList.filter((que: TQuestion) => que.id !== question.id),
      ),
    );
  }, [isSelected, question, questionList, dispatch]);

  return (
    <Pressable my="2" _pressed={{opacity: 0.5}} onPress={handleSelectItem}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack alignItems="center" space="3">
          <QuestionIcon />
          <Text fontSize={normalize(18)}>{question.title}</Text>
        </HStack>
        <Checkbox
          aria-label={question.title}
          borderWidth="0"
          isChecked={isSelected}
          value={question.id.toString()}
          _checked={{bgColor: colors.blueCornFlower}}
        />
      </HStack>
    </Pressable>
  );
};

export default SelectItem;
