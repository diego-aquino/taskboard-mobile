import styled from 'styled-components/native';

import { ChevronIcon as BaseChevronIcon } from '~/assets';
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

export const ChevronIcon = styled(BaseChevronIcon).attrs({
  width: 24,
  height: 24,
})``;
