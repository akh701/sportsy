import {
  View, Text, ScrollView, SafeAreaView, StyleSheet, FlatList, ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import EventCardComponent from './eventScreens/EventCardComponent';

export default function EventsList({ result, setResult }) {
  const eventsCollectionRef = collection(db, 'events');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDocs(eventsCollectionRef).then((data) => {
      setResult(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.eventContainer}>
        <EventCardComponent data={result} />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 5,
    fontSize: 14,
    height: 20,
  },
  eventContainer: {
    // height: '100%',
    width: '90%',
  },
  cardOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#63CDAB',
    borderWidth: 2,
  },
  eventCard: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  loading: {
    textAlign: 'center',
  },
});
