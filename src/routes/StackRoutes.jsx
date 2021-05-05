import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { DashboardPage, LoginPage, SignUpPage } from '~/pages';
import variables from '~/styles/variables';

const { Navigator, Screen } = createStackNavigator();

const StackRoutes = () => (
  <Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: variables.colors.white,
    }}
  >
    <Screen name="DashboardPage" component={DashboardPage} />
    <Screen name="LoginPage" component={LoginPage} />
    <Screen name="SignUpPage" component={SignUpPage} />
  </Navigator>
);

export default StackRoutes;
