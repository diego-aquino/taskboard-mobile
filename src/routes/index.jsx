import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { LoadingScreen } from '~/components/common';
import { useAuthContext } from '~/contexts/AuthContext';
import { useGlobalSettings } from '~/contexts/GlobalSettingsContext';

import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import WelcomeRoutes from './WelcomeRoutes';

const Routes = () => {
  const { isAuthenticated, isLoading: isLoadingAuth } = useAuthContext();
  const { isLoadingFirstAccess, isFirstAccess } = useGlobalSettings();

  if (isLoadingFirstAccess) {
    return <LoadingScreen />;
  }

  if (isFirstAccess) {
    return (
      <NavigationContainer>
        <WelcomeRoutes />
      </NavigationContainer>
    );
  }

  if (isLoadingAuth) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
