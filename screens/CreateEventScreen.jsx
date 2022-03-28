import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import CalendarPicker from 'react-native-calendar-picker';
import TimePicker from 'react-time-picker';
import {
  serverTimestamp, addDoc, collection,
} from 'firebase/firestore';
import { UserContext } from '../contexts/UserContext';
import { auth, db } from '../firebase';

export default function CreateEventScreen({ navigation }) {
  const {
    loggedInUser, setLoggedInUser, userData, setUserData,
  } = useContext(UserContext);
  const [eventDetails, setEventDetails] = useState({
    attendees: [], category: '', createdAt: '', creator: userData.username, creatorId: auth.currentUser.uid, description: '', eventDate: '', eventTime: '', locationArray: [], spotsAvailable: 0, title: '',
  });

  const apiString = "https://api.postcodes.io/postcodes"
      const FetchPostcode = (query) => {
        return fetch(`${apiString}/${query}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },

        })
        .then((res) => {
          const apiResult = res.json()
          return apiResult;
        })
        .then((data)=> {
          const eventPostcode = data.result.postcode
          const latitude = data.result.latitude
          const longitude = data.result.longitude
          const region = data.result.nuts
          const eventLocation = [eventPostcode, latitude, longitude, region]
          return eventLocation
        })
    }

  console.log(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 'min date ');

  { /* function to handle submit event button click: */ }
  const postEvent = async () => {
    const locationArray = await FetchPostcode(eventDetails.locationArray)
    console.log(locationArray)

    if (eventDetails.title === '' || eventDetails.description === '' || eventDetails.locationArray === '' || eventDetails.category === '' || eventDetails.spotsAvailable === '' || eventDetails.eventTime === '' || eventDetails.eventDate === '') {
      return alert('Please fill out all fields to create an event');
    }
    const eventPost = { ...eventDetails, locationArray, createdAt: serverTimestamp() };
    return addDoc(collection(db, 'events'), eventPost);
  };


  return (
    <ScrollView>
      {/* User selects title here: */}
      <View style={styles.action}>

        <TextInput
          placeholder="Event Title"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={eventDetails.title}
          onChangeText={(txt) => setEventDetails({ ...eventDetails, title: txt })}
          style={styles.textInput}
        />
      </View>
      {/* User writes description here: */}
      <View style={styles.action}>

        <TextInput
          placeholder="Write a description of your event here!"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={eventDetails.description}
          onChangeText={(txt) => setEventDetails({ ...eventDetails, description: txt })}
          style={styles.textInput}
          multiline
          numberOfLines={3}

        />
      </View>
      {/* User enter postcode here: */}
      <View style={styles.action}>

        <TextInput
          placeholder="Type your postcode here"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={eventDetails.locationArray}
          onChangeText={(txt) => setEventDetails({ ...eventDetails, locationArray: txt })}
          style={styles.textInput}

        />
      </View>
      {/* User enters sport here: */}
      <View style={styles.eventDateSelector}>
        <Text style={styles.textInput}>
          Select the sport for the event:
        </Text>
        <Picker
          placeholder="Select Sport"
          selectedValue={eventDetails.category}
          onValueChange={(value) => setEventDetails({ ...eventDetails, category: value })}
        >
          <Picker.Item label="" value="" />
          <Picker.Item label="Badminton" value="Badminton" />
          <Picker.Item label="Basketball" value="Basketball" />
          <Picker.Item label="Climbing" value="Climbing" />
          <Picker.Item label="Cricket" value="Cricket" />
          <Picker.Item label="Darts" value="Darts" />
          <Picker.Item label="Football" value="Football" />
          <Picker.Item label="Golf" value="Golf" />
          <Picker.Item label="Snooker" value="Snooker" />
          <Picker.Item label="Squash" value="Squash" />
          <Picker.Item label="Tennis" value="Tennis" />
        </Picker>

      </View>
      {/* User selects number of spots here: */}
      <View style={styles.eventDateSelector}>
        <View>
          <Slider
            step={1}
            minimumValue={0}
            maximumValue={25}
            value={eventDetails.spotsAvailable}
            onValueChange={(value) => setEventDetails({ ...eventDetails, spotsAvailable: value })}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#b9e4c9"
          />
          <Text style={styles.textInput}>
            Spots Available:
            {' '}
            {eventDetails.spotsAvailable}

          </Text>
        </View>
        <Text>
          Select the time of the event:
        </Text>
      </View>
      {/* User selects time here: */}
      {' '}
      <View style={styles.eventDateSelector}>
        <TimePicker disableClock onChange={(value) => setEventDetails({ ...eventDetails, eventTime: value })} />
        {/* User selects date here: */}
      </View>
      <View style={styles.eventDateSelector}>
        <Text>
          Select the date for the event:
        </Text>
      </View>
      <View style={styles.eventDateSelector}>
        <CalendarPicker
          startFromMonday
          allowRangeSelection={false}
          // minDate={minDate}
          // maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={(value) => setEventDetails({ ...eventDetails, eventDate: value._d })}
        />
      </View>
      {/* User submits event to database here: */}

      <View style={styles.userBtnWrapper}>

        <>
          <TouchableOpacity style={styles.userBtn} onPress={postEvent}>
            <Text style={styles.userBtnTxt}>Create Event</Text>
          </TouchableOpacity>
        </>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpalocation: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  eventDateSelector:
  { margin: 20 },
  userBtnTxt: {
    color: '#2e64e5',
  },
});
