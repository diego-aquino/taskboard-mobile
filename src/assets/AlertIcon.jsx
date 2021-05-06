import React from 'react';
import Svg, { Path } from 'react-native-svg';

const AlertIcon = (props) => (
  <Svg
    width={14}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7 13.584A5.834 5.834 0 107 1.917a5.834 5.834 0 000 11.667zM7 5.125v2.333M7 9.792h.005"
      stroke="#ff667a"
      strokeWidth={1.604}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default AlertIcon;
