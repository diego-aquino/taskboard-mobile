import styled from 'styled-components/native';

import { ChevronUpIcon } from '~/assets';
import variables from '~/styles/variables';

export const Container = styled.View`
  padding: 8px;
`;

export const Title = styled.Text`
  margin: 16px 0 24px;

  color: ${variables.colors.darkBlue};
  font-family: ${variables.fonts.bold};
  font-size: 22px;
  text-align: center;
`;

export const SortingOrderContainer = styled.View`
  margin: 24px 0;
`;

export const CheckboxOption = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;
  align-items: center;

  margin-top: ${({ spaced }) => (spaced ? 6 : 0)}px;
`;

export const CheckboxOptionLabel = styled.Text`
  padding: 0 6px;
  flex: 1;

  color: ${variables.colors.lightBlue};
  font-family: ${variables.fonts.medium};
  font-size: 14px;
`;

export const ChevronDownIcon = styled(ChevronUpIcon)`
  transform: rotate(-180deg);
`;
