import { View, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import HeaderComponent from './screens/globalScreens/HeaderComponent';
import MainContainer from './navigation/MainContainer';
import { UserContext } from './contexts/UserContext';
import GlobalStack from './navigation/GlobalStack';

// fixed minor issue

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userData, setUserData] = useState(null);
  return (
    <UserContext.Provider value={{
      loggedInUser, setLoggedInUser, userData, setUserData,
    }}
    >
      <SafeAreaView>
        <View fixed="top">
          {/* <HeaderComponent /> */}
        </View>
      </SafeAreaView>
      {/* <GlobalStack /> */}
      <MainContainer />

    </UserContext.Provider>
  );
}
