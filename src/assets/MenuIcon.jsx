import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MenuIcon = (props) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3.75 15h22.5M3.75 7.5h22.5M3.75 22.5h22.5"
      stroke="#8C94BB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MenuIcon;
