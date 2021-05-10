import styled, { css } from 'styled-components/native';

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

export const CheckMarkButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  padding: 10px;
  padding-right: 8px;
  border-radius: ${variables.borderRadius}px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  z-index: 1;
`;

export const CheckMark = styled.View`
  ${({ priority, checked }) => css`
    width: 22px;
    height: 22px;
    border-radius: 11px;
    border-width: 2px;
    border-style: solid;

    ${priority === 'high' &&
    css`
      border-color: ${variables.colors.yellow};
    `}

    ${priority === 'low' &&
    css`
      border-color: ${variables.colors.brightBlue};
    `}

    ${checked &&
    css`
      padding: 2px;
      border: none;

      flex-direction: row;
      align-items: center;
      justify-content: center;

      background-color: ${variables.colors.green};
    `}
  `}
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
