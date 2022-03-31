import React from 'react';
import {
  View, Image, StyleSheet, Dimensions, Text,
} from 'react-native';

const win = Dimensions.get('window');

function HeaderComponent() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.headerLogo}
        source={require('./sportslogo2.png')}
      />
    </View>
  );
}

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {

  },
  headerLogo: {
    width: win.width,
    height: 70,
  },
});
