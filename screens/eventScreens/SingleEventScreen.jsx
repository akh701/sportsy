import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import style from 'react-native-datepicker/style';
import { UserContext } from '../../contexts/UserContext';

// import ImagePicker from 'react-native-image-crop-picker';
import { auth, db } from '../../firebase';
// import storage from '@react-native-firebase/storage';

function SingleEventScreen({ route: { params } }) {
  console.log(params);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.SingleEventHeader}>Event Details</Text>
      <Text style={styles.EventTitle}>{params.title}</Text>
      <Text style={styles.EventCategory}>{params.category}</Text>
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
  },
  EventTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 4,
  },
  EventCategory: {
    textAlign: 'center',
    fontSize: 12,
  },
});
