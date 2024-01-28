import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Alert, TouchableOpacity} from 'react-native';
import {
  LoginScreen,
  RegisterScreen,
  Qualification,
  SplashScreen,
  HomeScreen,
  ProfileScreen,
  SearchDoctor,
  AppointmentScreen,
} from '../screens/index';
import auth from '@react-native-firebase/auth';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

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
        options={({navigation}) => ({
          headerShown: true,
          headerBackTitle: '',
          headerBackTitleVisible: false,
          headerLeft: null,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <TouchableOpacity onPress={() => handleLogout(navigation)}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size={24}
                color="black"
                style={{marginRight: 15}}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SearchDoctor"
        component={SearchDoctor}
        options={{
          headerShown: true,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          headerShown: true,
          headerBackTitle: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const handleLogout = navigation => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          auth().signOut();
          navigation.navigate('Splash');
        },
      },
    ],
    {cancelable: false},
  );
};

export default AppNavigation;
