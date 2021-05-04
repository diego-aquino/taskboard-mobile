import AppLoading from 'expo-app-loading';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { useFonts } from '~/hooks';
import { Dashboard } from '~/pages';
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
      <Dashboard />
    </SafeAreaView>
  );
};

export default App;
