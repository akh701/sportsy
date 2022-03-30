import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView, FlatList,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,

} from 'react-native';
import moment from 'moment';
import {
  getDoc, doc, updateDoc, arrayUnion, arrayRemove,

  serverTimestamp, addDoc, collection, query, where, getDocs, orderBy, deleteDoc,
} from 'firebase/firestore';
// import { SafeAreaView } from 'react-native-safe-area-context';
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
    // db.collection('comments').doc(id).delete();
    // deleteDoc(id);
  };

  const handleCommentPress = () => {
    if (comment.comment === '') {
      return alert('You need to enter a comment first you dummy!');
    }

    setComment({ ...comment, timePosted: serverTimestamp() });
    addDoc(collection(db, 'comments'), comment).then(() => { getComments(); });
    setComment({ ...comment, comment: 'Your comment has been posted!' });
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
  }, []);

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

    <SafeAreaView style={styles.container}>
      <View style={styles.EventDetailscontainer}>
        <Text style={styles.SingleEventHeader}>Event Details</Text>
        {route.params.cancelled ? <Text style={styles.cancellationMessage}> EVENT HAS BEEN CANCELLED </Text> : null }

        <Text style={styles.EventTitle}>{route.params.title}</Text>
        <View style={styles.EventHeader}>
          <Text style={styles.EventCategory}>
            {route.params.category}
            {' '}
          </Text>
          <Text style={styles.EventHost}>
            <Text style={styles.boldText}>Host: </Text>
            {route.params.creator}
          </Text>

        </View>

        <Text style={styles.description}>
          <Text style={styles.boldText}>What: </Text>
          {route.params.description}
        </Text>

        <Text style={styles.eventDateAndTime}>
          <Text style={styles.boldText}>When: </Text>
          This event will take place on
          {' '}
          <Text style={styles.boldText}>
            {eventDate}
            {' '}
          </Text>

          {' .'}
        </Text>
        <Text style={styles.spotsTaken}>
          <Text style={styles.boldText}>Spots: </Text>
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

                <Text style={styles.item}>{moment(item.timePosted.toDate().toString()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
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

              <Text style={styles.item}>{moment(item.timePosted.toDate().toString()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
              <Text>{item.comment}</Text>

            </View>
          );
        }}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
      />

      {/* <CommentCardComponent data={postedComments} /> */}

    </SafeAreaView>

  );
}

export default SingleEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EventDetailscontainer: {
    width: '90%',
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  SingleEventHeader: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
  },
  EventHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  EventTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5,
  },
  EventCategory: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#5BD0AA',
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 12,
    marginRight: '40%',
  },
  postionRight: {
    textAlign: 'right',
  },

  EventHost: {
    padding: 5,
  },
  spotsTaken: {
    // textAlign: 'center',
    // marginHorizontal: 35,
    padding: 5,
  },
  description: {
    // textAlign: 'center',
    padding: 5,
  },
  eventDateAndTime: {
    // fontFamily: 'Cochin',
    // fontWeight: 'bold',
    // fontSize: 12,
    // padding: 10,
    marginBottom: 5,
    padding: 5,
    // textAlign: 'center',
    // marginHorizontal: 10,
  },
  attendeeLabel: {
    // marginLeft: 25,
    marginTop: 15,
    marginBottom: 10,
    borderColor: '#5BD0AA',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 12,
    width: '35%',
  },
  attendeesContainer: {
    borderWidth: 1,
    padding: 5,

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
    borderWidth: 1,
    borderColor: '#5BD0AA',
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#63CDAB',
    borderWidth: 1,
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
    width: '100%',
    height: 200,
  },
  mapContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '90%',
    marginTop: 5,
    // borderWidth: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
