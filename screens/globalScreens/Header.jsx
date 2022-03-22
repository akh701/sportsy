import React from 'react';
import {
  View, Image, StyleSheet, Dimensions,
} from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {

  },
  headerLogo: {
    width: win.width,
    height: win.width / 2,
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'relative',
    top: -350,
    left: 0,
    // borderWidth: 1,
    // borderRadius: 20,
  },
});

function Header() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.headerLogo}
        source={require('./sportslogo2.png')}
      />
    </View>
  );
}

export default Header;
