import styled, { css } from 'styled-components/native';

import BaseAlert from '~/components/common/Alert';
import variables from '~/styles/variables';

export const Container = styled.View`
  justify-content: center;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${variables.colors.lightBlue};
  font-family: ${variables.fonts.medium};

  ${({ focused }) =>
    focused &&
    css`
      color: ${variables.colors.brightBlueOnHover};
    `}

  ${({ withAlert }) =>
    withAlert &&
    css`
      color: ${variables.colors.lightRed};
    `}
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: variables.colors.lightBlueDim,
})`
  border-radius: ${variables.borderRadius}px;

  color: ${variables.colors.darkBlue};
  font-size: 16px;

  ${({ variant, focused }) =>
    variant === 'normal' &&
    css`
      margin-top: 6px;
      padding: 6px 12px;

      border: 1px solid
        ${focused ? variables.colors.brightBlue : variables.colors.lightBlueDim};
    `}

  ${({ variant, focused }) =>
    variant === 'outline' &&
    css`
      padding: 6px 0;
      border: 0px solid
        ${focused ? variables.colors.brightBlue : variables.colors.lightBlueDim};
      border-bottom-width: 1px;
    `}

  ${({ withAlert }) =>
    withAlert &&
    css`
      border-color: ${variables.colors.lightRed};
    `}
`;

export const Alert = styled(BaseAlert)`
  margin-top: 6px;
`;
