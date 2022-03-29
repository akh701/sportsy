import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import Searchbar from '../components/Searchbar';
import EventsList from './EventsList';

// import Header from './globalScreens/HeaderComponent';

const eventsRef = collection(db, 'events');

export default function FindEventsScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(false);

  useEffect(() => {
    if (search !== '') {
      const formattedSearch = search[0].toUpperCase() + search.slice(1).toLowerCase();
      const q = query(eventsRef, where('category', '==', `${formattedSearch}`));
      getDocs(q)
        .then((data) => {
          const resultsArray = [];
          data.forEach((doc) => {
            resultsArray.push(doc.data());
          });
          return resultsArray;
        })
        .then((resultsArray) => {
          setResult(resultsArray);
        });
    }
  }, [toggleSubmit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDocs(eventsRef).then((data) => {
        setResult(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setSearch('');
      });
    });
    return unsubscribe;
  }, [navigation]);

  // if(loading) return <View><Text>Loading</Text></View>

  return (

    <View style={styles.container}>
      <View style={{ height: '20%' }}>
        <Searchbar
          setSearch={setSearch}
          search={search}
          toggleSubmit={toggleSubmit}
          setToggleSubmit={setToggleSubmit}
          style={{ marginTop: '8%' }}
        />
      </View>
      <View>
        <FlatList
          data={result}
          renderItem={(result) => <Text>{result.category}</Text>}
          keyExtractor={(result) => result.id}
        />
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.eventCounter}>
          Number of events -
          {' '}
          {result.length}
        </Text>
      </View>
        <EventsList
          result={result}
          setResult={setResult}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  noResults: {
    alignItems: 'center',
    margin: '23%',
  },
  eventCounter: {
    fontSize: 20,
    color: '#20232a',
    fontWeight: 'bold',
  },
  textcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

});
