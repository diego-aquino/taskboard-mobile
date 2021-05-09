import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronLeftIcon = (props) => (
  <Svg
    width={38}
    height={38}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M23.75 28.5l-9.5-9.5 9.5-9.5"
      stroke="#6E7CA9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronLeftIcon;
