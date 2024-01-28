import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const CustomCard = ({startIcon, endIcon, title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          {startIcon && (
            <FontAwesomeIcon icon={startIcon} style={styles.icon} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.iconContainer}>
          {endIcon && <FontAwesomeIcon icon={endIcon} style={styles.icon} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 8,
    marginStart: 9,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '95%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: '100%',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
    color: '#333',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CustomCard;
