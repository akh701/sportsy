import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  serverTimestamp, addDoc, collection,
} from 'firebase/firestore';
import GlobalStyles from '../constants/styles/GlobalStyles';
// import CalendarPicker from 'react-native-calendar-picker';
// import TimePicker from 'react-time-picker';
import { UserContext } from '../contexts/UserContext';
import { auth, db } from '../firebase';

export default function CreateEventScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    loggedInUser, setLoggedInUser, userData, setUserData,
  } = useContext(UserContext);
  const [eventDetails, setEventDetails] = useState({
    attendees: [], category: '', createdAt: '', creator: userData.username, creatorId: auth.currentUser.uid, description: '', eventDate: new Date(), location: '', spotsAvailable: 0, title: '', cancelled: false,
  });

  const Navigation = useNavigation();

  const apiString = 'https://api.postcodes.io/postcodes';
  const FetchPostcode = (query) => fetch(`${apiString}/${query}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

  })
    .then((res) => {
      const apiResult = res.json();
      return apiResult;
    })
    .then((data) => {
      const eventPostcode = data.result.postcode;
      const { latitude } = data.result;
      const { longitude } = data.result;
      const region = data.result.nuts;
      const eventLocation = [eventPostcode, latitude, longitude, region];
      return eventLocation;
    });

  { /* function to handle submit event button click: */ }

  const postEvent = async () => {
    const locationArray = await FetchPostcode(eventDetails.locationArray);

    if (eventDetails.title === '' || eventDetails.description === '' || eventDetails.locationArray === '' || eventDetails.category === '' || eventDetails.spotsAvailable === '' || eventDetails.eventDate === '') {
      return alert('Please fill out all fields to create an event');
    }
    const eventPost = { ...eventDetails, locationArray, createdAt: serverTimestamp() };
    Navigation.navigate('My Events');
    return addDoc(collection(db, 'events'), eventPost);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEventDetails({ ...eventDetails, eventDate: currentDate });
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={{ ...styles.container, ...GlobalStyles.utilMarginTop }}>
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
            placeholder="Enter event postcode here"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={eventDetails.locationArray}
            onChangeText={(txt) => setEventDetails({ ...eventDetails, locationArray: txt })}
            style={styles.textInput}
          />
        </View>
        {/* User enters sport here: */}
        <View style={[styles.eventDateSelector, styles.categoryPicker]}>
          <Text style={styles.textTitle}>
            Select the sport for the event:
          </Text>
          <Picker
            placeholder="Select Sport"
            selectedValue={eventDetails.category}
            onValueChange={(value) => setEventDetails({ ...eventDetails, category: value })}
            // style={styles.categoryPicker}
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
            <Text style={styles.textTitle}>
              Spots Available:
              {' '}
              {eventDetails.spotsAvailable}

            </Text>
          </View>
        </View>

        {/* -----------------Date Time Picker------------------------------------------ */}
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}
          >

            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <DateTimePicker
                  testID="dateTimePicker"
                  value={eventDetails.eventDate}
                  mode="datetime"
                  is24Hour
                  onChange={onChange}
                  // style={styles.picker}
                  display="spinner"
                  // textColor="red"
                  neutralButtonLabel="clear"
                  style={{ width: '100%' }}
                />

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Select Date and time</Text>

          </Pressable>

          <Text style={{ ...GlobalStyles.utilMarginTop10, ...GlobalStyles.utilPaddingBottom }}>
            Selected:
            {' '}
            {eventDetails.eventDate.toLocaleString()}
          </Text>

        </View>
        {/* User submits event to database here: */}

        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={{ ...styles.userBtn, ...GlobalStyles.btnPrimaryOutline }} onPress={postEvent}>
            <Text style={styles.userBtnTxt}>Create Event</Text>
          </TouchableOpacity>
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
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    padding: 5,
  },
  textInput: {
    paddingLeft: 10,
    color: '#333333',
    borderRadius: 3,
    width: '80%',
    borderWidth: 1,
    height: 40,
    borderColor: '#A9A9A9',
  },

  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,

  },
  userBtn: {
    width: '60%',
    elevation: 2,
    backgroundColor: '#5BD0AA',
    padding: 15,
    borderRadius: 3,
    alignItems: 'center',
  },
  eventDateSelector: {
    margin: 20,
    width: '80%',
  },
  userBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '70%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    elevation: 2,
    backgroundColor: '#63CDAB',
    width: '100%',
    padding: 15,
    borderRadius: 3,
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#A9A9A9',
  },
  buttonClose: {
    backgroundColor: '#5BD0AA',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
  },
  categoryPicker: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#5BD0AA',
    padding: 10,
  },
});
