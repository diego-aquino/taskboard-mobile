import styled from 'styled-components/native';

import variables from '~/styles/variables';

export const Container = styled.View`
  margin: 24px 0;
`;

export const CheckboxOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;
  align-items: center;

  margin-top: ${({ spaced }) => (spaced ? 4 : 0)}px;
`;

export const CheckboxOptionLabel = styled.Text`
  padding: 0 6px;
  flex: 1;

  color: ${variables.colors.lightBlue};
  font-family: ${variables.fonts.medium};
  font-size: 14px;
`;
