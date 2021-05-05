import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from '~/styles/pages/DashboardPageStyles';

const DashboardPage = ({ navigation }) => {
  const navigateToLoginPage = useCallback(() => {
    navigation.navigate('LoginPage');
  }, [navigation]);

  const navigateToSignUpPage = useCallback(() => {
    navigation.navigate('SignUpPage');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>

      <TouchableOpacity onPress={navigateToLoginPage}>
        <Text>Página de Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToSignUpPage}>
        <Text>Página de Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardPage;
