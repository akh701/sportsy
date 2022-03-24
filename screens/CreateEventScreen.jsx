import * as React from 'react';
import { View, Text } from 'react-native';
import Header from './globalScreens/HeaderComponent';

export default function CreateEventScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text
        onPress={() => alert('This is the create event screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Page to create events

      </Text>
    </View>
  );
}
