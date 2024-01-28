import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendarCheck, faUserDoctor} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const backgroundImage = require('../../asset/imgs/search.png');

const AppointmentScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const currentUser = auth().currentUser;

  useEffect(() => {
    // Fetch doctors from Firestore with additional information (name)
    const unsubscribe = firestore()
      .collection('users')
      .where('userType', '==', 'Doctor')
      .onSnapshot(snapshot => {
        const doctorList = snapshot.docs.map(doc => doc.data());
        setDoctors(doctorList);
      });

    return () => unsubscribe();
  }, []);

  const handleBookAppointment = async () => {
    try {
      if (!currentUser.uid || !date || !selectedDoctor) {
        // Check if any fields are empty
        Alert.alert('Error', 'Please fill in all the fields.');
        return;
      }
      // Save the appointment data to Firestore
      await firestore().collection('appointments').add({
        customerId: currentUser.uid,
        dateTime: date,
        doctor: selectedDoctor,
      });

      // Navigate to the home screen
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving appointment:', error.message);
      // Handle error, show alert, etc.
    }
  };

  const handleDateSelect = selectedDate => {
    setOpen(false);
    setDate(selectedDate);

    // Format date and time
    const formattedDateTime = `${
      selectedDate.toISOString().split('T')[0]
    } ${selectedDate.toLocaleTimeString().split(':').slice(0, 2).join(':')}`;

    setTextInputValue(formattedDateTime);
  };

  const handleDoctorSelect = doctor => {
    setSelectedDoctor(doctor.name);
    setShowDoctorModal(false);
  };

  const renderDoctorItem = ({item}) => (
    <TouchableOpacity onPress={() => handleDoctorSelect(item)}>
      <View style={styles.doctorItemContainer}>
        <Text style={styles.doctorItemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>Book an Appointment</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Customer ID"
            placeholderTextColor={'black'}
            value={currentUser.uid}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Select Date and Time"
            placeholderTextColor={'black'}
            value={textInputValue}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.iconContainer}>
            <FontAwesomeIcon icon={faCalendarCheck} size={20} color="green" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Select Doctor"
            placeholderTextColor={'black'}
            value={selectedDoctor}
            editable={false}
            onTouchStart={() => setShowDoctorModal(true)}
          />
          <TouchableOpacity
            onPress={() => setShowDoctorModal(true)}
            style={styles.iconContainer}>
            <FontAwesomeIcon icon={faUserDoctor} size={20} color="blue" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBookAppointment}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>

        {/* Doctor Selection Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={showDoctorModal}
          onRequestClose={() => setShowDoctorModal(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeading}>Select Doctor</Text>
            <FlatList
              data={doctors}
              keyExtractor={item => item.id}
              renderItem={renderDoctorItem}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowDoctorModal(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={handleDateSelect}
          onCancel={() => setOpen(false)}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  iconContainer: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#0066cc',
    borderRadius: 5,
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  doctorItemText: {
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default AppointmentScreen;
