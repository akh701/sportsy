import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView,
} from 'react-native';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import EventCardComponent from './eventScreens/EventCardComponent';

export default function MyEventsScreen({ navigation }) {
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);
  const [isloading, setLoading] = useState(true);
  const createdEventsQuery = query(collection(db, 'events'), where('creatorId', '==', auth.currentUser.uid));
  const attendingEventsQuery = query(collection(db, 'events'), where('attendees', 'array-contains-any', [auth.currentUser.uid]));

  /// USE EFFECT TO GET EVENTS CREATED BY USER
  useEffect(() => {
    setLoading(true);

    getDocs(createdEventsQuery).then((events) => {
      const eventsArray = [];
      events.forEach((event) => {
        eventsArray.push(event.data());
      });
      setUserCreatedEvents(eventsArray);
      setLoading(false);
    });
  }, []);

  /// USE EFFECT TO GET EVENTS CREATED BY USER
  useEffect(() => {
    setLoading(true);

    getDocs(attendingEventsQuery).then((events) => {
      const eventsArray = [];
      events.forEach((event) => {
        eventsArray.push(event.data());
      });
      setUserAttendingEvents(eventsArray);
      setLoading(false);
    });
  }, []);

  if (isloading) { return <Text>Loading</Text>; }
  return (

    <SafeAreaView style={styles.container}>

      {/* List of events user created */}
      <View style={styles.eventContainer}>
        <Text style={styles.textInput}>
          My Events:
        </Text>
        <EventCardComponent data={userCreatedEvents} />
      </View>
      <Text style={[styles.textInput, styles.attending]}>
        Events I'm Attending:
      </Text>
      <View style={styles.eventAttending}>
        {/* List of events user is attending */}
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
    width: '75%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  eventAttending: {
    height: '50%',
    width: '75%',
  },
  textInput: {
    paddingTop: 10,
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
  attending: {
    marginBottom: 10,
    height: 50,
  },

});
