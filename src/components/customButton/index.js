import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CustomButton = props => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={props.onButtonPress}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#ffffff7d',
    alignSelf: 'center',
    borderRadius: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '200',
    color: '#2a2a2a',
  },
});

export default CustomButton;
