import AppLoading from 'expo-app-loading';
import React from 'react';

import { AccountContextProvider } from '~/contexts/AccountContext';
import { AuthContextProvider } from '~/contexts/AuthContext';
import { useFonts } from '~/hooks';
import AppRoutes from '~/routes';
import { Container } from '~/styles/AppStyles';
import { StatusBar } from '~/styles/global';

const App = () => {
  const [fontsAreLoaded] = useFonts();

  if (!fontsAreLoaded) {
    return <AppLoading />;
  }

  return (
    <Container>
      <StatusBar variant="light" />
      <AuthContextProvider>
        <AccountContextProvider>
          <AppRoutes />
        </AccountContextProvider>
      </AuthContextProvider>
    </Container>
  );
};

export default App;
