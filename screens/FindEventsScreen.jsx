import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { auth } from '../firebase';
import { db } from '../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import "firebase/firestore";
import Searchbar from '../components/Searchbar'
import EventsList from './EventsList'


// import Header from './globalScreens/HeaderComponent';

const eventsRef = collection(db, "events");


export default function FindEventsScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(false)

  console.log(result)

  useEffect(() => {
    if(search !== ""){
      const q = query(eventsRef, where("category", "==", `${search}`));
    getDocs(q)
    .then((data) =>{
      const resultsArray = [];
      data.forEach((doc)=>{
        resultsArray.push(doc.data())
      })
      return resultsArray

      })
      .then((resultsArray)=> {
        setResult(resultsArray);
      })

  }

  }, [toggleSubmit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus",  ()=> {
      getDocs(eventsRef).then((data) => {
        setResult(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setSearch("")
      });

    })
    return unsubscribe
  }, [navigation]);


  // if(loading) return <View><Text>Loading</Text></View>

  return (

    <View style={styles.container}>
      <View style={{ height: '20%'}}>
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
        renderItem={(result)=> <Text>{result.category}</Text>}
        keyExtractor={(result) => result.id}
      />
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
      width: '100%'
  },
});
