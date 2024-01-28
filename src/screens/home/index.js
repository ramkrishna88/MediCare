import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

const HomeScreen = () => {
  return (
    <ImageBackground
      source={require('../../asset/imgs/home.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default HomeScreen;
