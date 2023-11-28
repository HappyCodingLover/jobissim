import React, {FC} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

type TProps = {
  color?: string;
  h?: number;
  w?: number;
};

const CreateEnterpriseIcon: FC<TProps> = ({
  color = 'white',
  h = 16,
  w = 17.641,
}) => {
  return (
    <Svg
      id="Groupe_58371"
      data-name="Groupe 58371"
      width={w}
      height={h}
      viewBox="0 0 17.641 16">
      <Defs>
        <ClipPath id="clip-path">
          <Rect
            id="Rectangle_18818"
            data-name="Rectangle 18818"
            width="17.641"
            height="16"
            fill={color}
          />
        </ClipPath>
      </Defs>
      <G id="Groupe_58370" data-name="Groupe 58370" clip-path="url(#clip-path)">
        <Path
          id="Tracé_27573"
          data-name="Tracé 27573"
          d="M11.577,11.231H9.115a.615.615,0,1,1,0-1.231h2.462a.615.615,0,0,1,0,1.231"
          transform="translate(-1.526 -1.795)"
          fill={color}
        />
        <Path
          id="Tracé_27574"
          data-name="Tracé 27574"
          d="M11.577,14.231H9.115a.615.615,0,1,1,0-1.231h2.462a.615.615,0,1,1,0,1.231"
          transform="translate(-1.526 -2.333)"
          fill={color}
        />
        <Path
          id="Tracé_27575"
          data-name="Tracé 27575"
          d="M11.577,8.231H9.115A.615.615,0,1,1,9.115,7h2.462a.615.615,0,1,1,0,1.231"
          transform="translate(-1.526 -1.256)"
          fill={color}
        />
        <Path
          id="Tracé_27576"
          data-name="Tracé 27576"
          d="M11.577,5.231H9.115A.615.615,0,1,1,9.115,4h2.462a.615.615,0,1,1,0,1.231"
          transform="translate(-1.526 -0.718)"
          fill={color}
        />
        <Path
          id="Tracé_27577"
          data-name="Tracé 27577"
          d="M17.026,14.769h-.205V4.644a1.369,1.369,0,0,0-1.362-1.362H12.718V1.436A1.443,1.443,0,0,0,11.282,0H6.359A1.443,1.443,0,0,0,4.923,1.436V3.282H2.183A1.369,1.369,0,0,0,.821,4.644V14.769H.615A.615.615,0,1,0,.615,16h16.41a.615.615,0,1,0,0-1.231m-12.1,0H2.051V4.644a.13.13,0,0,1,.131-.131H4.923V5.744H3.487a.615.615,0,1,0,0,1.231H4.923V8.205H3.487a.615.615,0,1,0,0,1.231H4.923v1.231H3.487a.615.615,0,1,0,0,1.231H4.923Zm6.564,0H9.436V13.744a.615.615,0,1,0-1.231,0v1.026H6.154V1.436a.2.2,0,0,1,.205-.205h4.923a.2.2,0,0,1,.205.205Zm4.1,0H12.718V11.9h1.436a.615.615,0,0,0,0-1.231H12.718V9.436h1.436a.615.615,0,0,0,0-1.231H12.718V6.974h1.436a.615.615,0,0,0,0-1.231H12.718V4.513h2.741a.13.13,0,0,1,.131.131Z"
          fill={color}
        />
      </G>
    </Svg>
  );
};

export default CreateEnterpriseIcon;
