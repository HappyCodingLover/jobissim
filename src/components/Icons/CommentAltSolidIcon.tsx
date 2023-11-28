import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const CommentAltSolidIcon: FC<TProps> = ({
  color = 'white',
  h = 24,
  w = 23.999,
}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 23.999 24">
      <Path
        id="comment-alt-solid"
        d="M21,0H3A3,3,0,0,0,0,3V16.5a3,3,0,0,0,3,3H7.5v3.937a.564.564,0,0,0,.9.455L14.249,19.5H21a3,3,0,0,0,3-3V3A3,3,0,0,0,21,0Z"
        fill={color}
      />
    </Svg>
  );
};

export default CommentAltSolidIcon;
