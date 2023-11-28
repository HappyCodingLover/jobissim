import React, {FC} from 'react';
import {Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const AddUserIcon: FC<TProps> = ({color = 'white', h = 52, w = 47.048}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 47.048 52">
      <Path
        id="ic_fluent_person_chat_24_regular"
        d="M22.1,35.424a16.037,16.037,0,0,1,1.754-3.715H9.57A5.57,5.57,0,0,0,4,37.279V38.71a9.288,9.288,0,0,0,2.225,6.032c3.5,4.1,8.644,6.32,15.332,6.719l1.117-3.667c-6.2-.2-10.695-2.035-13.624-5.464A5.573,5.573,0,0,1,7.715,38.71V37.279A1.855,1.855,0,0,1,9.57,35.424ZM23.8,2A12.384,12.384,0,1,1,11.421,14.384,12.384,12.384,0,0,1,23.8,2Zm0,3.715a8.669,8.669,0,1,0,8.668,8.669A8.669,8.669,0,0,0,23.8,5.715ZM51.048,40.378A13.626,13.626,0,0,1,30.822,52.3l-5.416,1.648A1.238,1.238,0,0,1,23.861,52.4l1.648-5.414a13.623,13.623,0,1,1,25.538-6.605ZM32.472,36.663a1.238,1.238,0,0,0,0,2.477h9.907a1.238,1.238,0,0,0,0-2.477Zm-1.238,6.192a1.238,1.238,0,0,0,1.238,1.238h4.953a1.238,1.238,0,1,0,0-2.477H32.472A1.238,1.238,0,0,0,31.234,42.855Z"
        transform="translate(-4 -2)"
        fill={color}
      />
    </Svg>
  );
};

export default AddUserIcon;
