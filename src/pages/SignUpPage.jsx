import * as SecureStore from 'expo-secure-store';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ValidationError } from 'yup';

import { Logo } from '~/assets';
import { useAccountContext } from '~/contexts/AccountContext';
import { useAuthContext } from '~/contexts/AuthContext';
import accountsServices from '~/services/accounts';
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
  GlobalAlert,
} from '~/styles/pages/SignUpPageStyles';
import { storageKeys } from '~/utils/local';
import network from '~/utils/network';
import validate from '~/utils/validation';

const SignUpPage = ({ navigation }) => {
  const { setAccountData } = useAccountContext();
  const { setTokens } = useAuthContext();

  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
  const [globalAlertMessage, setGlobalAlertMessage] = useState(null);

  const getFormData = useCallback(
    () => ({
      firstName: firstNameInputRef.current?.value,
      lastName: lastNameInputRef.current?.value,
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
    }),
    [],
  );

  const signUpAccount = useCallback(
    async (accountData) => {
      const responseData = await accountsServices.signUp(accountData);
      const { account, accessToken, refreshToken } = responseData;

      setAccountData(account);
      setTokens({ accessToken, refreshToken });

      await SecureStore.setItemAsync(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    [setAccountData, setTokens],
  );

  const validateConfirmedPassword = useCallback(async (confirmedPassword) => {
    await validate.requiredTextField(confirmedPassword);

    const password = passwordInputRef.current?.value;
    const passwordsDidMatch = password === confirmedPassword;

    if (!passwordsDidMatch) {
      throw new ValidationError('As senhas não conferem');
    }
  }, []);

  const allFieldsAreValid = useCallback(async () => {
    const inputRefs = [
      firstNameInputRef,
      lastNameInputRef,
      emailInputRef,
      passwordInputRef,
      confirmPasswordInputRef,
    ];

    const validationResults = await Promise.all(
      inputRefs.map((inputRef) => inputRef.current?.validate()),
    );

    return validationResults.every((result) => result === true);
  }, []);

  const handleSignUpError = useCallback((error) => {
    const errorType = network.getErrorType(error.response);
    const message = network.generateFeedbackMessage(errorType);
    setGlobalAlertMessage(message);
  }, []);

  const handleSubmit = useCallback(async () => {
    const isValidSubmit = await allFieldsAreValid();
    if (!isValidSubmit) return;

    setGlobalAlertMessage(null);
    setIsLoadingSignUp(true);
    const { firstName, lastName, email, password } = getFormData();

    try {
      await signUpAccount({ firstName, lastName, email, password });
    } catch (error) {
      setIsLoadingSignUp(false);
      handleSignUpError(error);
    }
  }, [signUpAccount, allFieldsAreValid, getFormData, handleSignUpError]);

  const handleLastInputSubmitEditing = useCallback(() => {
    const inputsAreNotEmpty = [
      firstNameInputRef,
      lastNameInputRef,
      emailInputRef,
      passwordInputRef,
      confirmPasswordInputRef,
    ].every((ref) => ref.current?.value.length > 0);

    if (inputsAreNotEmpty) {
      handleSubmit();
    }
  }, [handleSubmit]);

  useEffect(() => {
    const clearEntriesAndAlerts = () => {
      setGlobalAlertMessage(null);

      [
        firstNameInputRef,
        lastNameInputRef,
        emailInputRef,
        passwordInputRef,
        confirmPasswordInputRef,
      ].forEach((ref) => {
        ref.current?.clear();
        ref.current?.clearAlert();
      });
    };

    navigation.addListener('focus', clearEntriesAndAlerts);

    return () => navigation.removeListener('focus', clearEntriesAndAlerts);
  }, [navigation]);

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
          <TwoColumnInputSection>
            <Input
              ref={firstNameInputRef}
              label="Nome"
              placeholder="Nome"
              validate={validate.requiredTextField}
              onSubmitEditing={() => lastNameInputRef.current?.focus()}
              blurOnSubmit={false}
              twoInput
            />
            <Input
              ref={lastNameInputRef}
              label="Sobrenome"
              placeholder="Sobrenome"
              validate={validate.requiredTextField}
              onSubmitEditing={() => emailInputRef.current?.focus()}
              blurOnSubmit={false}
              twoInput
            />
          </TwoColumnInputSection>
          <Input
            ref={emailInputRef}
            label="Email"
            placeholder="nome@dominio.com"
            keyboardType="email-address"
            validate={validate.requiredEmailField}
            onSubmitEditing={() => passwordInputRef.current?.focus()}
            blurOnSubmit={false}
            spaced
          />
          <TwoColumnInputSection spaced>
            <Input
              ref={passwordInputRef}
              label="Senha"
              placeholder="********"
              secureTextEntry
              validate={(password) =>
                validate.requiredPasswordField(password, 8)
              }
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              blurOnSubmit={false}
              twoInput
            />
            <Input
              ref={confirmPasswordInputRef}
              label="Confirmar senha"
              placeholder="********"
              secureTextEntry
              validate={validateConfirmedPassword}
              onSubmitEditing={handleLastInputSubmitEditing}
              twoInput
            />
          </TwoColumnInputSection>
          {globalAlertMessage && <GlobalAlert message={globalAlertMessage} />}
        </SignUpForm>
      </Main>
      <Footer>
        <LoginAccountLink onPress={navigateToLoginPage}>
          <LoginAccountLinkText>Já tem uma conta?</LoginAccountLinkText>
        </LoginAccountLink>

        <SubmitButton
          loading={isLoadingSignUp}
          icon={<ArrowIcon />}
          onPress={handleSubmit}
        />

        <FooterBottomColor />
      </Footer>
    </Container>
  );
};

export default SignUpPage;
