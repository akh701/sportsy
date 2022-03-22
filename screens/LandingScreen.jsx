import * as React from 'react';
import { View, Text } from 'react-native';

export default function LandingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('This is the "landing" screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Landing Screen

      </Text>
    </View>
  );
}
