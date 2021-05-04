import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import StackRoutes from './StackRoutes';

const AppRoutes = () => (
  <NavigationContainer>
    <StackRoutes />
  </NavigationContainer>
);

export default AppRoutes;
