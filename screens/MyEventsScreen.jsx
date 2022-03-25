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
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {/* List of events user created */}
        <View style={styles.eventContainer}>
          <Text style={styles.textInput}>
            My Events:
          </Text>
          <EventCardComponent data={userCreatedEvents} />
          {/* List of events user is attending */}
          <Text style={styles.textInput}>
            Events I'm Attending:
          </Text>
          <EventCardComponent data={userAttendingEvents} />
        </View>
      </SafeAreaView>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContainer: {
    height: '100%',
    width: '75%',
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },

});
