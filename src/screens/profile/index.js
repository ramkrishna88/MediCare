import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const [experienceData, setExperienceData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);

  const user = auth().currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userDocument = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        if (userDocument.exists) {
          setUserData(userDocument.data());
        } else {
          console.warn('User document does not exist');
        }

        // Fetch experience data
        const experienceSnapshot = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('experiences')
          .get();

        const experienceDataList = experienceSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExperienceData(experienceDataList);

        // Fetch qualification data
        const qualificationSnapshot = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('qualifications')
          .get();

        const qualificationDataList = qualificationSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQualificationData(qualificationDataList);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [user.uid]);

  const cardStyle = {
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
  };

  const profileData = () => (
    <View style={{...cardStyle, backgroundColor: '#fff0f0'}}>
      <Text style={styles.title}>{userData.name}</Text>
      <Text style={styles.subtitle}>{userData.email}</Text>
      <Text style={styles.info}>Contact: {userData.contact}</Text>
      <Text style={styles.info}>Location: {userData.location}</Text>
      <Text style={styles.info}>Specialty: {userData.specialty}</Text>
    </View>
  );

  const experienceDataList = () => (
    <View style={{...cardStyle, backgroundColor: '#eab8b8'}}>
      <Text style={styles.title}>Experiences</Text>
      {experienceData && experienceData.length > 0 ? (
        experienceData.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.clinic}</Text>
            <Text style={styles.subtitle}>{item.description}</Text>
            <Text style={styles.info}>
              {item.startYear} - {item.endYear}
            </Text>
          </View>
        ))
      ) : (
        <Text>No experience data available</Text>
      )}
    </View>
  );

  const qualificationDataList = () => (
    <View style={{...cardStyle, backgroundColor: '#eab8b8'}}>
      <Text style={styles.title}>Qualifications</Text>
      {qualificationData && qualificationData.length > 0 ? (
        qualificationData.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.title}>{item.degreeName}</Text>
            <Text style={styles.subtitle}>{item.institute}</Text>
            <Text style={styles.subtitle}>{item.passingYear}</Text>
          </View>
        ))
      ) : (
        <Text>No qualification data available</Text>
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('../../asset/imgs/home.png')}
      blurRadius={2}
      style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* User Info Card */}
        {profileData()}

        {/* Experience Card */}
        {experienceDataList()}

        {/* Qualification Card */}
        {qualificationDataList()}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical: 10,
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
});

export default ProfileScreen;
