import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard, TouchableWithoutFeedback, ScrollView,
} from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../contexts/UserContext';

// import ImagePicker from 'react-native-image-crop-picker';
import { auth, db } from '../firebase';
// import storage from '@react-native-firebase/storage';

function ProfileEditScreen() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const updateSuccessAlert = () => Alert.alert('Message', 'Profile successfully updated', [
    {
      text: 'OK',
      onPress: () => {
        Keyboard.dismiss();
      },
    },
  ]);

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
      const userPostcode = data.result.postcode;
      const { latitude } = data.result;
      const { longitude } = data.result;
      const region = data.result.nuts;
      const userLocation = [userPostcode, latitude, longitude, region];
      return userLocation;
    });

  const handleUpdate = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const locationArray = await FetchPostcode(loggedInUser.location);
    const fieldsToUpdate = {
      name: loggedInUser.name,
      username: loggedInUser.username,
      DOB: loggedInUser.DOB,
      locationArray,
      avatar: loggedInUser.avatar,
    };
    updateDoc(docRef, fieldsToUpdate).then((data) => {
      updateSuccessAlert();
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
              {loggedInUser ? loggedInUser.name : ''}
            </Text>
          </View>

          <TextInput
            placeholder="Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={loggedInUser ? loggedInUser.name : ''}
            onChangeText={(txt) => setLoggedInUser({ ...loggedInUser, name: txt })}
            style={styles.textInput}
          />

          <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
            value={loggedInUser ? loggedInUser.username : ''}
            onChangeText={(txt) => setLoggedInUser({ ...loggedInUser, username: txt })}
            autoCorrect={false}
            style={styles.textInput}
          />

          <TextInput
            multiline
            numberOfLines={3}
            placeholder="DOB"
            placeholderTextColor="#666666"
            value={loggedInUser ? loggedInUser.DOB : ''}
            onChangeText={(txt) => setLoggedInUser({ ...loggedInUser, DOB: txt })}
            autoCorrect
            style={[styles.textInput, { height: 40 }]}
          />

          <TextInput
            placeholder="avatar"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={loggedInUser ? loggedInUser.avatar : ''}
            onChangeText={(txt) => setLoggedInUser({ ...loggedInUser, avatar: txt })}
            style={styles.textInput}
          />

          <TextInput
            placeholder="location"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={loggedInUser ? loggedInUser.location : ''}
            onChangeText={(txt) => setLoggedInUser({ ...loggedInUser, location: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleUpdate}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  textInput: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#63CDAB',
    width: '80%',
    padding: 15,
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
});
