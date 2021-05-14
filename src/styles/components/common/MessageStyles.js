import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import variables from '~/styles/variables';

export const Container = styled(Animated.View)`
  width: ${Dimensions.get('screen').width}px;
  padding: 16px 24px;

  position: absolute;
  bottom: 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 9996;

  background-color: ${variables.colors.darkBlue};
`;

export const ContentWrapper = styled.Text`
  font-size: 16px;
  color: ${variables.colors.white};
`;

export const ClickableBackground = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  z-index: -1;
`;
