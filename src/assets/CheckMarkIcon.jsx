import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckMarkIcon = (props) => (
  <Svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.036 4.764a.9.9 0 010 1.272l-7.2 7.2a.9.9 0 01-1.272 0l-3.6-3.6a.9.9 0 011.272-1.272L7.2 11.327l6.564-6.563a.9.9 0 011.272 0z"
      fill="#F7F8FF"
    />
  </Svg>
);

export default CheckMarkIcon;
