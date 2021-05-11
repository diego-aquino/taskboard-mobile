import styled, { css } from 'styled-components/native';

import { Checkbox as BaseCheckbox } from '~/components/common';
import variables from '~/styles/variables';

export const Container = styled.View`
  border: 1px solid ${variables.colors.lightBlueDim};
  border-radius: ${variables.borderRadius}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ pressed }) =>
    pressed ? variables.colors.lightWhiteOnHover : variables.colors.white};
`;

export const CheckboxContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: 10px;
  padding-right: 8px;
  border-radius: ${variables.borderRadius}px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  z-index: 1;
`;

export const Checkbox = styled(BaseCheckbox).attrs(({ priority }) => ({
  activeOpacity: 0.6,
  uncheckedColor:
    priority === 'high' ? variables.colors.yellow : variables.colors.brightBlue,
}))`
  width: 22px;
  height: 22px;
`;

export const Name = styled.Text`
  ${({ lineThrough, dim }) => css`
    padding-left: 4px;
    font-size: 16px;

    color: ${variables.colors.darkBlue};
    text-decoration: ${lineThrough ? 'line-through' : 'none'};

    flex: 1;
    opacity: ${dim ? 0.4 : 1};
  `}
`;

export const ClickableArea = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  border-radius: ${variables.borderRadius}px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  position: absolute;
  top: 0;
  left: 40px;
  bottom: 0;
  right: 0;
  z-index: 0;
`;
