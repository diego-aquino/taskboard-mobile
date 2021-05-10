import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { DashboardPage } from '~/pages';

const AppStack = createStackNavigator();

const AppRoutes = () => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen name="DashboardPage" component={DashboardPage} />
  </AppStack.Navigator>
);

export default AppRoutes;
