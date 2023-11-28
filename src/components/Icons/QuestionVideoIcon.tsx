import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const QuestionVideoIcon: FC<TProps> = ({
  color = 'white',
  h = 24,
  w = 32.276,
}) => {
  return (
    <Svg
      id="Groupe_58038"
      data-name="Groupe 58038"
      width={w}
      height={h}
      viewBox="0 0 32.276 24">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18742"
            data-name="Rectangle 18742"
            width="32.276"
            height="24"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G id="Groupe_57991" data-name="Groupe 57991" clip-path="url(#clip-path)">
        <Path
          id="Tracé_27476"
          data-name="Tracé 27476"
          d="M31.846,4.684a2.918,2.918,0,0,0-3.989-.943L24,6.108A6.221,6.221,0,0,0,17.793,0H6.207A6.209,6.209,0,0,0,0,6.207V17.793A6.209,6.209,0,0,0,6.207,24H17.793A6.221,6.221,0,0,0,24,17.892l3.857,2.367a2.9,2.9,0,0,0,4.419-2.466V6.207a2.9,2.9,0,0,0-.43-1.523M21.517,17.793a3.73,3.73,0,0,1-3.724,3.724H6.207a3.73,3.73,0,0,1-3.724-3.724V6.207A3.73,3.73,0,0,1,6.207,2.483H17.793a3.73,3.73,0,0,1,3.724,3.724Zm8.276,0a.442.442,0,0,1-.646.348L24,14.963V9.037l5.148-3.178a.409.409,0,0,1,.579.132.539.539,0,0,1,.066.215Z"
          fill={color}
        />
        <Path
          id="Tracé_27502"
          data-name="Tracé 27502"
          d="M10.292,14.4a1.445,1.445,0,0,1-1.379-1.377,1.445,1.445,0,0,1,1.379-1.377,1.377,1.377,0,1,1,0,2.755"
          transform="translate(1.688 3.411)"
          fill={color}
        />
        <Path
          id="Tracé_27503"
          data-name="Tracé 27503"
          d="M11.389,14.35a1.291,1.291,0,0,1-.028-2.582,1.345,1.345,0,0,0,.9-2.316,1.4,1.4,0,0,0-.957-.374A1.341,1.341,0,0,0,9.991,10.4a1.324,1.324,0,0,1-1.319,1.265,1.3,1.3,0,0,1-1.265-1.319A3.922,3.922,0,0,1,11.255,6.5a3.861,3.861,0,0,1,2.8,1.093,3.928,3.928,0,0,1-2.637,6.761Z"
          transform="translate(0.601 -0.306)"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default QuestionVideoIcon;
