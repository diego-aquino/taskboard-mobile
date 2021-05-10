import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Logo } from '~/assets';
import { useAuthContext } from '~/contexts/AuthContext';
import accountsServices from '~/services/accounts';
import { StatusBar } from '~/styles/global';
import {
  Container,
  Header,
  HeaderLeftSection,
  HeaderRightSection,
  HeaderLinkText,
  Main,
  LoginForm,
  Input,
  PageTitle,
  PageDescription,
  GlobalAlert,
  Footer,
  RegisterAccountLink,
  RegisterAccountLinkText,
  ArrowIcon,
  FooterBottomDetail,
  SubmitButton,
} from '~/styles/pages/LoginPageStyles';
import { storageKeys } from '~/utils/local';
import network from '~/utils/network';
import validate from '~/utils/validation';

const LoginPage = ({ navigation }) => {
  const { setTokens } = useAuthContext();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [globalAlertMessage, setGlobalAlertMessage] = useState(null);

  const gatherFormData = useCallback(
    () => ({
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
    }),
    [],
  );

  const loginAccount = useCallback(
    async (email, password) => {
      const responseData = await accountsServices.login(email, password);
      const { accessToken, refreshToken } = responseData;
      setTokens({ accessToken, refreshToken });

      await AsyncStorage.setItem(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    [setTokens],
  );

  const handleLoginError = useCallback((error) => {
    const errorType = network.getErrorType(error.response);
    const feedbackMessage = network.generateFeedbackMessage(errorType);
    setGlobalAlertMessage(feedbackMessage);
  }, []);

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [emailInputRef, passwordInputRef];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate()),
    );

    return validationResults.every((result) => result === true);
  }, []);

  const handleSubmit = useCallback(async () => {
    const isValidSubmit = await allFieldsAreValid();
    if (!isValidSubmit) return;

    setGlobalAlertMessage(null);
    const { email, password } = gatherFormData();

    try {
      setIsLoadingLogin(true);
      await loginAccount(email, password);
      navigation.navigate('DashboardPage');
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsLoadingLogin(false);
    }
  }, [
    allFieldsAreValid,
    gatherFormData,
    handleLoginError,
    loginAccount,
    navigation,
  ]);

  const handleEmailSubmitEditing = useCallback(() => {
    passwordInputRef.current?.focus();
  }, []);

  const handlePasswordSubmitEditing = useCallback(() => {
    const inputsAreNotEmpty = [emailInputRef, passwordInputRef].every(
      (ref) => ref.current?.value.length > 0,
    );

    if (inputsAreNotEmpty) {
      handleSubmit();
    }
  }, [handleSubmit]);

  useEffect(() => {
    const clearEntriesAndAlerts = () => {
      setGlobalAlertMessage(null);

      [emailInputRef, passwordInputRef].forEach((ref) => {
        ref.current?.clear();
        ref.current?.clearAlert();
      });
    };

    navigation.addListener('focus', clearEntriesAndAlerts);

    return () => navigation.removeListener('focus', clearEntriesAndAlerts);
  }, [navigation]);

  const navigateToSignUpPage = useCallback(
    () => navigation.navigate('SignUpPage'),
    [navigation],
  );

  return (
    <Container>
      <StatusBar variant="dark" />

      <Header>
        <HeaderLeftSection>
          <TouchableOpacity>
            <HeaderLinkText active>Login</HeaderLinkText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToSignUpPage}>
            <HeaderLinkText spaced>Registre-se</HeaderLinkText>
          </TouchableOpacity>
        </HeaderLeftSection>

        <HeaderRightSection>
          <Logo />
        </HeaderRightSection>
      </Header>

      <Main>
        <PageTitle>Login</PageTitle>
        <PageDescription>Seja bem vindo de volta!</PageDescription>

        <LoginForm>
          <Input
            ref={emailInputRef}
            label="Email"
            placeholder="nome@dominio.com"
            autoCompleteType="email"
            keyboardType="email-address"
            blurOnSubmit={false}
            validate={validate.requiredEmailField}
            onSubmitEditing={handleEmailSubmitEditing}
          />
          <Input
            ref={passwordInputRef}
            label="Senha"
            placeholder="********"
            autoCompleteType="password"
            secureTextEntry
            validate={(password) => validate.requiredPasswordField(password, 8)}
            onSubmitEditing={handlePasswordSubmitEditing}
            spaced
          />

          {globalAlertMessage && <GlobalAlert message={globalAlertMessage} />}
        </LoginForm>
      </Main>

      <Footer>
        <RegisterAccountLink onPress={navigateToSignUpPage}>
          <RegisterAccountLinkText>
            Deseja criar uma nova conta?
          </RegisterAccountLinkText>
        </RegisterAccountLink>

        <SubmitButton
          loading={isLoadingLogin}
          icon={<ArrowIcon />}
          onPress={handleSubmit}
        />

        <FooterBottomDetail />
      </Footer>
    </Container>
  );
};

export default LoginPage;
