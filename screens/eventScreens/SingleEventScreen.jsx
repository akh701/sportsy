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
import moment from 'moment';
import style from 'react-native-datepicker/style';
import { UserContext } from '../../contexts/UserContext';

// import ImagePicker from 'react-native-image-crop-picker';
import { auth, db } from '../../firebase';
// import storage from '@react-native-firebase/storage';

function SingleEventScreen({ route: { params } }) {
  const eventDate = moment(params.createdAt.milliseconds).format('MMMM Do YYYY, h:mm:ss a');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.SingleEventHeader}>Event Details</Text>
      <Text style={styles.EventTitle}>{params.title}</Text>
      <Text style={styles.EventCategory}>{params.category}</Text>
      <Text style={styles.EventCreated}>
        This event was created on
        {' '}
        {eventDate}
        {' '}
        and was created by placeholder
      </Text>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={10} ellipsizeMode="tail" style={styles.description}>{params.description}</Text>
      </View>

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
  EventCreated: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
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
});
