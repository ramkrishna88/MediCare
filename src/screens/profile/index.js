import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});

  const user = auth().currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocument = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        console.log('User Document Data:', userDocument.data());

        if (userDocument.exists) {
          setUserData(userDocument.data());
        } else {
          console.warn('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [user.uid]); // Now, user.uid is included in the dependency array

  return (
    <View style={styles.container}>
      {/* User Info Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{userData.name}</Text>
        <Text style={styles.subtitle}>{userData.email}</Text>
        <Text style={styles.info}>Contact: {userData.contact}</Text>
        <Text style={styles.info}> Location: {userData.location}</Text>
        <Text style={styles.info}> Specialty: {userData.specialty}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  card: {
    width: '96%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 1,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
