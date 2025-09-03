// navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';

// Only enable react-native-screens on native platforms
if (Platform.OS === 'ios' || Platform.OS === 'android') {
  enableScreens();
}  


import SignIn from './screens/SignIn';
import Home from './screens/Home'
import SignUp from './screens/SignUp';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home Page' }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In' }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
