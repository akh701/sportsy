import { NavigationRouteContext, useNavigation } from '@react-navigation/core';
import React from 'react';
import {
  View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, TouchableOpacity,
} from 'react-native';
import moment from 'moment';

export default function EventCardComponent(props) {
  const eventDate = (new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(props.data.eventDate));

  const navigation = useNavigation();

  const navigateToSinglePage = (event) => {
    navigation.navigate('singleEvent', event);
  };

  return (
    <FlatList
      keyExtractor={(i) => i.id}
      data={props.data}
      renderItem={({ item }) => (
        <View style={[styles.eventCard, styles.cardOutline]}>
          <Text style={styles.item}>
            {item.creator}
            's event
          </Text>
          <Text style={styles.item}>{item.title}</Text>
          <Text style={styles.item}>{item.category}</Text>
          {/* <Text style={styles.item}>{new Date(item.eventDate * 1000).toLocaleString()}</Text> */}
          <Text style={styles.item}>{moment(item.eventDate.toDate().toString()).format('MMMM Do YYYY, h:mm:ss a')}</Text>
          <Text style={styles.item}>{item.eventCard}</Text>
          <Text style={styles.item}>
            {item.attendees.length}
            /
            {item.spotsAvailable}
            {' '}
            signed up
          </Text>
          <Text style={styles.item}>{item.locationArray[0]}</Text>
          <Text style={styles.item} />
          <TouchableOpacity>
            <Text
              onPress={() => { navigateToSinglePage(item); }}
              style={{ fontSize: 11, fontWeight: 'bold' }}
            >
              View Event

            </Text>
          </TouchableOpacity>

        </View>
      )}
      keyExtractor={(item, index) => index}
      showsVerticalScrollIndicator={false}
    />
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
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },

});
