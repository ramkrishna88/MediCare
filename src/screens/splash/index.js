import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {CustomButton} from '../../components';

const backgroundImage = require('../../asset/imgs/splash.png');

const Splash = ({navigation}) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Text style={styles.text}>Welcome to HealthVista</Text>
        <CustomButton
          title="Login"
          onButtonPress={() => navigation.navigate('Login')}
        />
        <CustomButton
          title="Register"
          onButtonPress={() => navigation.navigate('Register')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
  },
  text: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
});

export default Splash;
