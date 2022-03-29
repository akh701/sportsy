import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

export default function SingleEventAttendees({ attendees }) {
  return (
    attendees.map((user, index) => <Text style={styles.attendee} key={index}>{user.stringValue}</Text>)
  );
}

const styles = StyleSheet.create({
  attendee: {
    marginLeft: 25,
    marginBottom: 5,
  },
});
