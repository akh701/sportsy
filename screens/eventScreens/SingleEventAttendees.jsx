import React from 'react';
import { FlatList } from 'react-native-web';
import {
  Text,
  StyleSheet,
} from 'react-native';

export default function SingleEventAttendees(props) {
  console.log(props.data);
  return (
    props.data.map((i) => <Text style={styles.attendee} key={i.stringValue}>{i.stringValue}</Text>)
  );
}

const styles = StyleSheet.create({
  attendee: {
    marginLeft: 25,
    marginBottom: 5,
  },
});
