import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  SectionList,
  ScrollView,
  Alert,
} from 'react-native';
import {CustomButton, CustomTextInput} from '../../components';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const backgroundImage = require('../../asset/imgs/qualification1.png');

const Qualification = ({navigation}) => {
  const [degreeName, setDegreeName] = useState('');
  const [institute, setInstitute] = useState('');
  const [passingYear, setPassingYear] = useState('');
  const [clinic, setClinic] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const user = auth().currentUser;

  const handleAddQualification = async () => {
    try {
      if (!degreeName || !institute || !passingYear) {
        Alert.alert(
          'Validation Error',
          'Please fill in all the qualification fields',
        );
        return;
      }

      const qualificationData = {
        degreeName,
        institute,
        passingYear,
      };

      // Add qualification to the 'qualifications' subcollection
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('qualifications')
        .add(qualificationData);

      // Fetch updated data from Firestore
      fetchData();
    } catch (error) {
      console.error('Add Qualification Error:', error.message);
    }
  };

  const handleAddExperience = async () => {
    try {
      if (!clinic || !startYear || !endYear || !description) {
        Alert.alert(
          'Validation Error',
          'Please fill in all the experience fields',
        );
        return;
      }

      const experienceData = {
        clinic,
        startYear,
        endYear,
        description,
      };

      // Add experience to the 'experiences' subcollection
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('experiences')
        .add(experienceData);

      // Fetch updated data from Firestore
      fetchData();
    } catch (error) {
      console.error('Add Experience Error:', error.message);
    }
  };

  // Function to fetch and update data from Firestore
  const fetchData = async () => {
    try {
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      const qualifications = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('qualifications')
        .get();
      const experiences = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('experiences')
        .get();

      const qualificationData = qualifications.docs.map(doc => doc.data());
      const experienceData = experiences.docs.map(doc => doc.data());

      setData([
        {
          title: 'Qualifications',
          data: qualificationData,
        },
        {
          title: 'Experiences',
          data: experienceData,
        },
      ]);
    } catch (error) {
      console.error('Fetch Data Error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <CustomTextInput
            value={degreeName}
            onChangedText={setDegreeName}
            placeholder="Degree Name"
          />
          <CustomTextInput
            value={institute}
            onChangedText={setInstitute}
            placeholder="Institute"
          />
          <CustomTextInput
            value={passingYear}
            onChangedText={setPassingYear}
            placeholder="Passing Year"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddQualification}>
            <Text style={styles.buttonText}>Add Qualification</Text>
          </TouchableOpacity>

          <CustomTextInput
            value={clinic}
            onChangedText={setClinic}
            placeholder="Clinic"
          />
          <CustomTextInput
            value={startYear}
            onChangedText={setStartYear}
            placeholder="Start Year"
          />
          <CustomTextInput
            value={endYear}
            onChangedText={setEndYear}
            placeholder="End Year"
          />
          <CustomTextInput
            value={description}
            onChangedText={setDescription}
            placeholder="Description"
            multiline
            numberOfLines={4}
            style={styles.descriptionInput}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddExperience}>
            <Text style={styles.buttonText}>Add Experience</Text>
          </TouchableOpacity>

          <SectionList
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <View style={styles.listItem}>
                {Object.entries(item).map(([key, value]) => (
                  <Text key={key} style={styles.listItemText}>
                    {key}: {value}
                  </Text>
                ))}
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
          />

          <CustomButton
            title="Finish Registration"
            onButtonPress={() => navigation.navigate('Home')}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
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
  addButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
  },
  listItem: {
    backgroundColor: '#ffffff7d',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  listItemText: {
    color: '#2a2a2a',
    fontSize: 16,
  },
  descriptionInput: {
    color: 'black', // Set text color to black
  },
});

export default Qualification;
