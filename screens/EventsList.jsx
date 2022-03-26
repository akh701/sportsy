import {
  View, Text, ScrollView, SafeAreaView, StyleSheet, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

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

  if (loading) return <Text style={styles.loading}>Loading...</Text>

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.eventContainer}>
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <View style={[styles.eventCard, styles.cardOutline]}>
              <Text style={styles.item}>{item.title}</Text>
              <Text style={styles.item}>{item.category}</Text>
              <Text style={styles.item}>{item.spotsAvailable}</Text>
              <Text
                onPress={() => []}
                style={{ fontSize: 11, fontWeight: 'bold', float: 'right' }}
              >
                more...

              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
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
    height: '100%',
    width: '75%',
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
