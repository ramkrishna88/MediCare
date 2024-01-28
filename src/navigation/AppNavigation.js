import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  Qualification,
  SplashScreen,
  HomeScreen,
} from '../screens/index';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Splash'}>
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

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerBackTitle: '',
          headerBackTitleVisible: false,
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
