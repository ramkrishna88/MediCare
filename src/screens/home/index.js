import React, {useState, useEffect} from 'react';
import {View, ImageBackground, StyleSheet, Text, FlatList} from 'react-native';
import {
  faCalendarCheck,
  faUser,
  faArrowRight,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import {CustomCard, AppointmentCard} from '../../components/index';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const navigation = useNavigation();
  const currentUser = auth().currentUser;
  const [userAppointments, setUserAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleCardPress = screenName => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const userId = currentUser.uid;
        const userAppointmentsSnapshot = await firestore()
          .collection('appointments')
          .where('customerId', '==', userId)
          .orderBy('dateTime', 'desc')
          .limit(10)
          .get();

        const appointments = userAppointmentsSnapshot.docs.map(doc =>
          doc.data(),
        );
        setUserAppointments(appointments);
      } catch (error) {
        console.error('Error fetching user appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAppointments();
  }, []);

  const renderAppointmentItem = ({item}) => (
    <AppointmentCard appointment={item} />
  );

  return (
    <ImageBackground
      source={require('../../asset/imgs/home.png')}
      blurRadius={2}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <CustomCard
          startIcon={faUser}
          endIcon={faArrowRight}
          title="Profile"
          onPress={() => handleCardPress('Profile')}
        />
        <CustomCard
          startIcon={faCalendarCheck}
          endIcon={faArrowRight}
          title="Appointment"
          onPress={() => handleCardPress('Appointment')}
        />
        <CustomCard
          startIcon={faUserDoctor}
          endIcon={faArrowRight}
          title="Search Doctor"
          onPress={() => handleCardPress('SearchDoctor')}
        />
      </View>

      <View style={{padding: 20}}>
        <Text style={styles.text}>Your Appointments</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={userAppointments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderAppointmentItem}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexDirection: 'column', // Update to 'column' for vertical layout
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
});

export default HomeScreen;
