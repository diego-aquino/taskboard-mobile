import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { Input as BaseInput } from '~/components/common';

export const Container = styled.View`
  width: ${Dimensions.get('screen').width - 64}px;
  padding: 8px;
`;

export const Input = styled(BaseInput)`
  font-size: 20px;
  padding: 12px 0;
`;
