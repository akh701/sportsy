import {
  KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [DOB, setDOB] = useState('');
  const [avatar, setAvatar] = useState('');
  const [location, setLocation] = useState('');
  const [isSelected, setSelection] = useState(false);

  const navigation = useNavigation();

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         navigation.navigate('Profile');
  //       }
  //     });
  //     return unsubscribe;
  //   }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        setDoc(doc(db, 'users', user.uid), {
          name, username, DOB, location, dateJoined: Timestamp.fromDate(new Date('December 10, 1815')), avatar,
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
        <TextInput
          placeholder="Imge-Url"
          value={avatar}
          onChangeText={(text) => setAvatar(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Post-Code"
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={styles.input}
        />
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Football', value: 'football' },
            { label: 'Baseball', value: 'baseball' },
            { label: 'Hockey', value: 'hockey' },
          ]}
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
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
