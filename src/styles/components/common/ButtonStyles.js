import { Animated } from 'react-native';
import styled from 'styled-components/native';

import { LoadingIcon as BaseLoadingIcon } from '~/assets';
import variables from '~/styles/variables';

export const Container = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  padding: 12px;
  border-radius: ${variables.borderRadius}px;

  align-items: center;
  justify-content: center;

  background-color: ${variables.colors.brightBlue};

  opacity: ${({ dim }) => (dim ? 0.7 : 1)};
`;

export const ContentWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const Label = styled.Text`
  color: ${variables.colors.white};
  font-family: ${variables.fonts.medium};

  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
`;

export const IconWrapper = styled.View`
  margin-left: ${({ spaced }) => (spaced ? '8px' : 0)};
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
`;

export const LoadingIconWrapper = styled(Animated.View)`
  position: absolute;
  top: 12px;
  left: 12px;
  bottom: 12px;
  right: 12px;
`;

export const LoadingIcon = styled(BaseLoadingIcon).attrs({
  containerStyle: {
    position: 'absolute',
    alignSelf: 'center',
  },
})``;
