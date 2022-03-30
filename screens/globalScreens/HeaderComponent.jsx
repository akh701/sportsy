import React from 'react';
import {
  View, Image, StyleSheet, Dimensions, Text,
} from 'react-native';

const win = Dimensions.get('window');

function HeaderComponent() {
  // return (
  //   <View><Text style={{ fontSize: 45, fontWeight: 'bold', alignSelf: 'center' }}>Sportsy</Text></View>
  // );
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
    // padding: 150,
    // top: 0,
    // left: 0,
    // borderWidth: 1,
    // borderRadius: 20,
  },
});
