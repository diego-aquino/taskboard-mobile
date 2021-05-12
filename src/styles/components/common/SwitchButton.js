import styled, { css } from 'styled-components/native';

import variables from '~/styles/variables';

export const Container = styled.View`
  padding: 4px;
  border-radius: 100px;

  flex-direction: row;
  justify-content: space-between;

  background-color: ${variables.colors.veryLightBlue};
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  ${({ active }) => css`
    padding: 10px 20px;
    border-radius: 100px;
    border: 1px solid ${active ? variables.colors.lightBlueDim : 'transparent'};

    background-color: ${active ? variables.colors.white : 'transparent'};
  `}
`;

export const OptionLabel = styled.Text`
  ${({ active }) => css`
    color: ${active ? variables.colors.darkBlue : variables.colors.lightBlue};
    font-family: ${variables.fonts.bold};
    font-size: 14px;
  `}
`;
