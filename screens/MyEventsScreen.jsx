import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function MyEventsScreen({ navigation }) {
  const [userCreatedEvents, setUserCreatedEvents] = useState([]);
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);
  const [isloading, setLoading] = useState(true);
  const createdEventsQuery = query(collection(db, 'events'), where('creatorId', '==', auth.currentUser.uid));
  const attendingEventsQuery = query(collection(db, 'events'), where('attendees', '==', auth.currentUser.uid));

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

    getDocs(q).then((events) => {
      const eventsArray = [];
      events.forEach((event) => {
        eventsArray.push(event.data());
      });
      setUserCreatedEvents(eventsArray);
      setLoading(false);
    });
  }, []);

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Header /> */}
      <Text
        onPress={() => alert('This is the my events screen.')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Page to show my events events

      </Text>
    </View>
  );
}
