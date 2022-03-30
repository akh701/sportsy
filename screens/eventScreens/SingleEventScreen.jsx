import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView, FlatList,
  Dimensions,

} from 'react-native';
import moment from 'moment';
import {
  getDoc, doc, updateDoc, arrayUnion, arrayRemove,

  serverTimestamp, addDoc, collection, query, where, getDocs, orderBy, deleteDoc,
} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Circle } from 'react-native-maps';
import SingleEventAttendees from './SingleEventAttendees';
import { db, auth } from '../../firebase';
import { UserContext } from '../../contexts/UserContext';

function SingleEventScreen({ route, navigation }) {
  const { userData } = useContext(UserContext);
  const [postedComments, setPostedComments] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const timePosted = serverTimestamp();
  const [comment, setComment] = useState({
    comment: '', eventId: route.params.id, timePosted: serverTimestamp(), username: userData.username,
  });
  const [refresh, setRefresh] = useState(0);
  const commentsQuery = query(collection(db, 'comments'), orderBy('timePosted'), where('eventId', '==', route.params.id));

  const deleteComment = (id) => {
    deleteDoc(doc(db, 'comments', id)).then(() => { getComments(); });
  };

  const handleCommentPress = () => {
    if (comment.comment === '') {
      return alert('You need to enter a comment first you dummy!');
    }

    setComment({ ...comment, timePosted: serverTimestamp() });
    addDoc(collection(db, 'comments'), comment).then(() => {
      getComments();
      setComment({ ...comment, comment: '' });
    });
    return alert('Your comment has been posted');
  };

  const eventCreatedDate = moment(route.params.createdAt.milliseconds).format('MMMM Do YYYY, h:mm:ss a');
  const eventDate = moment(route.params.eventDate.seconds * 1000).format('MMMM Do YYYY, h:mm:ss a');

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

  function getComments() {
    getDocs(commentsQuery).then((comments) => {
      setPostedComments(comments.docs.map((comment) => ({ ...comment.data(), id: comment.id })));
      setLoading(false);
    });
  }

  useEffect(() => {
    requestData(route.params.attendees);
  }, [refresh]);

  useEffect(() => {
    getComments();
  }, [refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setAttendees([]);
      setPostedComments([]);
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
    if (route.params.cancelled === false) {
      if (route.params.attendees.indexOf(auth.currentUser.uid) < 0) {
        if (route.params.attendees.length < route.params.spotsAvailable) {
          updateDoc(doc(db, 'events', route.params.id), {
            attendees: arrayUnion(auth.currentUser.uid),
          }).then(() => {
            route.params.attendees.push(auth.currentUser.uid);
            setAttendees(route.params.attendees);
            setRefresh((currValue) => currValue + 1);
          });
        } else {
          alert('This event is full');
        }
      } else {
        updateDoc(doc(db, 'events', route.params.id), {
          attendees: arrayRemove(auth.currentUser.uid),
        }).then(() => {
          route.params.attendees = route.params.attendees.filter((id) => id !== auth.currentUser.uid);
          setAttendees(route.params.attendees);
          setRefresh((currValue) => currValue + 1);
        });
      }
    } else {
      alert('You are not able to join a cancelled event');
    }
  };

  const handleCancel = () => {
    if (route.params.cancelled === false) {
      updateDoc(doc(db, 'events', route.params.id), {
        cancelled: true,
      }).then(() => {
        route.params.cancelled = true;
        setRefresh((currValue) => currValue + 1);
      });
    } else {
      updateDoc(doc(db, 'events', route.params.id), {
        cancelled: false,
      }).then(() => {
        route.params.cancelled = false;
        setRefresh((currValue) => currValue + 1);
      });
    }
  };

  if (loading) { return <Text>Loading...</Text>; }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.SingleEventHeader}>Event Details</Text>
      {route.params.cancelled ? <Text style={styles.cancellationMessage}> EVENT HAS BEEN CANCELLED </Text> : null }
      <Text style={styles.EventTitle}>{route.params.title}</Text>
      <Text style={styles.EventCategory}>{route.params.category}</Text>
      <Text style={styles.EventCreated}>
        Event created on
        {' '}
        {eventCreatedDate}
        {' '}
        and was created by
        {' '}
        {route.params.creator}
      </Text>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={10} ellipsizeMode="tail" style={styles.description}>{route.params.description}</Text>
      </View>
      <Text style={styles.eventDateAndTime}>
        This event will take place on
        {' '}
        {eventDate}
        {' .'}
      </Text>
      <Text style={styles.spotsTaken}>
        {route.params.attendees.length}
        {' '}
        of the
        {' '}
        {route.params.spotsAvailable}
        {' '}
        available spots at this event have been taken.
      </Text>
      <View style={styles.joinLeaveEventBtn}>
        {route.params.creatorId === auth.currentUser.uid ? (
          <TouchableOpacity
            onPress={handleCancel}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>{route.params.cancelled ? 'Reinstate Event' : 'Cancel Event'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handlePress}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>{route.params.attendees.indexOf(auth.currentUser.uid) >= 0 ? 'Leave Event' : 'Join Event'}</Text>
          </TouchableOpacity>
        ) }
      </View>
      <Text style={styles.attendeeLabel}>Currently attending:</Text>
      <View style={styles.attendeesContainer}>
        <SingleEventAttendees attendees={attendees} keyExtractor={(result) => result.stringValue} />
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: route.params.locationArray[1],
            longitude: route.params.locationArray[2],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: route.params.locationArray[1],
              longitude: route.params.locationArray[2],
            }}
            pinColor="purple"
          />
          <Circle
            center={{
              latitude: route.params.locationArray[1],
              longitude: route.params.locationArray[2],
            }}
            radius={1000}
          />
        </MapView>
      </View>
      {/* POST COMMENTS */}
      <View style={styles.action}>

        <TextInput
          placeholder="Type your comment here..."
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={comment.comment}
          onChangeText={(txt) => setComment({ ...comment, comment: txt })}
          style={styles.textInput}
          multiline
          numberOfLines={4}
        />
      </View>
      <View />

      <View style={styles.userBtnWrapper}>
        <TouchableOpacity style={styles.userBtn} onPress={handleCommentPress}>
          <Text style={styles.userBtnTxt}>Post Comment</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(i) => i.id}
        data={postedComments}
        renderItem={({ item }) => {
          if (item.username === userData.username) {
            return (
              <View style={[styles.eventCard, styles.cardOutline]}>
                <Text style={styles.item}>
                  Comment By
                  {' '}
                  {item.username}
                </Text>

                <Text style={styles.item}>{moment(item.timePosted.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                <Text>{item.comment}</Text>

                <TouchableOpacity>
                  <Text
                    onPress={() => {
                      deleteComment(item.id);
                    }}
                    style={{ fontSize: 11, fontWeight: 'bold' }}
                  >
                    Delete Comment

                  </Text>
                </TouchableOpacity>

              </View>
            );
          } return (
            <View style={[styles.eventCard, styles.cardOutline]}>
              <Text style={styles.item}>
                Comment By
                {' '}
                {item.username}
              </Text>

              <Text style={styles.item}>{moment(item.timePosted.toDate()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
              <Text>{item.comment}</Text>

            </View>
          );
        }}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
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
    borderWidth: 1,
    borderColor: '#20232a',
    borderRadius: 6,
    padding: 3,
  },
  descriptionContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 25,
  },
  container: {
  },
  cardOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#63CDAB',
    borderWidth: 2,
  },
  eventCard: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
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
  },
  map: {
    width: '90%',
    height: 200,
  },
  mapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
});
