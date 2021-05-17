import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { WelcomePage } from '~/pages';

const WelcomeStack = createStackNavigator();

const WelcomeRoutes = () => (
  <WelcomeStack.Navigator headerMode="none">
    <WelcomeStack.Screen name="WelcomePage" component={WelcomePage} />
  </WelcomeStack.Navigator>
);

export default WelcomeRoutes;
