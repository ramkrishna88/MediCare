import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Alert,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const backgroundImage = require('../../asset/imgs/heart.png');

const SearchDoctor = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllDoctors = async () => {
    try {
      setIsRefreshing(true);
      const allDoctorsSnapshot = await firestore()
        .collection('users')
        .where('userType', '==', 'Doctor')
        .orderBy('name')
        .get();
      const doctors = allDoctorsSnapshot.docs.map(doc => {
        const doctorData = doc.data();
        return {...doctorData, uid: doc.id};
      });
      setAllDoctors(doctors);
      setFilteredDoctors(doctors);
    } catch (error) {
      console.error('Error fetching all doctors:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchAllDoctors();
  };

  const handleSearch = text => {
    const query = text.toLowerCase();
    const filtered = allDoctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query),
    );
    setFilteredDoctors(filtered);
  };

  const renderDoctorItem = ({item}) => (
    <TouchableOpacity
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      onPress={() => {
        Alert.alert(
          'Selected Doctor',
          `Name: ${item.name}\nSpecialty: ${item.specialty}`,
        );
        console.log('Doctor Selected:', item.name);
      }}>
      <Text>{item.name}</Text>
      <Text>{item.specialty}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={{flex: 1, padding: 20}}
      resizeMode="cover">
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 16,
          padding: 8,
          borderRadius: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
        placeholder="Search by doctor's name"
        placeholderTextColor="black"
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
          handleSearch(text);
        }}
      />
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDoctorItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
      {(isLoading || isRefreshing) && <Text>Loading...</Text>}
    </ImageBackground>
  );
};

export default SearchDoctor;
