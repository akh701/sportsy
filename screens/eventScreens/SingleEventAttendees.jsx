import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

export default function SingleEventAttendees({ attendees }) {
  return (
    attendees.map((i) => <Text style={styles.attendee} key={i.stringValue}>{i.stringValue}</Text>)
  );
}

const styles = StyleSheet.create({
  attendee: {
    marginLeft: 25,
    marginBottom: 5,
  },
});
