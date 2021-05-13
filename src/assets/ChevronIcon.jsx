import React from 'react';
import Svg, { Path } from 'react-native-svg';
import styled, { css } from 'styled-components/native';

export const Container = styled(Svg)`
  ${({ direction }) => {
    switch (direction) {
      case 'up':
        return css`
          transform: rotate(0deg);
        `;
      case 'down':
        return css`
          transform: rotate(180deg);
        `;
      default:
        return css``;
    }
  }}
`;

const ChevronIcon = ({ direction = 'up', ...rest }) => (
  <Container
    direction={direction}
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <Path
      d="M18 15l-6-6-6 6"
      stroke="#6E7CA9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Container>
);

export default ChevronIcon;
