import { NavigationRouteContext, useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import moment from 'moment';
import { UserContext } from '../../contexts/UserContext';
import GlobalStyles from '../../constants/styles/GlobalStyles';

export default function EventCardComponent(props) {
  const { userData } = useContext(UserContext);

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
          <View style={styles.eventCardHeader}>
            <Text style={styles.item}>{item.title}</Text>
            <View style={styles.userHostImageContainer}>
              <Text style={[styles.item, styles.postionRight]}>
                Host:
                {' '}
                {item.creator}
              </Text>
              <Image
                style={styles.userImg}
                source={{ uri: userData.avatar }}
              />
            </View>
          </View>

          <View
            style={{
              borderBottomColor: '#A9A9A9',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.eventCardBody}>
            <Text numberOfLines={1} style={[styles.item, GlobalStyles.utilMarginBottom5, GlobalStyles.utilMarginTop10]}>
              <Text style={styles.boldText}>What: </Text>
              {item.description}
            </Text>

            <Text style={[styles.item, GlobalStyles.utilMarginBottom5, GlobalStyles.utilMarginTop5]}>
              <Text style={styles.boldText}>When: </Text>
              {moment(item.eventDate.toDate()).format('MMMM Do YYYY, h:mm:ss a')}

            </Text>

            <Text style={[styles.item, GlobalStyles.utilMarginBottom5, GlobalStyles.utilMarginTop5]}>
              <Text style={styles.boldText}>Spots: </Text>
              {item.attendees.length}
              /
              {item.spotsAvailable}
              {' '}
              signed up
            </Text>
            <Text style={[styles.item, GlobalStyles.utilMarginBottom5]}>
              <Text style={styles.boldText}>Where: </Text>
              {item.locationArray[0]}

            </Text>
          </View>

          <View
            style={{
              borderBottomColor: '#A9A9A9',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}
          />

          <View style={styles.eventCardFooter}>
            <Text style={styles.cardBadge}>{item.category}</Text>
            <TouchableOpacity style={styles.viewEventButton}>
              <Text
                onPress={() => { navigateToSinglePage(item); }}
                style={styles.viewEventText}
              >
                View Event

              </Text>
            </TouchableOpacity>
          </View>

        </View>
      )}
      // keyExtractor={(item, index) => index}
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
    fontSize: 14,
    height: 20,
  },
  eventContainer: {
    height: '100%',
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
    borderRadius: 5,
    marginBottom: 5,
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
  eventCardHeader: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 5,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  postionRight: {
    textAlign: 'right',
    marginRight: 5,
  },
  eventCardFooter: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: 'bold',
  },
  cardBadge: {
    borderColor: '#5BD0AA',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 11,
  },
  viewEventButton: {
    backgroundColor: '#63CDAB',
    color: 'white',
    borderWidth: 0,
    borderRadius: 3,

  },
  viewEventText: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  userImg: {
    height: 20,
    width: 20,
    borderRadius: 40,
  },
  userHostImageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});
