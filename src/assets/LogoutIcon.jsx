import React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const LogoutIcon = (props) => (
  <Svg
    width={21}
    height={22}
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#logout_2_svg__clip0)" fill="#566598">
      <Path d="M10.39 19.63H2.597a.866.866 0 01-.865-.866V3.18c0-.478.388-.866.865-.866h7.793a.865.865 0 100-1.731H2.597A2.6 2.6 0 000 3.179v15.585a2.6 2.6 0 002.597 2.598h7.793a.865.865 0 100-1.732z" />
      <Path d="M20.591 10.355L15.327 5.16a.866.866 0 10-1.216 1.233l3.762 3.713H7.793a.865.865 0 100 1.731h10.08l-3.762 3.713a.866.866 0 001.216 1.233l5.264-5.195a.867.867 0 000-1.233z" />
    </G>
    <Defs>
      <ClipPath id="logout_2_svg__clip0">
        <Path
          fill="#fff"
          transform="translate(0 .547)"
          d="M0 0h20.849v20.849H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default LogoutIcon;
