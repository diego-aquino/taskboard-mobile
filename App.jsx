import 'react-native-gesture-handler';
import SplashScreen from 'expo-app-loading';
import React from 'react';

import { AccountContextProvider } from '~/contexts/AccountContext';
import { AuthContextProvider } from '~/contexts/AuthContext';
import { useFonts } from '~/hooks';
import Routes from '~/routes';
import { Container } from '~/styles/AppStyles';

const App = () => {
  const [fontsAreLoaded] = useFonts();

  if (!fontsAreLoaded) {
    return <SplashScreen />;
  }

  return (
    <AuthContextProvider>
      <AccountContextProvider>
        <Container>
          <Routes />
        </Container>
      </AccountContextProvider>
    </AuthContextProvider>
  );
};

export default App;
