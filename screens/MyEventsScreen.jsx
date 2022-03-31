import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
} from 'react-native';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import EventCardComponent from './eventScreens/EventCardComponent';

export default function MyEventsScreen({ navigation }) {
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const createdEventsQuery = query(collection(db, 'events'), where('creatorId', '==', auth.currentUser.uid));
  const attendingEventsQuery = query(collection(db, 'events'), where('attendees', 'array-contains-any', [auth.currentUser.uid]));

  /// USE EFFECT TO GET EVENTS CREATED BY USER
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getDocs(createdEventsQuery).then((data) => {
        setUserCreatedEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      })
        .catch((err) => {
          alert(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  /// USE EFFECT TO GET EVENTS USER IS ATTENDING
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getDocs(attendingEventsQuery).then((data) => {
        setUserAttendingEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      });
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (

    <SafeAreaView style={styles.container}>

      {/* List of events user created */}
      <View style={styles.eventContainer}>
        <Text style={[styles.textInput, styles.boldText]}>
          My Events:
        </Text>
        <EventCardComponent data={userCreatedEvents} />
      </View>
      <View style={styles.eventAttending}>
        {/* List of events user is attending */}
        <Text style={[styles.textInput, styles.attending, styles.boldText]}>
          Events I'm Attending:
        </Text>
        <EventCardComponent data={userAttendingEvents} />
      </View>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    marginTop: 10,
  },
  eventContainer: {
    height: '50%',
    width: '90%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  eventAttending: {
    height: '50%',
    width: '90%',
  },
  textInput: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 18,
    color: '#333333',
    marginTop: '5%',
  },
  attending: {
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },

});
