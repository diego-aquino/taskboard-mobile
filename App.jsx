import AppLoading from 'expo-app-loading';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { AccountContextProvider } from '~/contexts/AccountContext';
import { AuthContextProvider } from '~/contexts/AuthContext';
import { useFonts } from '~/hooks';
import AppRoutes from '~/routes';
import styles from '~/styles/AppStyles';
import variables from '~/styles/variables';

const App = () => {
  const [fontsAreLoaded] = useFonts();

  if (!fontsAreLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={variables.colors.white}
      />
      <AuthContextProvider>
        <AccountContextProvider>
          <AppRoutes />
        </AccountContextProvider>
      </AuthContextProvider>
    </SafeAreaView>
  );
};

export default App;
