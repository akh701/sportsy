import * as React from 'react';
import { View, Text } from 'react-native';
import Header from './globalScreens/Header';

export default function LandingScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Header />
      <Text
        onPress={() => alert('This is the "landing" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Hello and Welcome to Sportsy! The best app ever to find friends to play sport with!

      </Text>
    </View>
  );
}
