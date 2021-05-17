import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { ChevronIcon as BaseChevronIcon } from '~/assets';
import { Button } from '~/components/common';
import variables from '~/styles/variables';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 48,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})``;

export const LogoWrapper = styled.View`
  width: ${Dimensions.get('screen').width * 0.14 * 3.75}px;
  height: ${Dimensions.get('screen').width * 0.14}px;
  padding: 0 24px;
  margin: 0 auto 32px;
`;

export const Title = styled.Text`
  margin-bottom: 24px;
  padding: 0 24px;

  color: ${variables.colors.darkBlue};
  font-family: ${variables.fonts.bold};
  font-size: 35px;
  text-align: center;
`;

export const ThemeImageWrapper = styled.View`
  width: ${Dimensions.get('screen').width - 84}px;
  height: ${(Dimensions.get('screen').width - 84) * 0.9}px;
  margin: 0 auto 24px;
  padding: 0 24px;
`;

export const Description = styled.Text`
  padding: 0 24px;

  color: ${variables.colors.lightBlue};
  font-size: 16px;
  text-align: center;
`;

export const Footer = styled.View`
  margin-top: 48px;
  justify-content: center;
`;

export const NextButton = styled(Button)`
  margin-bottom: -28px;
  align-self: center;
`;

export const FooterBottomDetail = styled.View`
  width: 100%;
  height: 69px;

  background-color: ${variables.colors.darkBlue};
  z-index: -1;
`;

export const ChevronIcon = styled(BaseChevronIcon).attrs({
  stroke: variables.colors.white,
  width: 32,
  height: 32,
})``;
