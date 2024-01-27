import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  Qualification,
  SplashScreen,
  HomeScreen,
} from '../screens/index';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: true,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Qualification"
        component={Qualification}
        options={{
          headerShown: true,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />

      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
