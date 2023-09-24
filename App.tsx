import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/home';
import CameraScreen from './screens/camera';
import Tabs from './navigation/tabs';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { View } from 'react-native';
import { fonts } from './lib/fonts';
import LoadingScreen from './components/LoadingScreen';
import { useFonts } from '@expo-google-fonts/poppins';

const Stack = createNativeStackNavigator();

const App = () => {
  let [fontsLoaded, error] = useFonts(fonts);

  const loading = !fontsLoaded;

  if (loading) return <LoadingScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
