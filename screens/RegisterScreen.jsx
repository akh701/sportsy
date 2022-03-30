import {
  KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const items = require('../globalVariables');

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [DOB, setDOB] = useState('');
  const [avatar, setAvatar] = useState('https://firebasestorage.googleapis.com/v0/b/sportsy-c79d8.appspot.com/o/sportsyDefaultPhoto.png?alt=media&token=b13b51bc-cd6d-4d2e-b442-a6547a4e2add');
  const [location, setLocation] = useState([]);

  const navigation = useNavigation();

  const preferredSports = [];

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

  const handleSignUp = async () => {
    const locationArray = await FetchPostcode(location);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        setDoc(doc(db, 'users', user.uid), {
          name, username, DOB, locationArray, dateJoined: Timestamp.fromDate(new Date()), avatar,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />

        <TextInput
          placeholder="name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Date-Of-Birth"
          value={DOB}
          onChangeText={(text) => setDOB(text)}
          style={styles.input}
        />
        {/* <TextInput
          placeholder="Imge-Url"
          value={avatar}
          onChangeText={(text) => setAvatar(text)}
          style={styles.input}
        /> */}
        <TextInput
          placeholder="Post-Code"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#63CDAB',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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
  label: {
    margin: 8,
  },
  select: {
    marginTop: 5,
  },
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  selectIOS: {
    backgroundColor: 'black',
  },
});
