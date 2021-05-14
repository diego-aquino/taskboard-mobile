import React from 'react';
import Svg, { Path } from 'react-native-svg';

const TrashIcon = ({ stroke, ...rest }) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <Path
      d="M3 6h18M8.001 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2h-10a2 2 0 01-2-2V6h14zM9.999 11v6M14.001 11v6"
      stroke={stroke || '#000'}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TrashIcon;
