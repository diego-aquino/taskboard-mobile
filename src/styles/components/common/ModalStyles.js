import styled, { css } from 'styled-components/native';

import variables from '~/styles/variables';

export const Container = styled.View`
  ${({ active }) => css`
    padding: 16px;

    display: ${active ? 'flex' : 'none'};
    position: ${active ? 'absolute' : 'relative'};
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    align-items: center;
    justify-content: center;

    z-index: 9998;
  `}
`;

export const ChildrenWrapper = styled.View`
  padding: 16px;
  border-radius: 16px;

  background-color: ${variables.colors.white};
`;

export const ClickableBackground = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
`;
