import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// screens
import CreateAccountScreen from '../userScreens/createAccountScreen';
import LandingScreen from '../userScreens/LandingScreen';
import LoginScreen from '../userScreens/LoginScreen';

// screen names
const createAccountName = 'CreateAccount';
const loginName = 'Login';
const landingName = 'Landing';

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <NavigationContainer>

      <Tab.Navigator
        initialRouteName={landingName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const rn = route.iconName;

            if (rn === landingName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === loginName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === createAccountName) {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={landingName} component={LandingScreen} />
        <Tab.Screen name={loginName} component={LoginScreen} />
        <Tab.Screen name={createAccountName} component={CreateAccountScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
