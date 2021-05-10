import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginPage, SignUpPage } from '~/pages';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="LoginPage" component={LoginPage} />
    <AuthStack.Screen name="SignUpPage" component={SignUpPage} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
