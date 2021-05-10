import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { LoadingScreen } from '~/components/common';
import { useAuth } from '~/contexts/AuthContext';

import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';

const Routes = () => {
  const { isAuthenticated, isLoading: isLoadingAuth } = useAuth();

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
