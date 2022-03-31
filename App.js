import { View, SafeAreaView, LogBox } from 'react-native';
import React, { useState } from 'react';
import HeaderComponent from './screens/globalScreens/HeaderComponent';
import MainContainer from './navigation/MainContainer';
import { UserContext } from './contexts/UserContext';

export default function App() {
  LogBox.ignoreAllLogs();
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userData, setUserData] = useState(null);
  return (

    <UserContext.Provider value={{
      loggedInUser, setLoggedInUser, userData, setUserData,
    }}
    >
      <SafeAreaView>
        <View fixed="top">
          <HeaderComponent />
        </View>
      </SafeAreaView>
      <MainContainer />

    </UserContext.Provider>
  );
}
