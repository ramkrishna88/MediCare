import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import {CustomButton, CustomTextInput} from '../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const backgroundImage = require('../../asset/imgs/register.png');
const specialties = ['Patient', 'Dermatology', 'Cardiology', 'Endocrinology'];
const userTypes = ['Doctor', 'Patient'];

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleRegistration = async () => {
    try {
      // Validation checks
      if (
        !name ||
        !contact ||
        !email ||
        !location ||
        !password ||
        !confirmPassword ||
        !selectedSpecialty ||
        !selectedUserType
      ) {
        Alert.alert('Validation Error', 'Please fill in all the fields');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Validation Error', 'Passwords do not match');
        return;
      }

      // Create user
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      setName('');
      setContact('');
      setEmail('');
      setLocation('');
      setPassword('');
      setConfirmPassword('');
      setSelectedSpecialty('');
      setSelectedUserType('');

      const userData = {
        uid: user.uid,
        name,
        contact,
        location,
        userType: selectedUserType,
        specialty:
          selectedUserType === 'Doctor' ? selectedSpecialty : 'Patient',
      };

      await firestore().collection('users').doc(user.uid).set(userData);

      // Navigate based on user type
      if (selectedUserType === 'Patient') {
        navigation.navigate('Authenticated');
      } else if (selectedUserType === 'Doctor') {
        navigation.navigate('Qualification');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      Alert.alert('Registration Failed', error.message);
    }
  };

  const handleSelection = item => {
    if (modalType === 'Specialty') {
      setSelectedSpecialty(item);
    } else if (modalType === 'UserType') {
      setSelectedUserType(item);
    }
    setModalVisible(false);
  };

  const renderListItem = ({item}) => (
    <TouchableOpacity
      style={styles.specialtyItem}
      onPress={() => handleSelection(item)}>
      <Text style={styles.specialtyText}>{item}</Text>
    </TouchableOpacity>
  );

  const openModal = type => {
    setModalType(type);
    setModalVisible(true);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <CustomTextInput
          value={name}
          onChangedText={setName}
          placeholder="Name"
        />
        <CustomTextInput
          value={email}
          onChangedText={setEmail}
          placeholder="Email"
        />
        <CustomTextInput
          value={contact}
          onChangedText={setContact}
          placeholder="Contact"
        />
        <TouchableOpacity
          style={styles.specialtyInput}
          onPress={() => openModal('Specialty')}>
          <Text style={styles.specialtyInputText}>
            {selectedSpecialty || 'Select Specialty'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.specialtyInput}
          onPress={() => openModal('UserType')}>
          <Text style={styles.specialtyInputText}>
            {selectedUserType || 'Select User Type'}
          </Text>
        </TouchableOpacity>
        <CustomTextInput
          value={location}
          onChangedText={setLocation}
          placeholder="Location"
        />
        <CustomTextInput
          value={password}
          onChangedText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <CustomTextInput
          value={confirmPassword}
          onChangedText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
        <CustomButton title="Register" onButtonPress={handleRegistration} />

        {/* Specialty and UserType Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={modalType === 'Specialty' ? specialties : userTypes}
              renderItem={renderListItem}
              keyExtractor={item => item}
            />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  specialtyInput: {
    backgroundColor: '#ffffff7d',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
    width: '100%',
    textAlign: 'center',
  },
  specialtyInputText: {
    color: '#2a2a2a',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginTop: 50,
  },
  specialtyItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  specialtyText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Register;
