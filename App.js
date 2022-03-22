// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Testscreen from './screens/Testscreen';
// import Header from './screens/globalScreens/Header';
// import NavBar from './screens/globalScreens/NavBar';

// export default function App() {
//   return (
//     <View>
//       <Header />
//       {/* <Testscreen /> */}
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//       <NavBar />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Header from './screens/globalScreens/Header';
import MainContainer from './navigation/MainContainer';

function App() {
  return (

    <MainContainer />

  );
}

export default App;
