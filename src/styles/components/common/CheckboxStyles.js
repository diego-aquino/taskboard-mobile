import styled, { css } from 'styled-components/native';

import variables from '~/styles/variables';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  ${({
    checked,
    uncheckedColor = variables.colors.lightBlue,
    checkedColor = variables.colors.green,
  }) => css`
    width: 20px;
    height: 20px;
    border: 2px solid ${uncheckedColor};
    border-radius: 11px;

    ${checked &&
    css`
      padding: 2px;
      border: none;

      flex-direction: row;
      align-items: center;
      justify-content: center;

      background-color: ${checkedColor};
    `}
  `}
`;
