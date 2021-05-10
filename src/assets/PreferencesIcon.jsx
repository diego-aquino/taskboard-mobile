import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PreferencesIcon = (props) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M5 26.25V17.5M5 12.5V3.75M15 26.25V15M15 10V3.75M25 26.25V20M25 15V3.75M1.25 17.5h7.5M11.25 10h7.5M21.25 20h7.5"
      stroke="#8C94BB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PreferencesIcon;
