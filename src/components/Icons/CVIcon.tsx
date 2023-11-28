import React, {FC} from 'react';
import {G, Path, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const CVIcon: FC<TProps> = ({color = 'white', h = 16, w = 13.538}) => {
  return (
    <Svg width={w} height={h} viewBox="0 0 13.538 16">
      <G
        id="Groupe_52381"
        data-name="Groupe 52381"
        transform="translate(14963 16423)">
        <Path
          id="Tracé_27452"
          data-name="Tracé 27452"
          d="M72.252,13.6h-.923A1.335,1.335,0,0,1,70,12.266V10.83A1.335,1.335,0,0,1,71.329,9.5h.923a.615.615,0,1,1,0,1.231h-.923a.1.1,0,0,0-.1.1v1.436a.1.1,0,0,0,.1.1h.923a.615.615,0,1,1,0,1.231"
          transform="translate(-15029.717 -16424.705)"
          fill={color}
        />
        <Path
          id="Tracé_27453"
          data-name="Tracé 27453"
          d="M76.333,13.6h-.539a.616.616,0,0,1-.592-.449l-.807-2.872a.615.615,0,1,1,1.185-.333l.484,1.723.485-1.723a.615.615,0,0,1,1.185.333l-.807,2.872a.616.616,0,0,1-.592.449"
          transform="translate(-15030.503 -16424.705)"
          fill={color}
        />
        <Path
          id="Tracé_27455"
          data-name="Tracé 27455"
          d="M79.514,4.734V4.718a.1.1,0,0,0-.008-.049.473.473,0,0,0-.025-.115.008.008,0,0,1,.008.008,3.027,3.027,0,0,0-.853-1.715L76.691.9a3.042,3.042,0,0,0-1.739-.87.718.718,0,0,0-.131-.016C74.714.008,74.615,0,74.509,0H68.667A2.667,2.667,0,0,0,66,2.667V13.744A2.26,2.26,0,0,0,68.256,16h8.615a2.672,2.672,0,0,0,2.667-2.667V5.022c0-.1-.016-.189-.025-.287M75.436,1.477a1.925,1.925,0,0,1,.386.3l1.945,1.945a1.925,1.925,0,0,1,.3.386h-2.01a.615.615,0,0,1-.615-.615Zm2.872,11.856a1.443,1.443,0,0,1-1.436,1.436H68.256a1.026,1.026,0,0,1-1.026-1.026V2.667a1.432,1.432,0,0,1,1.436-1.436h5.538V3.487a1.844,1.844,0,0,0,1.846,1.846h2.256Z"
          transform="translate(-15029 -16423)"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default CVIcon;