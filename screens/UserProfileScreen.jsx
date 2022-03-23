import { useNavigation } from '@react-navigation/core'
import React,{useState, useEffect, useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, View,FlatList,
  SafeAreaView,Image } from 'react-native'
  import { getDoc, doc} from 'firebase/firestore';
import { auth } from '../firebase' //// IMPORT THIS TO CHECK USER AND CHECK auth.currentUser
import { db } from '../firebase';
import { UserContext } from '../contexts/UserContext';

const UserProfileScreen = () => {
  const { loggedInUser,setLoggedInUser } = useContext(UserContext)
  const [userData, setUserData] = useState(null);
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
    navigation.navigate("GlobalStack")
  }


//---------------return ---------------------------

if(userData !== null){
 
  return (
  
    <SafeAreaView style={styles.container} >
     
        <Image
          style={styles.userImg}
          source={{uri: userData.avatar}}
        />
        <Text style={styles.userName}>
          {userData.username}
        </Text>
      
        <Text style={styles.aboutUser}>
      
        {userData.name}
        </Text>
        <View style={styles.userBtnWrapper}>
      
            <>
              <TouchableOpacity style={styles.userBtn} onPress={navigateToEdit}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
            </>
        </View>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Events</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
        <FlatList
        data={[
          {key: userData.preferredSports[0]},
          {key: userData.preferredSports[1]},
          {key: userData.preferredSports[3]},
        
        ]}
        
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

    <Text>Location: {userData.location}</Text>

     <Text>Email: {auth.currentUser?.email}</Text>
        <View style={styles.buttonContainer}>
     <TouchableOpacity
       onPress={handleSignOut}
       style={styles.button}
     >
       <Text style={styles.buttonText}>Sign out</Text>
     </TouchableOpacity>
     
     </View>
     
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
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 0,
    alignItems: 'center',
    marginTop: 40,
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
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
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
    height: 44,
  },
})