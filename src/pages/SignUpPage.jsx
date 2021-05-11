import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { Logo } from '~/assets';
import { StatusBar } from '~/styles/global';
import {
  Container,
  TwoColumnInputSection,
  HeaderLeftSection,
  HeaderLinkText,
  HeaderRightSection,
  LoginAccountLink,
  LoginAccountLinkText,
  SignUpForm,
  Main,
  Footer,
  SubmitButton,
  PageTitle,
  PageDescription,
  FooterBottomColor,
  Input,
  ArrowIcon,
  Header,
} from '~/styles/pages/SignUpPageStyles';
import validate from '~/utils/validation';

const SignUpPage = ({ navigation }) => {
  const navigateToLoginPage = useCallback(
    () => navigation.navigate('LoginPage'),
    [navigation],
  );

  return (
    <Container>
      <StatusBar variant="light" />

      <Header>
        <HeaderLeftSection>
          <TouchableOpacity onPress={navigateToLoginPage}>
            <HeaderLinkText spaced>Login</HeaderLinkText>
          </TouchableOpacity>
          <TouchableOpacity>
            <HeaderLinkText active>Registre-se</HeaderLinkText>
          </TouchableOpacity>
        </HeaderLeftSection>

        <HeaderRightSection>
          <Logo />
        </HeaderRightSection>
      </Header>
      <Main>
        <PageTitle>Registre-se</PageTitle>
        <PageDescription>
          E gerencie suas tarefas com eficiência!
        </PageDescription>

        <SignUpForm>
          <TwoColumnInputSection spaced>
            <Input
              label="Nome"
              placeholder="Nome"
              validate={validate.requiredTextField}
              twoInput
            />
            <Input
              label="Sobrenome"
              placeholder="Sobrenome"
              validate={validate.requiredTextField}
              twoInput
            />
          </TwoColumnInputSection>
          <Input
            label="Email"
            placeholder="nome@dominio.com"
            keyboardType="email-address"
            validate={validate.requiredEmailField}
            spaced
          />
          <TwoColumnInputSection spaced>
            <Input
              label="Senha"
              placeholder="********"
              secureTextEntry
              validate={(password) =>
                validate.requiredPasswordField(password, 8)
              }
              twoInput
            />
            <Input
              label="Confirmar senha"
              placeholder="********"
              secureTextEntry
              validate={(password) =>
                validate.requiredPasswordField(password, 8)
              }
              twoInput
            />
          </TwoColumnInputSection>
        </SignUpForm>
      </Main>
      <Footer>
        <LoginAccountLink onPress={navigateToLoginPage}>
          <LoginAccountLinkText>Já tem uma conta?</LoginAccountLinkText>
        </LoginAccountLink>

        <SubmitButton icon={<ArrowIcon />} />

        <FooterBottomColor />
      </Footer>
    </Container>
  );
};

export default SignUpPage;
