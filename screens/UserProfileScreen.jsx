import { useNavigation } from '@react-navigation/core'
import React,{useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, View,FlatList,
  SafeAreaView,Image } from 'react-native'
  import { getDoc, doc} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserContext } from '../contexts/UserContext';
import GlobalStyles from '../constants/styles/GlobalStyles'

const UserProfileScreen = () => {
  const { loggedInUser,setLoggedInUser, userData, setUserData } = useContext(UserContext)
  // const [userData, setUserData] = useState(null);
  const [isloading, setLoading] = useState(true);
  const navigation = useNavigation()
  const docRef = doc(db, "users", auth.currentUser.uid);

  useEffect(() => {
    setLoading(true)

      getDoc(docRef).then(userInfo =>{
        setUserData(userInfo.data())
        setLoading(false)
        return userInfo.data()

      }).then(data =>{
        setLoggedInUser(data)
      }).catch(error => alert(error.message))
  }, []);


if(isloading){ return  <Text>Loading</Text>}

//signOut functionality
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login/Register")
      })
      .catch(error => alert(error.message))
  }

  const navigateToEdit = ()=>{
    navigation.navigate("editProfile")
  }


//---------------return ---------------------------

if(userData !== null){

  return (

    <SafeAreaView style={{...styles.container, ...GlobalStyles.utilMarginTop}} >

        <Image
          style={{...styles.userImg, ...GlobalStyles.utilMarginTop10}}
          source={{uri: userData.avatar}}
        />
        <Text style={styles.userName}>
          {userData.username}
        </Text>

        <Text style={styles.aboutUser}>
          {userData.locationArray[3]}
        </Text>
        <View style={styles.userBtnWrapper}>

            <>
              <TouchableOpacity style={styles.userBtn} onPress={navigateToEdit}>
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.userBtn, ...styles.logoutBtn}} onPress={handleSignOut}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
        </View>

        <Text style={styles.profileHeader}>
          Your favourite activities:
        </Text>


        <FlatList
        data={[
          {key: userData.preferredSports[0]},
          {key: userData.preferredSports[1]},
          {key: userData.preferredSports[2]},

        ]}

        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />



     <Text>Email: {auth.currentUser?.email}</Text>


    </SafeAreaView>

  )
 }

}
//we are here
export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer:{
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

   button: {
    backgroundColor: '#63CDAB',
    width: '60%',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  userImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    marginTop:10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#5BD0AA',
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  logoutBtn: {
    borderColor: '#A9A9A9',
  },
  userBtnTxt: {
    color: '#232A31',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  item: {
    padding: 10,
    fontSize: 14,
  },
  profileHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  }
})