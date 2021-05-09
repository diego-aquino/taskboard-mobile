import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = (props) => (
  <Svg
    width={35}
    height={35}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.5 7.292v20.416M7.292 17.5h20.416"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;
