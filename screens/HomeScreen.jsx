import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// import Header from './globalScreens/HeaderComponent';

export default function HomeScreen({ navigation }) {
  const [eventsLocation, setEventsLocation] = useState();
  const [loading, setLoading] = useState(true);
  const eventsCollectionRef = collection(db, 'events');

  // const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    getDocs(eventsCollectionRef).then((data) => {
      setEventsLocation(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
  }, []);

  if (loading) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // initialRegion={{
        //   latitude: 51.50853,
        //   longitude: -0.12574,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        { eventsLocation.map((eventLocation, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: eventLocation.locationArray[1],
              longitude: eventLocation.locationArray[2],
            }}
            pinColor="purple"
          >
            <Callout>
              <Text>{eventLocation.title}</Text>
              <Text>{eventLocation.category}</Text>
              <TouchableOpacity>
                <Text
                  onPress={() => { navigation.navigate('singleEvent', eventLocation); }}
                  style={{ fontSize: 11, fontWeight: 'bold' }}
                >
                  View Event

                </Text>
              </TouchableOpacity>
            </Callout>

          </Marker>
        ))}

      </MapView>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
