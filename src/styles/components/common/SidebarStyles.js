import { Dimensions, Animated } from 'react-native';
import styled from 'styled-components/native';

import variables from '~/styles/variables';

export const Container = styled(Animated.View)`
  width: ${Dimensions.get('screen').width * 0.75}px;
  flex: 1;
  padding: 48px 24px 24px;

  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 9997;

  background-color: ${variables.colors.darkBlue};
`;
