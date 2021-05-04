import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { Dashboard } from '~/pages';
import styles from '~/styles/AppStyles';
import variables from '~/styles/variables';

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar
      barStyle="dark-content"
      backgroundColor={variables.colors.white}
    />
    <Dashboard />
  </SafeAreaView>
);

export default App;
