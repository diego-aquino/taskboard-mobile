import React, { useState } from 'react';
import { View } from 'react-native';

import { Button, Input } from '~/components/common';
import styles from '~/styles/pages/DashboardPageStyles';
import * as validate from '~/utils/validation';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        placeholder="nome@dominio.com"
        autoCompleteType="email"
        keyboardType="email-address"
        validate={validate.requiredEmailField}
      />
      <Input
        style={styles.spacing}
        label="Senha"
        placeholder="********"
        autoCompleteType="password"
        secureTextEntry
        validate={(value) => validate.requiredPasswordField(value, 8)}
      />

      <Input
        style={styles.spacing}
        label="Nome da tarefa"
        placeholder="Nome..."
        variant="outline"
        validate={validate.requiredTextField}
      />

      <Button
        style={styles.spacing}
        label={isLoading ? 'Loading...' : 'Ready'}
        loading={isLoading}
      />
      <Button
        style={styles.spacing}
        label={isLoading ? 'Stop loading' : 'Load'}
        onPress={() =>
          setIsLoading((currentLoadingState) => !currentLoadingState)
        }
      />
    </View>
  );
};

export default DashboardPage;
