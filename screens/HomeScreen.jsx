import * as React from 'react';
import { View, Text } from 'react-native';
// import Header from './globalScreens/HeaderComponent';

export default function HomeScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('This is the "home" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Home page for logged in users

      </Text>
    </View>
  );
}