import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';

import { View, Text, Button, TextInput } from 'react-native';
import { db } from '../firebase';

function Testscreen() {
  const [newName, setNewName]= useState("")
  const [newUsername, setNewUsername]= useState("")
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  const createUser = ()=>{
    addDoc(usersCollectionRef, {name: newName, username: newUsername})
  }

  useEffect(() => {
    const getUsers = () => {
      getDocs(usersCollectionRef).then((data) => {
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getUsers();
  }, []);

  return (
    <View>
      <TextInput placeholder="Name.." onChange={(e) => { setNewName(e.target.value)}}/>
      <TextInput placeholder="Username.." onChange={(e) => { setNewUsername(e.target.value)}}/>
      <Button onPress={createUser}> Create User</Button>
      {users.map((user) => (
        <View key={user.id}>
          <Text>{user.name}</Text>
          <Text>{user.username}</Text>
          {/* <Text>{user.preferred_sports[0]}</Text>
          <Text>{user.date_joined.toString()}</Text> */}
        </View>
      ))}
    </View>
  );
}

export default Testscreen;
