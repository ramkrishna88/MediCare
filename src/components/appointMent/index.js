// AppointmentCard.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AppointmentCard = ({appointment}) => {
  const {customerId, dateTime, doctor} = appointment;

  // Format date and time
  const formattedDateTime = new Date(dateTime.toDate()).toLocaleString();

  return (
    <View style={styles.container}>
      <Text>{`User: ${customerId}`}</Text>
      <Text>{`Doctor: ${doctor}`}</Text>
      <Text>{`Date and Time: ${formattedDateTime}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AppointmentCard;
