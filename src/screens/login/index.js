import React, {useState} from 'react';
import {View, ImageBackground, StyleSheet, Alert} from 'react-native';
import {CustomButton, CustomTextInput} from '../../components';
import auth from '@react-native-firebase/auth';

const backgroundImage = require('../../asset/imgs/login.png');

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('Login Success');
      // Clear email and password fields
      setEmail('');
      setPassword('');
      navigation.navigate('Authenticated');
    } catch (error) {
      console.error('Login error:', error.message);
      Alert.alert(
        'Login Failed',
        'Invalid email or password. Please try again.',
      );
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <CustomTextInput
          value={email}
          onChangedText={setEmail}
          placeholder="Email"
        />
        <CustomTextInput
          value={password}
          onChangedText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <CustomButton title="Login" onButtonPress={handleLogin} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  buttonContainer: {
    marginTop: 25,
  },
});

export default Login;
