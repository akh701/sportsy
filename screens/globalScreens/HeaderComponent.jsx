import React from 'react';
import {
  View, Image, StyleSheet, Dimensions, Text,
} from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {

  },
  headerLogo: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    // top: 0,
    // left: 0,
    // borderWidth: 1,
    // borderRadius: 20,
  },
});

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
