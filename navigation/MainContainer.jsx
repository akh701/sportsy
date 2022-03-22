import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/HomeScreen';
import FindEventsScreen from '../screens/FindEventsScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

// Screen names, will be used as text for the buttons
const landingName = 'Home';
const loginRegisterName = 'Login/Register';
const homeName = 'Home';
const findEventsName = 'Find Event';
const myEventsName = 'My Events';
const createEventName = 'Create Event';
const myProfileName = 'Profile';

const Tab = createBottomTabNavigator();

function MainContainer() {
  // if (something) {
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
            } else if (rn === loginRegisterName) {
              iconName = focused ? 'log-in' : 'log-in-outline';
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

        <Tab.Screen name={landingName} component={LandingScreen} options={{ headerShown: false }} />
        <Tab.Screen name={loginRegisterName} component={LoginScreen} options={{ headerShown: false }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default MainContainer;
