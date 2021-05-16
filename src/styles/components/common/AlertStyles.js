import styled from 'styled-components/native';

import { AlertIcon as BaseAlertIcon } from '~/assets';
import variables from '~/styles/variables';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AlertIcon = styled(BaseAlertIcon)`
  margin-right: 6px;
`;

export const Message = styled.Text`
  flex-shrink: 1;

  color: ${variables.colors.lightRed};
  font-family: ${variables.fonts.medium};
  font-size: 14px;
`;
