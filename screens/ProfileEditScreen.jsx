import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../contexts/UserContext';

// import ImagePicker from 'react-native-image-crop-picker';
import { auth, db } from '../firebase';
// import storage from '@react-native-firebase/storage';

function ProfileEditScreen() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const updateSuccessAlert = () =>
    Alert.alert(
      "Message",
      "Profile successfully updated",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );


  const handleUpdate = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const fieldsToUpdate = {
      name: loggedInUser.name,
      username: loggedInUser.username,
      DOB: loggedInUser.DOB,
      location: loggedInUser.location,
      avatar: loggedInUser.avatar,
    };
    updateDoc(docRef, fieldsToUpdate).then((data) => {
      console.log('we are here')
      updateSuccessAlert()
    });

  };

  console.log(loggedInUser)

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
          {loggedInUser ? loggedInUser.name : ''}
        </Text>
      </View>

      <View style={styles.action}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={loggedInUser ? loggedInUser.name : ''}
          onChangeText={(txt) => setLoggedInUser({ ...loggedInUser, name: txt })}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#666666"
          value={loggedInUser ? loggedInUser.username : ''}
          onChangeText={(txt) => setLoggedInUser({ ...loggedInUser, username: txt })}
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
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
      </View>
      <View style={styles.action}>
        <TextInput
          placeholder="avatar"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          value={loggedInUser ? loggedInUser.avatar : ''}
          onChangeText={(txt) => setLoggedInUser({ ...loggedInUser, avatar: txt })}
          style={styles.textInput}
        />
      </View>

      <View style={styles.action}>
        
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
    </View>
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