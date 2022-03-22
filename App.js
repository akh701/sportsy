import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import LoginScreen from './screens/LoginScreen';
import UserProfile from './screens/UserProfile';
import Header from './screens/globalScreens/Header';
import MainContainer from './navigation/MainContainer';

const Stack = createNativeStackNavigator();

// fixed minor issue

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="Profile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
      <MainContainer />
    </>
  );
}
