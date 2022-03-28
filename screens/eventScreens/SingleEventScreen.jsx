import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {
  getDoc, doc, updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import SingleEventAttendees from './SingleEventAttendees';
import { db, auth } from '../../firebase';
import { UserContext } from '../../contexts/UserContext';

function SingleEventScreen({ route: { params }, navigation }) {
  const { userData } = useContext(UserContext);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const eventCreatedDate = moment(params.createdAt.milliseconds).format('MMMM Do YYYY, h:mm:ss a');
  const eventDate = moment(params.eventDate.seconds * 1000).format('MMMM Do YYYY');

  const requestData = (array) => {
    setLoading(true);
    const attendeeUsernames = [];
    let counter = 0;
    if (array.length > 0) {
      array.forEach((id) => {
        const q = doc(db, 'users', id);
        getDoc(q)
          .then((data) => {
            attendeeUsernames.push(data._document.data.value.mapValue.fields.username);
            counter++;
            return attendeeUsernames;
          })
          .then((attendeeUsernames) => {
            setAttendees(attendeeUsernames);
            if (counter === array.length) setLoading(false);
          });
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestData(params.attendees);
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

  const handlePress = () => {
    if (!params.cancelled) {
      console.log('hello');
      if (params.attendees.indexOf(auth.currentUser.uid) < 0) {
        if (params.attendees.length < params.spotsAvailable) {
          updateDoc(doc(db, 'events', params.id), {
            attendees: arrayUnion(auth.currentUser.uid),
          }).then(() => {
            params.attendees.push(auth.currentUser.uid);
            setAttendees(params.attendees);
            setRefresh((currValue) => currValue + 1);
          });
        } else {
          alert('This event is full');
        }
      } else {
        updateDoc(doc(db, 'events', params.id), {
          attendees: arrayRemove(auth.currentUser.uid),
        }).then(() => {
          params.attendees = params.attendees.filter((id) => id !== auth.currentUser.uid);
          setAttendees(params.attendees);
          setRefresh((currValue) => currValue + 1);
        });
      }
    }
  };
  const handleCancel = () => {
    console.log(params.cancelled);
    if (params.cancelled === false) {
      updateDoc(doc(db, 'events', params.id), {
        cancelled: true,
      }).then(() => {
        setRefresh((currValue) => currValue + 1);
      });
    } else {
      updateDoc(doc(db, 'events', params.id), {
        cancelled: false,
      }).then(() => {
        setRefresh((currValue) => currValue + 1);
      });
    }
  };
  if (loading) { return <Text>Loading...</Text>; }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.SingleEventHeader}>Event Details</Text>
      {params.cancelled ? <Text style={styles.cancellationMessage}> EVENT HAS BEEN CANCELLED </Text> : null }
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
      <View style={styles.joinLeaveEventBtn}>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.button, styles.buttonOutline]}

        >
          <Text style={styles.buttonOutlineText}>{params.attendees.indexOf(auth.currentUser.uid) >= 0 ? 'Leave Event' : 'Join Event'}</Text>
        </TouchableOpacity>
        {params.creatorId === auth.currentUser.uid ? (
          <TouchableOpacity
            onPress={handleCancel}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>{cancel ? 'Reinstate Event' : 'Cancel Event'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
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
          <SingleEventAttendees attendees={attendees} keyExtractor={(result) => result.stringValue} />
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
  button: {
    backgroundColor: '#63CDAB',
    width: '40%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#63CDAB',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#63CDAB',
    fontWeight: '700',
    fontSize: 16,
  },
  joinLeaveEventBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  cancellationMessage: {
    textAlign: 'center',
    color: 'red',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
  },
});
