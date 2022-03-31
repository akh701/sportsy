import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';

export default function Searchbar({
  setToggleSubmit, style, setSearch, search, toggleSubmit, setReset,
}) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  function handleReset() { setReset((prevValue) => prevValue + 1); }
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
      <View style={styles.searchBtnContainer}>
        <TouchableOpacity style={styles.searchSubbmitBtn}>
          <Text
            onPress={() => {
              setToggleSubmit(!toggleSubmit);
            }}
            style={styles.buttonText}
          >
            Submit Search

          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchResetBtn}>
          <Text
            onPress={handleReset}
            style={styles.buttonText}
          >
            Reset Results

          </Text>
        </TouchableOpacity>

      </View>
      <View>
        {/* <Button title="Reset Results" color="#008080" onPress={handleReset}>Submit</Button> */}

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
    width: 40,
    // backgroundColor: 'red'
  },
  searchContainer:
    {
      backgroundColor: 'white',
      width: '90%',
      height: 40,
      flexDirection: 'row',
      marginBottom: 5,
    },
  container: {
    // height: 80,
    alignItems: 'center',
  },
  searchBtnContainer: {
    // flex: 2,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
  },
  searchSubbmitBtn: {
    backgroundColor: '#63CDAB',
    width: '49%',
    padding: 15,
    borderRadius: 3,
    alignItems: 'center',
    marginRight: 5,
  },
  searchResetBtn: {
    backgroundColor: '#FFD800',
    width: '50%',
    padding: 15,
    borderRadius: 3,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

});
