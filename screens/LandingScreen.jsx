import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, Dimensions, ImageBackground,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

export default function LandingScreen() {
  const [images, setImages] = useState(['https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbW11bml0eSUyMHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'https://media.istockphoto.com/photos/soccer-players-celebrating-success-by-lifting-a-teammate-on-shoulders-picture-id1066619566?b=1&k=20&m=1066619566&s=170667a&w=0&h=XKliVPuT6IuRPsR1-PrtgyR1HMrfUjEmo00MUrVDytM=', 'https://images.unsplash.com/photo-1624880357913-a8539238245b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb3RiYWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60', 'https://images.unsplash.com/photo-1593766787879-e8c78e09cbbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNyaWNrZXQlMjB0d298ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60', 'https://media.istockphoto.com/photos/diverse-tennis-picture-id1322615390?b=1&k=20&m=1322615390&s=170667a&w=0&h=8WROZFZujf3UYkTFwBsr4z4WVQ9Y_RtUNT9UWRAxSsU=']);



  return (

    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: 'column',
    }]}
    >
      <Text
        style={{
          flex: 1.2, fontSize: 26, fontWeight: 'bold', fontFamily: 'Cochin', textAlign: 'center', justifyContent: 'center',
        }}
      >
        Hello and Welcome to Sportsy! The best app to find friends and play sport!
      </Text>
      <View>
        <SliderBox images={images} sliderBoxHeight={400} dotColor="#FFEE58" inactiveDotColor="#90A4AE" parentWidth={Dimensions.get('window').width} style={{ flex: 2, marginBottom: 20 }} />
      </View>
      {/* <Image
        resizeMode="contain"
        style={{ flex: 2, width: Dimensions.get('window').width, height: Dimensions.get('window').width / 2 }}
        source={{
          uri: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbW11bml0eSUyMHNwb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        }}
      /> */}
      {/* <Image
        resizeMode="contain"
        style={{ flex: 2, width: Dimensions.get('window').width, height: Dimensions.get('window').width / 2 }}
        source="https://media.istockphoto.com/photos/soccer-players-celebrating-success-by-lifting-a-teammate-on-shoulders-picture-id1066619566?b=1&k=20&m=1066619566&s=170667a&w=0&h=XKliVPuT6IuRPsR1-PrtgyR1HMrfUjEmo00MUrVDytM="
      /> */}
      <Text style={{
        flex: 1, fontSize: 26, alignItems: 'center', textAlign: 'center',
      }}
      >
        Login or register below and get started!
      </Text>
    </View>

  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  landingPageTagline: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Cochin',
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#a4e0c2',
  },
});
