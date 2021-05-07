import React, { useCallback, useRef, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';

import { ArrowIcon } from '~/assets';
import { Alert, Button, Input } from '~/components/common';
import styles from '~/styles/pages/LoginPageStyles';
import * as validate from '~/utils/validation';

const LoginPage = ({ navigation }) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [globalAlertMessage, setGlobalAlertMessage] = useState(null);

  const gatherFormData = useCallback(
    () => ({
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
    }),
    [],
  );

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

    const { email, password } = gatherFormData();

    console.log({ email, password });
  }, [allFieldsAreValid, gatherFormData]);

  const handleInputEndEditing = useCallback(() => {
    const { email, password } = gatherFormData();

    const areNotEmpty = [email, password].every((item) => item.length > 0);
    if (areNotEmpty) {
      handleSubmit();
    }
  }, [gatherFormData, handleSubmit]);

  const navigateToSignUpPage = useCallback(
    () => navigation.navigate('SignUpPage'),
    [navigation],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text
            style={[
              styles.headerLinkText,
              styles.activeHeaderLinkText,
              { marginRight: 24 },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToSignUpPage}>
          <Text style={styles.headerLinkText}>Registre-se</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <Text style={styles.pageTitle}>Login</Text>
        <Text style={styles.pageDescription}>Seja bem vindo de volta!</Text>

        <View style={styles.loginForm}>
          <Input
            ref={emailInputRef}
            style={{ marginBottom: 16 }}
            label="Email"
            placeholder="nome@dominio.com"
            autoCompleteType="email"
            keyboardType="email-address"
            validate={validate.requiredEmailField}
            onEndEditing={handleInputEndEditing}
          />
          <Input
            ref={passwordInputRef}
            label="Senha"
            placeholder="********"
            autoCompleteType="password"
            secureTextEntry
            validate={(password) => validate.requiredPasswordField(password, 8)}
            onEndEditing={handleInputEndEditing}
          />

          {globalAlertMessage && <Alert message={globalAlertMessage} />}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.registerAccountLink}
          onPress={navigateToSignUpPage}
        >
          <Text style={styles.registerAccountLinkText}>
            Deseja criar uma nova conta?
          </Text>
        </TouchableOpacity>

        <View style={styles.footerBottomDetail}>
          <Button
            style={styles.submitButton}
            onPress={handleSubmit}
            icon={<ArrowIcon style={styles.arrowIcon} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginPage;
