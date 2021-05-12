import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronUpIcon = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18 15l-6-6-6 6"
      stroke="#6E7CA9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronUpIcon;
