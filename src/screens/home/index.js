import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import {
  faCalendarCheck,
  faUser,
  faArrowRight,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';
import {CustomCard} from '../../components/index';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleCardPress = screenName => {
    navigation.navigate(screenName);
  };

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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default HomeScreen;
