// navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
