import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowIcon = (props) => (
  <Svg
    width={32}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M31.207 8.207a1 1 0 000-1.414L24.843.429a1 1 0 10-1.414 1.414L29.086 7.5l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM.5 8.5h30v-2H.5v2z"
      fill="#fff"
    />
  </Svg>
);

export default ArrowIcon;
