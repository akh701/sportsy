import * as React from 'react';
import { View, Text } from 'react-native';
// import Header from './globalScreens/HeaderComponent';

export default function FindEventsScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Header /> */}
      <Text
        onPress={() => alert('This is the find event screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Page to find events

      </Text>
    </View>
  );
}
