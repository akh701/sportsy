import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import CreateAccountScreen from '../screens/CreateAccountScreen';
import LoginScreen from '../screens/LoginScreen';
import LandingScreen from '../screens/LandingScreen';

// Screen names
const landingName = 'Landing';
const loginName = 'Login';
const registerName = 'Register';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={landingName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const rn = route.name;

            if (rn === landingName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === loginName) {
              iconName = focused ? 'log-in' : 'log-in-outline';
            } else if (rn === registerName) {
              iconName = focused ? 'create' : 'create-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >

        <Tab.Screen name={landingName} component={LandingScreen} />
        <Tab.Screen name={loginName} component={LoginScreen} />
        <Tab.Screen name={registerName} component={CreateAccountScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
