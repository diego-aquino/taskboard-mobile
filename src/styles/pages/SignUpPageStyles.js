import styled, { css } from 'styled-components/native';

import { ArrowIcon as BaseArrowIcon } from '~/assets';
import { Button, Input as BaseInput} from '~/components/common';
import variables from '~/styles/variables';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 16,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
})``;

export const Header = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeftSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderRightSection = styled.View`
  height: 25px;
  width: 90px;
  justify-content: flex-end;
`;

export const HeaderLinkText = styled.Text`
  padding: 8px 0;
  border: 2px solid transparent;

  font-size: 18px;
  font-family: ${variables.fonts.bold};
  color: ${variables.colors.darkBlue};

  ${({ active }) =>
    active &&
    css`
      color: ${variables.colors.brightBlue};
      border-bottom-color: ${variables.colors.brightBlue};
    `}

  ${({ spaced }) =>
    spaced &&
    css`
      margin-right: 24px;
    `}
`;

export const Main = styled.View`
  width: 100%;
  padding: 48px 24px;
  flex: 1;
`;

export const SignUpForm = styled.View`
  flex: 1;
`;

export const TwoColumnInputSection = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  width: 45%;
`;

export const Input = styled(BaseInput).attrs(({ spaced, twoInput }) => ({
  containerStyle: {
    marginTop: spaced ? 30: 0,
    marginRight: twoInput ? 30: 0,
  },
}))``;

export const PageTitle = styled.Text`
  margin-bottom: 12px;

  color: ${variables.colors.darkBlue};
  font-family: ${variables.fonts.bold};
  font-size: 36px;
`;

export const PageDescription = styled.Text`
  margin-bottom: 36px;
  color: ${variables.colors.lightBlue};
  font-size: 18px;
`;

export const Footer = styled.View`
  width: 100%;
`;

export const LoginAccountLink = styled.TouchableOpacity`
  align-self: flex-start;
`;

export const LoginAccountLinkText = styled.Text`
  margin-bottom: 16px;
  padding: 0 24px;

  color: ${variables.colors.brightBlue};
  font-size: 14px;
`;

export const ArrowIcon = styled(BaseArrowIcon)`
  margin-top: 1px;
`;

export const FooterBottomColor = styled.View`
  z-index: -1;
  height: 64px;
  background-color: ${variables.colors.darkBlue};
`;

export const SubmitButton = styled(Button)`
  padding: 14px;

  position: absolute;
  right: 24px;
  bottom: 40px;
`;