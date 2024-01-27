import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

const CustomTextInput = props => {
  const {value, onChangedText, error, placeholder, secureTextEntry} = props;
  const [isFocused, setIsFocused] = useState(false);

  const height = useRef(new Animated.Value(0)).current;
  const height_interpolated = height.interpolate({
    inputRange: [0, 1],
    outputRange: ['1%', '100%'],
  });

  useEffect(() => {
    Animated.timing(height, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      easing: Easing.exp,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      {error && error.message.length > 0 && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      )}
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangedText}
            placeholder={placeholder}
            placeholderTextColor={'#2a2a2a'}
            secureTextEntry={secureTextEntry}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
          <Animated.View
            style={[styles.focusContainer, {height: height_interpolated}]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    marginBottom: 8,
    borderBottomColor: 'white',
    backgroundColor: '#ffffff7d',
    borderBottomWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: '200',
    flex: 1,
    marginEnd: 8,
    color: '#2a2a2a',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    width: 'auto',
    marginBottom: 8,
    borderBottomColor: 'white',
    backgroundColor: '#ffffff7d',
    borderRadius: 4,
  },
  errorText: {
    padding: 6,
    fontWeight: '300',
    color: 'red',
  },
  focusContainer: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#ffffffff',
    zIndex: -1,
  },
});

export default CustomTextInput;
