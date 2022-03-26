import { sendSignInLinkToEmail } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { ScreenStackHeaderConfig } from 'react-native-screens';

export default function Searchbar({
  setToggleSubmit, style, setSearch, search, toggleSubmit,
}) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch} />

        <TextInput
          value={search}
          placeholder="Filter by sport"
          style={styles.textInput}
          onChangeText={(text) => {
            const letters = /^$|^[a-zA-Z._\b ]+$/;
            if (text.length > 12) {
              setError('Query too long.');
            } else if (text.match(letters)) {
              setSearch(text);

              if (error) { setError(false); }
            } else setError('Please only enter alphanumeric characters');
          }}
        />
        {
                    query
                      ? (
                        <TouchableOpacity
                          onPress={() => setQuery('')}
                          style={styles.vwClear}
                        />
                      )
                      : <View style={styles.vwClear} />
                }
      </View>
      <View>
        <Button title="Submit search" color="#008080" onPress={() => setToggleSubmit(!toggleSubmit)}>Submit</Button>
      </View>
      {
                error
                && (
                <Text style={styles.txtError}>
                  {error}
                </Text>
                )
            }
    </View>
  );
}
const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'black',
    textAlign: 'center',
    flex: 1,

  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    // backgroundColor: 'green',
    flex: 1,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 40,
    // backgroundColor: 'red'
  },
  icSearch: {
    height: 18, width: 18,
  },
  searchContainer:
    {
      backgroundColor: 'white',
      width: '75%',
      height: 40,
      flexDirection: 'row',
      marginBottom: 5,
    },
  container: {
    height: 80,
    alignItems: 'center',
  },
});
