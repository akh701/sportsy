import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {
  getDoc, doc,
} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import SingleEventAttendees from './SingleEventAttendees';
import { db } from '../../firebase';

function SingleEventScreen({ route: { params }, navigation }) {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const eventCreatedDate = moment(params.createdAt.milliseconds).format('MMMM Do YYYY, h:mm:ss a');
  const eventDate = moment(params.eventDate.seconds * 1000).format('MMMM Do YYYY');

  useEffect(() => {
    setLoading(true);
    const attendeeUsernames = [];
    let counter = 0;
    if (params.attendees.length > 0) {
      params.attendees.forEach((id) => {
        const q = doc(db, 'users', id);
        getDoc(q)
          .then((data) => {
            attendeeUsernames.push(data._document.data.value.mapValue.fields.username);
            counter++;
            return attendeeUsernames;
          })
          .then((attendeeUsernames) => {
            setAttendees(attendeeUsernames);
            if (counter === params.attendees.length) setLoading(false);
          });
      });
    } else {
      setLoading(false);
    }
  }, [refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setAttendees([]);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefresh((currValue) => currValue + 1);
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) { return <Text>Loading...</Text>; }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.SingleEventHeader}>Event Details</Text>
      <Text style={styles.EventTitle}>{params.title}</Text>
      <Text style={styles.EventCategory}>{params.category}</Text>
      <Text style={styles.EventCreated}>
        Event created on
        {' '}
        {eventCreatedDate}
        {' '}
        and was created by
        {' '}
        {params.creator}
      </Text>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={10} ellipsizeMode="tail" style={styles.description}>{params.description}</Text>
      </View>
      <Text style={styles.eventDateAndTime}>
        This event will take place on
        {' '}
        {eventDate}
        {' '}
        at
        {' '}
        {params.eventTime}
      </Text>
      <Text style={styles.spotsTaken}>
        {params.attendees.length}
        {' '}
        of the
        {' '}
        {params.spotsAvailable}
        {' '}
        available spots at this event have been taken.
      </Text>
      <Text style={styles.attendeeLabel}>Currently attending:</Text>
      {/* <SafeAreaView>
        <FlatList
          keyExtractor={(i) => i}
          data={attendees}
          renderItem={({ item }) => {
            <Text>{item.stringValue}</Text>;
          }}
        />
      </SafeAreaView> */}
      <SafeAreaView>
        <View style={styles.attendeesContainer}>
          <SingleEventAttendees data={attendees} keyExtractor={(result) => result.stringValue} />
        </View>
      </SafeAreaView>

    </KeyboardAvoidingView>
  );
}

export default SingleEventScreen;

const styles = StyleSheet.create({
  SingleEventHeader: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
  },
  EventTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 4,
  },
  EventCategory: {
    textAlign: 'center',
    fontSize: 12,
    color: 'blue',
  },
  EventCreated: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  description: {
    textAlign: 'justify',
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 6,
    padding: 3,
  },
  descriptionContainer: {
    flex: 1,
    padding: 24,
  },
  spotsTaken: {
    textAlign: 'center',
    marginHorizontal: 35,
  },
  eventDateAndTime: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  attendeeLabel: {
    marginLeft: 25,
    marginTop: 15,
    marginBottom: 10,
    fontSize: 10,
    color: 'blue',
  },
  attendeesContainer: {
    marginTop: 5,
    margnLeft: 25,
  },
  container: {
    border: 'solid',
  },
});
