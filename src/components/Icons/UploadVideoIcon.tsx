import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const UploadVideoIcon: FC<TProps> = ({color = 'white', h = 24, w = 24}) => {
  return (
    <Svg
      id="Groupe_57994"
      data-name="Groupe 57994"
      width={w}
      height={h}
      viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18743"
            data-name="Rectangle 18743"
            width="24"
            height="24"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G id="Groupe_57993" data-name="Groupe 57993" clip-path="url(#clip-path)">
        <Path
          id="Tracé_27477"
          data-name="Tracé 27477"
          d="M12.846,19.846H7.923a.923.923,0,1,1,0-1.846h4.923a.923.923,0,0,1,0,1.846"
          transform="translate(1.615 4.154)"
          fill={color}
        />
        <Path
          id="Tracé_27478"
          data-name="Tracé 27478"
          d="M12.846,1.846H7.923A.923.923,0,0,1,7.923,0h4.923a.923.923,0,0,1,0,1.846"
          transform="translate(1.615)"
          fill={color}
        />
        <Path
          id="Tracé_27479"
          data-name="Tracé 27479"
          d="M.923,13.769A.923.923,0,0,1,0,12.846V7.923a.923.923,0,0,1,1.846,0v4.923a.923.923,0,0,1-.923.923"
          transform="translate(0 1.615)"
          fill={color}
        />
        <Path
          id="Tracé_27480"
          data-name="Tracé 27480"
          d="M18.923,13.769A.923.923,0,0,1,18,12.846V7.923a.923.923,0,0,1,1.846,0v4.923a.923.923,0,0,1-.923.923"
          transform="translate(4.154 1.615)"
          fill={color}
        />
        <Path
          id="Tracé_27481"
          data-name="Tracé 27481"
          d="M5.846,20.769A5.853,5.853,0,0,1,0,14.923a.923.923,0,0,1,1.846,0,4,4,0,0,0,4,4,.923.923,0,0,1,0,1.846"
          transform="translate(0 3.231)"
          fill={color}
        />
        <Path
          id="Tracé_27482"
          data-name="Tracé 27482"
          d="M5.846,20.769A5.853,5.853,0,0,1,0,14.923a.923.923,0,0,1,1.846,0,4,4,0,0,0,4,4,.923.923,0,0,1,0,1.846"
          transform="translate(0 3.231)"
          fill={color}
        />
        <Path
          id="Tracé_27483"
          data-name="Tracé 27483"
          d="M19.846,6.769a.923.923,0,0,1-.923-.923,4,4,0,0,0-4-4,.923.923,0,0,1,0-1.846,5.853,5.853,0,0,1,5.846,5.846.923.923,0,0,1-.923.923"
          transform="translate(3.231)"
          fill={color}
        />
        <Path
          id="Tracé_27484"
          data-name="Tracé 27484"
          d="M.923,6.769A.923.923,0,0,1,0,5.846,5.853,5.853,0,0,1,5.846,0a.923.923,0,0,1,0,1.846,4,4,0,0,0-4,4,.923.923,0,0,1-.923.923"
          fill={color}
        />
        <Path
          id="Tracé_27485"
          data-name="Tracé 27485"
          d="M14.923,20.769a.923.923,0,1,1,0-1.846,4,4,0,0,0,4-4,.923.923,0,0,1,1.846,0,5.853,5.853,0,0,1-5.846,5.846"
          transform="translate(3.231 3.231)"
          fill={color}
        />
        <Path
          id="Tracé_27486"
          data-name="Tracé 27486"
          d="M14.228,10.652a.893.893,0,0,1-.652.271.913.913,0,0,1-.652-.271l-1.5-1.5v5.157a.923.923,0,0,1-1.846,0V9.151l-1.5,1.5a.923.923,0,0,1-1.3-1.3L9.846,6.271a.955.955,0,0,1,.3-.2.9.9,0,0,1,.714,0,.955.955,0,0,1,.3.2l3.077,3.077a.929.929,0,0,1,0,1.3"
          transform="translate(1.5 1.385)"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default UploadVideoIcon;
