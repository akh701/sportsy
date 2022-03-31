import * as React from 'react';
import {
  View, Text, StyleSheet, Image, Dimensions, ImageBackground,
} from 'react-native';
// import Header from './globalScreens/HeaderComponent';

const staticImage = require('./globalScreens/LadingP.png');

export default function LandingScreen({ navigation }) {
  return (

    <View style={styles.container}>
      {/* <Header /> */}

      <ImageBackground source={staticImage} style={styles.image}>
        <Text style={styles.text}>
          Hello and Welcome to Sportsy! The best app ever to find friends to play sport with!
        </Text>
      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  text: {
    marginTop: '65%',
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#115E63',
    fontSize: 20,
    backgroundColor: '#C1FAD7',

  },
});
