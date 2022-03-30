import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  collection, getDocs, doc, getDoc,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserContext } from '../contexts/UserContext';

// import Header from './globalScreens/HeaderComponent';

export default function HomeScreen({ navigation }) {
  const [eventsLocation, setEventsLocation] = useState();
  const [loading, setLoading] = useState(true);
  const eventsCollectionRef = collection(db, 'events');
  const docRef = doc(db, 'users', auth.currentUser.uid);
  const { setLoggedInUser, setUserData,
  } = useContext(UserContext);

  // const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);

    getDoc(docRef).then((userInfo) => {
      setUserData(userInfo.data());
      return userInfo.data();
    }).then((data) => {
      setLoggedInUser(data);
    }).catch((error) => alert(error.message));
  }, []);

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
