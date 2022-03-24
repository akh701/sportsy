import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../contexts/UserContext';

// import ImagePicker from 'react-native-image-crop-picker';
import { auth, db } from '../firebase';
// import storage from '@react-native-firebase/storage';

function ProfileEditScreen() {
//   const {user, logout} = useContext(auth);
//   const [image, setImage] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [transferred, setTransferred] = useState(0);
  const { loggedInUser } = useContext(UserContext);

  const handleUpdate = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const fieldsToUpdate = {
      name: loggedInUser.name,
      username: loggedInUser.name,
      DOB: loggedInUser.DOB,
      location: loggedInUser.location,
      avatar: loggedInUser.avatar,
    };
    updateDoc(docRef, fieldsToUpdate);
  };

  return (
    <View style={styles.container}>
      {/* <BottomSheet
        ref={this.bs}
        snapPoints={[330, -5]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      /> */}
      {/* <Animated.View
        style={{
          margin: 20,
          opalocation: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}> */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
          {loggedInUser ? loggedInUser.name : ''}
          {' '}
          {loggedInUser ? loggedInUser.username : ''}
        </Text>
        {/* <Text>{user.uid}</Text> */}
      </View>

      <View style={styles.action}>
        {/* <FontAwesome name="user-o" color="#333333" size={20} /> */}
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={loggedInUser ? loggedInUser.name : ''}
          onChangeText={(txt) => setloggedInUser({ ...loggedInUser, name: txt })}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        {/* <FontAwesome name="user-o" color="#333333" size={20} /> */}
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#666666"
          value={loggedInUser ? loggedInUser.username : ''}
          onChangeText={(txt) => setloggedInUser({ ...loggedInUser, username: txt })}
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        {/* <Ionicons name="ios-clipboard-outline" color="#333333" size={20} /> */}
        <TextInput
          multiline
          numberOfLines={3}
          placeholder="DOB"
          placeholderTextColor="#666666"
          value={loggedInUser ? loggedInUser.DOB : ''}
          onChangeText={(txt) => setloggedInUser({ ...loggedInUser, DOB: txt })}
          autoCorrect
          style={[styles.textInput, { height: 40 }]}
        />
      </View>
      <View style={styles.action}>
        {/* <Feather name="avatar" color="#333333" size={20} /> */}
        <TextInput
          placeholder="avatar"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          value={loggedInUser ? loggedInUser.avatar : ''}
          onChangeText={(txt) => setloggedInUser({ ...loggedInUser, avatar: txt })}
          style={styles.textInput}
        />
      </View>

      <View style={styles.action}>
        {/* <MaterialCommunityIcons
            name="map-marker-outline"
            color="#333333"
            size={20}
          /> */}
        <TextInput
          placeholder="location"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={loggedInUser ? loggedInUser.location : ''}
          onChangeText={(txt) => setloggedInUser({ ...loggedInUser, location: txt })}
          style={styles.textInput}
        />
      </View>
      {/* <FormButton buttonTitle="Update" onPress={handleUpdate} /> */}
      {/* </Animated.View> */}
    </View>
  );
}

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpalocation: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
});
