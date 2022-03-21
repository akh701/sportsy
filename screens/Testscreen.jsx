import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';

import {
  View, Text, Button, TextInput, SafeAreaView, ScrollView, StyleSheet, StatusBar,

} from 'react-native';
import { db } from '../firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

function Testscreen() {
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  const createUser = () => {
    addDoc(usersCollectionRef, { name: newName, username: newUsername });
  };

  useEffect(() => {
    const getUsers = () => {
      getDocs(usersCollectionRef).then((data) => {
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(data);
      });
    };
    getUsers();
  }, []);

  return (

    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>

          <TextInput placeholder="Name.." onChange={(e) => { setNewName(e.target.value); }} />
          <TextInput placeholder="Username.." onChange={(e) => { setNewUsername(e.target.value); }} />
          <Button onPress={createUser} title="Create User" /> 
          {users.map((user) => (
            <View key={user.id}>
              <Text>{user.name}</Text>
              <Text>{user.username}</Text>
              {/* <Text>{user.preferred_sports[0]}</Text>
          <Text>{user.date_joined.toString()}</Text> */}
            </View>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Testscreen;
