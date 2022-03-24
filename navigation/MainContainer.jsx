import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// Screens
import LoginScreen from '../screens/LoginScreen';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/HomeScreen';
import FindEventsScreen from '../screens/FindEventsScreen';
import MyEventsScreen from '../screens/MyEventsScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import GlobalStack from './GlobalStack';

// Screen names, will be used as text for the buttons
const landingName = 'Home';
const loginRegisterName = 'Login/Register';
const homeName = 'Home';
const findEventsName = 'Find Event';
const myEventsName = 'My Events';
const createEventName = 'Create Event';
const myProfileName = 'Profile';

const Tab = createBottomTabNavigator();

// Main function of component

function MainContainer() {
  const [userSignedIn, setUserSignedIn] = useState('No');
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSignedIn('Yes');
      } else {
        setUserSignedIn('No');
      }
    });
  }, []);
  if (userSignedIn === 'No') {
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
  } return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            const rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === findEventsName) {
              iconName = focused ? 'search' : 'search-outline';
            } else if (rn === myEventsName) {
              iconName = focused ? 'list' : 'list-outline';
            } else if (rn === createEventName) {
              iconName = focused ? 'create' : 'create-outline';
            } else if (rn === myProfileName) {
              iconName = focused ? 'person' : 'person-outline';
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

        <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name={findEventsName} component={FindEventsScreen} options={{ headerShown: false }} />
        <Tab.Screen name={myEventsName} component={MyEventsScreen} options={{ headerShown: false }} />
        <Tab.Screen name={createEventName} component={CreateEventScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={UserProfileScreen} options={{ headerShown: false }} />
        <Tab.Screen name="GlobalStack" component={GlobalStack} options={{ headerShown: false, tabBarButton: () => null }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default MainContainer;
