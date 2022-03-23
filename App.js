import { View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import HeaderComponent from './screens/globalScreens/HeaderComponent';
import MainContainer from './navigation/MainContainer';
import ProfileEditScreen from './screens/ProfileEditScreen';
import { UserContext } from './contexts/UserContext';

const Stack = createNativeStackNavigator();

// fixed minor issue

export default function App() {
  const [userData, setUserData] = useState({});
  return (
    <UserContext.Provider value={{ userData, setUserData }}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="editProfile" component={ProfileEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <SafeAreaView>
        <View fixed="top">
          <HeaderComponent />
        </View>
      </SafeAreaView>

      <MainContainer />

    </UserContext.Provider>
  );
}
